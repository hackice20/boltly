import { ReactNode, HTMLAttributes } from 'react';

interface GlassContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: 'default' | 'light';
    noPadding?: boolean;
}

export function GlassContainer({
    children,
    className = '',
    variant = 'default',
    noPadding = false,
    ...props
}: GlassContainerProps) {
    const baseClasses = variant === 'default' ? 'glass-container' : 'glass-container-light';
    const paddingClasses = noPadding ? '' : 'p-6';

    return (
        <div className={`${baseClasses} ${paddingClasses} ${className}`} {...props}>
            {children}
        </div>
    );
}
