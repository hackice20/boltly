import { ClerkProvider } from '@clerk/clerk-react';
import { ReactNode } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

interface ClerkProviderWrapperProps {
    children: ReactNode;
}

// Component to show when Clerk is not configured
function ClerkSetupMessage() {
    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <div
                style={{
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    borderRadius: '16px',
                    padding: '40px',
                    maxWidth: '600px',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ color: 'white', marginBottom: '16px', fontSize: '24px' }}>
                    🔐 Clerk Setup Required
                </h1>
                <p style={{ color: '#a1a1aa', marginBottom: '24px', lineHeight: '1.6' }}>
                    To enable authentication, you need to configure Clerk:
                </p>
                <div
                    style={{
                        backgroundColor: '#0f0f0f',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        padding: '20px',
                        textAlign: 'left',
                        marginBottom: '24px',
                    }}
                >
                    <p style={{ color: '#71717a', marginBottom: '12px', fontSize: '14px' }}>
                        1. Create an account at{' '}
                        <a href="https://clerk.com" target="_blank" style={{ color: '#3b82f6' }}>
                            clerk.com
                        </a>
                    </p>
                    <p style={{ color: '#71717a', marginBottom: '12px', fontSize: '14px' }}>
                        2. Create a new application
                    </p>
                    <p style={{ color: '#71717a', marginBottom: '12px', fontSize: '14px' }}>
                        3. Copy your <strong style={{ color: '#fbbf24' }}>Publishable Key</strong>
                    </p>
                    <p style={{ color: '#71717a', fontSize: '14px' }}>
                        4. Create a <code style={{ color: '#22c55e', backgroundColor: '#052e16', padding: '2px 6px', borderRadius: '4px' }}>.env</code> file in the frontend folder:
                    </p>
                    <pre
                        style={{
                            color: '#22c55e',
                            backgroundColor: '#052e16',
                            padding: '12px',
                            borderRadius: '6px',
                            marginTop: '12px',
                            fontSize: '13px',
                            overflowX: 'auto',
                        }}
                    >
                        VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
                    </pre>
                </div>
                <p style={{ color: '#71717a', fontSize: '13px' }}>
                    Then restart the dev server with <code style={{ color: '#3b82f6' }}>npm run dev</code>
                </p>
            </div>
        </div>
    );
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
    // Show setup message if Clerk is not configured
    if (!PUBLISHABLE_KEY) {
        return <ClerkSetupMessage />;
    }

    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            {children}
        </ClerkProvider>
    );
}
