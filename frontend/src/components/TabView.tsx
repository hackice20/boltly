import { Code2, Eye } from 'lucide-react';

interface TabViewProps {
  activeTab: 'code' | 'preview';
  onTabChange: (tab: 'code' | 'preview') => void;
}

export function TabView({ activeTab, onTabChange }: TabViewProps) {
  return (
    <div className="flex space-x-2 mb-4 p-1 glass-container-light inline-flex rounded-xl">
      <button
        onClick={() => onTabChange('code')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-glass font-medium text-sm ${activeTab === 'code'
            ? 'bg-primary-500 text-white shadow-glow'
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
      >
        <Code2 className="w-4 h-4" />
        Code
      </button>
      <button
        onClick={() => onTabChange('preview')}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-glass font-medium text-sm ${activeTab === 'preview'
            ? 'bg-primary-500 text-white shadow-glow'
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
      >
        <Eye className="w-4 h-4" />
        Preview
      </button>
    </div>
  );
}