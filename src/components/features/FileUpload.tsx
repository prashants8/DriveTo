import React, { useState, useRef } from 'react';
import { Upload, X, File as FileIcon, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/src/lib/utils';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
}

export function FileUpload({ onUpload, uploading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSumbit = async () => {
    if (!selectedFile) return;
    await onUpload(selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center justify-center text-center",
          dragActive 
            ? "border-indigo-500 bg-indigo-500/5" 
            : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
        />

        {selectedFile ? (
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
              <FileIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-slate-200 font-medium">{selectedFile.name}</p>
              <p className="text-slate-500 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={() => setSelectedFile(null)}
              className="text-slate-500 hover:text-slate-200 transition-colors inline-flex items-center gap-1 text-sm font-medium"
            >
              <X className="w-4 h-4" /> Change file
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-200 mb-2">Select a file to upload</h3>
            <p className="text-slate-500 mb-6">Drag and drop your file here, or click to browse</p>
            <Button 
              variant="secondary" 
              onClick={() => inputRef.current?.click()}
              className="rounded-xl"
            >
              Choose File
            </Button>
          </>
        )}
      </div>

      {selectedFile && (
        <Button
          onClick={handleSumbit}
          disabled={uploading}
          className="w-full rounded-2xl h-12 text-base shadow-lg shadow-indigo-600/20"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Uploading...
            </>
          ) : (
            'Store in DriveTo'
          )}
        </Button>
      )}
    </div>
  );
}
