import { useState } from 'react';
import { Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { FileItem } from '../types';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  isDarkMode: boolean;
}

interface FileNodeProps {
  item: FileItem;
  depth: number;
  onFileClick: (file: FileItem) => void;
  isDarkMode: boolean;
}

function FileNode({ item, depth, onFileClick, isDarkMode }: FileNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    text: isDarkMode ? '#fafafa' : '#18181b',
    textMuted: isDarkMode ? '#a1a1aa' : '#71717a',
    textDim: isDarkMode ? '#52525b' : '#a1a1aa',
    hoverBg: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    folderColor: isDarkMode ? '#a1a1aa' : '#71717a',
  };

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileClick(item);
    }
  };

  // Get file extension for icon color
  const getFileColor = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    const darkColors: Record<string, string> = {
      ts: '#3b82f6', tsx: '#3b82f6',
      js: '#eab308', jsx: '#eab308',
      css: '#a855f7', scss: '#a855f7',
      html: '#f97316',
      json: '#22c55e',
      md: '#a1a1aa',
    };
    const lightColors: Record<string, string> = {
      ts: '#2563eb', tsx: '#2563eb',
      js: '#ca8a04', jsx: '#ca8a04',
      css: '#9333ea', scss: '#9333ea',
      html: '#ea580c',
      json: '#16a34a',
      md: '#71717a',
    };
    const colors = isDarkMode ? darkColors : lightColors;
    return colors[ext || ''] || (isDarkMode ? '#71717a' : '#a1a1aa');
  };

  return (
    <div style={{ userSelect: 'none' }}>
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 8px',
          paddingLeft: `${depth * 12 + 8}px`,
          borderRadius: '6px',
          cursor: 'pointer',
          backgroundColor: isHovered ? colors.hoverBg : 'transparent',
          transition: 'background-color 0.15s ease',
        }}
      >
        {item.type === 'folder' ? (
          <>
            <span style={{ color: colors.textDim, display: 'flex' }}>
              {isExpanded ? (
                <ChevronDown style={{ width: '12px', height: '12px' }} />
              ) : (
                <ChevronRight style={{ width: '12px', height: '12px' }} />
              )}
            </span>
            <Folder
              style={{
                width: '14px',
                height: '14px',
                color: isExpanded ? colors.text : colors.folderColor,
              }}
            />
          </>
        ) : (
          <>
            <span style={{ width: '12px' }} />
            <FileText
              style={{
                width: '14px',
                height: '14px',
                color: getFileColor(item.name),
              }}
            />
          </>
        )}
        <span
          style={{
            color: isHovered ? colors.text : colors.textMuted,
            fontSize: '12px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.name}
        </span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FileNode
              key={`${child.path}-${index}`}
              item={child}
              depth={depth + 1}
              onFileClick={onFileClick}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer({ files, onFileSelect, isDarkMode }: FileExplorerProps) {
  const colors = {
    textDim: isDarkMode ? '#52525b' : '#a1a1aa',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {files.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: colors.textDim, fontSize: '12px' }}>No files yet...</p>
        </div>
      ) : (
        files.map((file, index) => (
          <FileNode
            key={`${file.path}-${index}`}
            item={file}
            depth={0}
            onFileClick={onFileSelect}
            isDarkMode={isDarkMode}
          />
        ))
      )}
    </div>
  );
}