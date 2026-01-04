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
        height: '28px',
        padding: '2px',
        borderRadius: '8px',
        backgroundColor: colors.containerBg,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Animated sliding indicator */}
      <div
        style={{
          position: 'absolute',
          top: '2px',
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          height: 'calc(100% - 4px)',
          borderRadius: '6px',
          backgroundColor: colors.indicatorBg,
          boxShadow: isDarkMode ? 'none' : '0 1px 2px rgba(0,0,0,0.08)',
          transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
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
          gap: '5px',
          padding: '0 10px',
          height: '100%',
          borderRadius: '6px',
          border: 'none',
          fontSize: '12px',
          fontWeight: 500,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          color: activeTab === 'code' ? colors.text : colors.textMuted,
          transition: 'color 0.15s ease',
        }}
      >
        <Code2 style={{ width: '12px', height: '12px' }} />
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
          gap: '5px',
          padding: '0 10px',
          height: '100%',
          borderRadius: '6px',
          border: 'none',
          fontSize: '12px',
          fontWeight: 500,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          color: activeTab === 'preview' ? colors.text : colors.textMuted,
          transition: 'color 0.15s ease',
        }}
      >
        <Eye style={{ width: '12px', height: '12px' }} />
        Preview
      </button>
    </div>
  );
}