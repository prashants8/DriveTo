import React from 'react';
import { UserFile } from '@/src/types';
import { File, Download, Trash2, MoreVertical, FileText, ImageIcon, FileVideo, FileArchive } from 'lucide-react';
import { formatFileSize } from '@/src/lib/utils';
import { Button } from '../ui/Button';

interface FileCardProps {
  file: UserFile;
  onDelete: (file: UserFile) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ file, onDelete }) => {
  const getIcon = () => {
    if (file.file_type.includes('image')) return <ImageIcon className="w-6 h-6 text-blue-400" />;
    if (file.file_type.includes('video')) return <FileVideo className="w-6 h-6 text-emerald-400" />;
    if (file.file_type.includes('pdf')) return <FileText className="w-6 h-6 text-orange-400" />;
    if (file.file_type.includes('zip') || file.file_type.includes('rar')) return <FileArchive className="w-6 h-6 text-purple-400" />;
    return <File className="w-6 h-6 text-indigo-400" />;
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/50 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-800 rounded-xl">
          {getIcon()}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(file.file_url, '_blank')}
            className="h-8 w-8 text-slate-400 hover:text-white"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(file)}
            className="h-8 w-8 text-slate-400 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-slate-200 truncate pr-2 mb-1" title={file.file_name}>
          {file.file_name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{formatFileSize(file.file_size)}</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full" />
          <span className="text-xs text-slate-500">
            {new Date(file.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
