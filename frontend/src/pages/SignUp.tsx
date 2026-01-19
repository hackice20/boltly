import { SignUp } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';

export function SignUpPage() {
    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Grid Background */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
                }}
            />
            <div style={{ position: 'relative', zIndex: 10 }}>
                <SignUp
                    appearance={{
                        baseTheme: dark,
                        variables: {
                            colorPrimary: '#3b82f6',
                            colorBackground: '#18181b',
                            colorInputBackground: '#27272a',
                            colorInputText: 'white',
                            colorText: 'white',
                            colorTextSecondary: '#a1a1aa',
                            colorDanger: '#ef4444',
                            borderRadius: '0.75rem',
                        },
                        elements: {
                            rootBox: {
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            },
                            card: {
                                backgroundColor: '#18181b',
                                border: '1px solid #27272a',
                                borderRadius: '16px',
                            },
                            headerTitle: {
                                color: 'white',
                            },
                            headerSubtitle: {
                                color: '#a1a1aa',
                            },
                            socialButtonsBlockButton: {
                                backgroundColor: '#27272a',
                                border: '1px solid #3f3f46',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#3f3f46',
                                },
                            },
                            socialButtonsBlockButtonText: {
                                color: 'white',
                            },
                            dividerLine: {
                                backgroundColor: '#3f3f46',
                            },
                            dividerText: {
                                color: '#71717a',
                            },
                            formFieldLabel: {
                                color: '#a1a1aa',
                            },
                            formFieldInput: {
                                backgroundColor: '#27272a',
                                border: '1px solid #3f3f46',
                                color: 'white',
                                '&:focus': {
                                    border: '1px solid #3b82f6',
                                },
                            },
                            formButtonPrimary: {
                                backgroundColor: '#3b82f6',
                                '&:hover': {
                                    backgroundColor: '#2563eb',
                                },
                            },
                            footerActionLink: {
                                color: '#3b82f6',
                            },
                            footerActionText: {
                                color: '#71717a',
                            },
                            footer: {
                                '& + div': {
                                    background: 'transparent',
                                },
                            },
                            formFieldInputShowPasswordButton: {
                                color: '#a1a1aa',
                            },
                            identityPreviewEditButton: {
                                color: '#3b82f6',
                            },
                            formResendCodeLink: {
                                color: '#3b82f6',
                            },
                        },
                    }}
                    routing="path"
                    path="/sign-up"
                    signInUrl="/sign-in"
                    forceRedirectUrl="/"
                />
            </div>
        </div>
    );
}

