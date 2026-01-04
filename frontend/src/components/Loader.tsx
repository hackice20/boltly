interface LoaderProps {
    isDarkMode: boolean;
}

export function Loader({ isDarkMode }: LoaderProps) {
    const colors = {
        track: isDarkMode ? '#27272a' : '#e4e4e7',
        spinner: isDarkMode ? '#fafafa' : '#18181b',
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
                <div
                    style={{
                        width: '28px',
                        height: '28px',
                        border: `2px solid ${colors.track}`,
                        borderTop: `2px solid ${colors.spinner}`,
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }}
                />
            </div>
            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}