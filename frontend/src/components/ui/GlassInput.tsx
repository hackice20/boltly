import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

interface GlassTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export function GlassInput({ className = '', ...props }: GlassInputProps) {
    return (
        <input
            className={`glass-input w-full px-4 py-3 rounded-lg text-gray-100 placeholder-gray-500 ${className}`}
            {...props}
        />
    );
}

export function GlassTextarea({ className = '', ...props }: GlassTextareaProps) {
    return (
        <textarea
            className={`glass-input w-full px-4 py-3 rounded-lg text-gray-100 placeholder-gray-500 resize-none ${className}`}
            {...props}
        />
    );
}
