import { Download } from 'lucide-react';
import { FileItem } from '../types';
import JSZip from 'jszip';

interface DownloadButtonProps {
  files: FileItem[];
  isDarkMode: boolean;
}

const DownloadButton = ({ files, isDarkMode }: DownloadButtonProps) => {
  const handleDownload = async () => {
    const zip = new JSZip();

    const addFilesToZip = (items: FileItem[], folder: JSZip) => {
      items.forEach(item => {
        if (item.type === 'file') {
          folder.file(item.name, item.content || '');
        } else if (item.type === 'folder' && item.children) {
          const newFolder = folder.folder(item.name);
          if (newFolder) {
            addFilesToZip(item.children, newFolder);
          }
        }
      });
    };

    addFilesToZip(files, zip);

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.zip';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '9999px',
        backgroundColor: '#3b82f6',
        border: 'none',
        color: 'white',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2563eb';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#3b82f6';
      }}
    >
      <Download style={{ width: '14px', height: '14px' }} />
      Download
    </button>
  );
};

export default DownloadButton;
