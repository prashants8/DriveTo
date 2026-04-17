import React from 'react';
import { UserFile } from '@/src/types';
import { X, ExternalLink, Download } from 'lucide-react';
import { Button } from '../ui/Button';

interface FilePreviewModalProps {
  file: UserFile;
  onClose: () => void;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ file, onClose }) => {
  const isImage = file.file_type.includes('image');
  const isPDF = file.file_type.includes('pdf');
  const isOffice = 
    file.file_name.endsWith('.docx') || 
    file.file_name.endsWith('.xlsx') || 
    file.file_name.endsWith('.pptx') ||
    file.file_name.endsWith('.doc') || 
    file.file_name.endsWith('.xls');

  const getPreviewUrl = () => {
    if (isOffice) {
      return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(file.file_url)}`;
    }
    return file.file_url;
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full h-full max-w-6xl bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-400">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white truncate max-w-md">{file.file_name}</h2>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{file.file_type}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => window.open(file.file_url, '_blank')}
                className="rounded-xl h-10 px-4"
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
              <button 
                onClick={onClose} 
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center">
          {isImage ? (
            <img 
              src={file.file_url} 
              alt={file.file_name} 
              className="max-w-full max-h-full object-contain p-8 transition-transform hover:scale-105 duration-500"
              referrerPolicy="no-referrer"
            />
          ) : isPDF || isOffice ? (
            <iframe
              src={getPreviewUrl()}
              className="w-full h-full border-none bg-white"
              title="File Preview"
            />
          ) : (
            <div className="text-center space-y-4 p-12">
               <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto text-slate-700">
                  <ExternalLink className="w-10 h-10" />
               </div>
               <p className="text-slate-400 max-w-xs mx-auto text-lg font-medium">
                 Preview not available for this file type.
               </p>
               <Button onClick={() => window.open(file.file_url, '_blank')}>
                 Download to view
               </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
