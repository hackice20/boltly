import Editor from '@monaco-editor/react';
import { FileItem } from '../types';

interface CodeEditorProps {
  file: FileItem | null;
  isDarkMode: boolean;
}

export function CodeEditor({ file, isDarkMode }: CodeEditorProps) {
  const colors = {
    text: isDarkMode ? '#fafafa' : '#18181b',
    textMuted: isDarkMode ? '#a1a1aa' : '#71717a',
    textDim: isDarkMode ? '#52525b' : '#a1a1aa',
    border: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  };

  if (!file) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: colors.textMuted }}>Select a file to view its contents</p>
          <p style={{ fontSize: '12px', color: colors.textDim, marginTop: '4px' }}>
            Files will appear in the explorer on the left
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: '100%',
        borderRadius: '10px',
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
      }}
    >
      <Editor
        height="100%"
        defaultLanguage="typescript"
        theme={isDarkMode ? 'vs-dark' : 'light'}
        value={file.content || ''}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 13,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}