import React from 'react';
import { Download } from 'lucide-react';
import { FileItem } from '../types';
import JSZip from 'jszip';

interface DownloadButtonProps {
  files: FileItem[];
}

const DownloadButton = ({ files }: DownloadButtonProps) => {
  const handleDownload = async () => {
    const zip = new JSZip();

    const addFilesToZip = (items: FileItem[], folder: JSZip) => {
      items.forEach(item => {
        if (item.type === 'file') {
          folder.file(item.name, item.content || ''); // Add file to the ZIP
        } else if (item.type === 'folder' && item.children) {
          const newFolder = folder.folder(item.name); // Create a folder in the ZIP
          if (newFolder) {
            addFilesToZip(item.children, newFolder); // Recursively add files/folders
          }
        }
      });
    };

    // Add all files to the ZIP archive
    addFilesToZip(files, zip);

    // Generate the ZIP file and trigger download
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.zip'; // Download file name
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      <Download className="w-4 h-4" />
      Download Project
    </button>
  );
};

export default DownloadButton;
