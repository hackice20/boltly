import { WebContainer } from '@webcontainer/api';
import { useEffect, useState, useRef } from 'react';
import { Loader } from './Loader';

interface PreviewFrameProps {
  webContainer: WebContainer | undefined;
  files?: any[];
}

// Optimization: cached file content to avoid remounting unchanged files
// Not fully implemented here but good to keep in mind

function createMountStructure(files: any[]) {
  const mountStructure: Record<string, any> = {};

  const processFile = (file: any) => {
    if (file.type === 'folder') {
      const children: any = {};
      file.children?.forEach((child: any) => {
        children[child.name] = processFile(child);
      });
      return { directory: children };
    } else {
      return { file: { contents: file.content || '' } };
    }
  };

  files.forEach(file => {
    mountStructure[file.name] = processFile(file);
  });

  return mountStructure;
}

export function PreviewFrame({ webContainer, files }: PreviewFrameProps) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Initializing...");
  // Track if dev server is running
  const isServerRunning = useRef(false);
  // Track if we've already registered the server-ready listener
  const listenerRegistered = useRef(false);
  // Track previous files to detect changes
  const prevFilesRef = useRef<any[]>([]);

  // 1. Handle File Mounting (Running on every file change)
  useEffect(() => {
    if (!webContainer || !files || files.length === 0) return;

    // Only mount if files have actually changed significantly or it's the first run
    // For now, we mount every time files change to support HMR
    const mount = async () => {
      try {
        // console.log("WebContainer: Syncing files...");
        const mountStructure = createMountStructure(files);
        await webContainer.mount(mountStructure);
        // console.log("WebContainer: Files synced");
      } catch (err) {
        console.error("WebContainer: Failed to mount files", err);
      }
    };

    mount();
  }, [webContainer, files]);

  // 2. Handle Server Startup (Run once when WebContainer is ready)
  useEffect(() => {
    async function startDevServer() {
      if (!webContainer || !files || files.length === 0) return;

      // Avoid restarting if already processing
      if (isServerRunning.current) return;
      isServerRunning.current = true;

      try {
        setStatus("Mounting files...");
        const mountStructure = createMountStructure(files);
        await webContainer.mount(mountStructure);

        console.log("WebContainer: Files mounted");

        // Check for package.json
        const packageJsonFile = files.find((f: any) => f.name === 'package.json');
        if (!packageJsonFile) {
          setStatus("Waiting for package.json...");
          isServerRunning.current = false;
          return;
        }

        // Check if node_modules exists to skip install
        let skipInstall = false;
        try {
          await webContainer.fs.readdir('/node_modules');
          skipInstall = true;
          console.log("WebContainer: node_modules detected, skipping install");
        } catch (e) {
          // node_modules not found
        }

        const packageJsonContent = packageJsonFile?.content || '';
        const hasDependencies = packageJsonContent.includes('"dependencies"') ||
          packageJsonContent.includes('"devDependencies"');

        if (hasDependencies && !skipInstall) {
          setStatus("Installing dependencies...");
          console.log("WebContainer: Starting npm install...");

          // Use jsh for better process handling
          const installProcess = await webContainer.spawn('jsh', ['-c', 'npm install']);

          installProcess.output.pipeTo(new WritableStream({
            write(data) {
              console.log("npm:", data);
            }
          }));

          const exitCode = await installProcess.exit;
          if (exitCode !== 0) {
            throw new Error(`npm install failed with code ${exitCode}`);
          }
          console.log("WebContainer: Install completed");
        }

        setStatus("Starting dev server...");

        const devProcess = await webContainer.spawn('jsh', ['-c', 'npm run dev']);

        devProcess.output.pipeTo(new WritableStream({
          write(data) {
            console.log("dev:", data);
          }
        }));

      } catch (error) {
        console.error("WebContainer Error:", error);
        setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        isServerRunning.current = false; // Allow retry
      }
    }

    // Register listener only once
    if (!listenerRegistered.current && webContainer) {
      listenerRegistered.current = true;
      webContainer.on('server-ready', (_: any, url: string) => {
        console.log("WebContainer: Ready at", url);
        setUrl(url);
        setStatus("Preview Ready!");
      });
    }

    startDevServer();
  }, [webContainer, files]);

  return (
    <div className="h-full flex items-center justify-center rounded-lg overflow-hidden bg-charcoal-900">
      {!url && (
        <div className="text-center space-y-4">
          <Loader />
          <p className="text-gray-400 text-sm">{status}</p>
        </div>
      )}
      {url && <iframe className="w-full h-full border-0 rounded-lg" src={url} />}
    </div>
  );
}