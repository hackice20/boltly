import { useEffect, useState, useRef } from "react";
import { WebContainer } from '@webcontainer/api';

interface WebContainerState {
    container: WebContainer | undefined;
    status: 'booting' | 'ready' | 'error';
    error?: string;
}

// Singleton to prevent multiple WebContainer instances
let webContainerPromise: Promise<WebContainer> | null = null;
let webContainerInstance: WebContainer | null = null;

async function getWebContainer(): Promise<WebContainer> {
    // Return existing instance if available
    if (webContainerInstance) {
        console.log("WebContainer: Returning existing instance");
        return webContainerInstance;
    }

    // Return existing promise if boot is in progress
    if (webContainerPromise) {
        console.log("WebContainer: Boot already in progress, waiting...");
        return webContainerPromise;
    }

    // Start new boot with timeout
    console.log("WebContainer: Starting boot...");
    webContainerPromise = Promise.race([
        WebContainer.boot(),
        new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("WebContainer boot timed out after 30 seconds. Try refreshing the page or closing other tabs with WebContainers.")), 30000)
        )
    ]);

    try {
        webContainerInstance = await webContainerPromise;
        console.log("WebContainer: Boot successful!");
        return webContainerInstance;
    } catch (error) {
        webContainerPromise = null; // Allow retry
        throw error;
    }
}

export function useWebContainer() {
    const [container, setContainer] = useState<WebContainer | undefined>();
    const bootAttempted = useRef(false);

    useEffect(() => {
        if (bootAttempted.current) return;
        bootAttempted.current = true;

        async function boot() {
            try {
                const instance = await getWebContainer();
                setContainer(instance);
            } catch (error) {
                console.error("WebContainer: Boot failed!", error);
            }
        }
        boot();
    }, []);

    return container;
}

// Export the full state hook for components that need more info
export function useWebContainerWithStatus() {
    const [state, setState] = useState<WebContainerState>({
        container: undefined,
        status: 'booting'
    });
    const bootAttempted = useRef(false);

    useEffect(() => {
        if (bootAttempted.current) return;
        bootAttempted.current = true;

        async function boot() {
            try {
                const instance = await getWebContainer();
                setState({
                    container: instance,
                    status: 'ready'
                });
            } catch (error) {
                console.error("WebContainer: Boot failed!", error);
                setState({
                    container: undefined,
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        }
        boot();
    }, []);

    return state;
}