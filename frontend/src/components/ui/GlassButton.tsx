import { ReactNode, ButtonHTMLAttributes } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
    className?: string;
}

export function GlassButton({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}: GlassButtonProps) {
    const baseClasses = 'glass-button px-6 py-3 rounded-lg font-medium transition-glass';

    const variantClasses = variant === 'primary'
        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-glow hover:shadow-glow-strong'
        : 'hover:bg-glass-bg-light';

    const widthClasses = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${widthClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
