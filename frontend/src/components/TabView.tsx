import { Code2, Eye } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface TabViewProps {
  activeTab: 'code' | 'preview';
  onTabChange: (tab: 'code' | 'preview') => void;
  isDarkMode: boolean;
}

export function TabView({ activeTab, onTabChange, isDarkMode }: TabViewProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLButtonElement>(null);

  const colors = {
    containerBg: isDarkMode ? '#27272a' : '#f4f4f5',
    border: isDarkMode ? '#3f3f46' : '#e4e4e7',
    indicatorBg: isDarkMode ? '#3f3f46' : '#ffffff',
    text: isDarkMode ? '#fafafa' : '#18181b',
    textMuted: isDarkMode ? '#71717a' : '#a1a1aa',
  };

  useEffect(() => {
    const activeButton = activeTab === 'code' ? codeRef.current : previewRef.current;
    if (activeButton && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        padding: '4px',
        borderRadius: '12px',
        backgroundColor: colors.containerBg,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Animated sliding indicator */}
      <div
        style={{
          position: 'absolute',
          top: '4px',
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          height: 'calc(100% - 8px)',
          borderRadius: '8px',
          backgroundColor: colors.indicatorBg,
          boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 0,
        }}
      />

      <button
        ref={codeRef}
        onClick={() => onTabChange('code')}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 20px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          color: activeTab === 'code' ? colors.text : colors.textMuted,
          transition: 'color 0.2s ease',
        }}
      >
        <Code2 style={{ width: '14px', height: '14px' }} />
        Code
      </button>

      <button
        ref={previewRef}
        onClick={() => onTabChange('preview')}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 20px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          color: activeTab === 'preview' ? colors.text : colors.textMuted,
          transition: 'color 0.2s ease',
        }}
      >
        <Eye style={{ width: '14px', height: '14px' }} />
        Preview
      </button>
    </div>
  );
}