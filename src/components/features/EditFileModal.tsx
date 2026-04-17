import React, { useState } from 'react';
import { UserFile } from '@/src/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X, Loader2 } from 'lucide-react';

interface EditFileModalProps {
  file: UserFile;
  onClose: () => void;
  onRename: (file: UserFile, newName: string) => Promise<void>;
}

export const EditFileModal: React.FC<EditFileModalProps> = ({ file, onClose, onRename }) => {
  const [newName, setNewName] = useState(file.file_name);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!newName || newName === file.file_name) return onClose();
    setSaving(true);
    await onRename(file, newName);
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Edit File</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <Input
            label="File Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-slate-950 border-slate-800"
          />
        </div>

        <div className="flex items-center gap-3 pt-4">
          <Button variant="ghost" onClick={onClose} className="flex-1 rounded-xl">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving || !newName} 
            className="flex-1 rounded-xl"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};
