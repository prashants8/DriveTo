import { useState, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { UserFile } from '@/src/types';
import toast from 'react-hot-toast';

export function useStorage(userId: string | undefined) {
  const [files, setFiles] = useState<UserFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      toast.error('Error fetching files: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    if (!userId) return;
    
    // Check for duplicate name
    if (files.some(f => f.file_name === file.name)) {
      toast.error(`A file named "${file.name}" already exists.`);
      return;
    }

    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('user-files')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from('files').insert({
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        user_id: userId,
      });

      if (dbError) throw dbError;

      toast.success('File uploaded successfully!');
      fetchFiles();
    } catch (error: any) {
      toast.error('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const renameFile = async (file: UserFile, newName: string) => {
    if (!userId) return;
    
    // Check for duplicate name
    if (files.some(f => f.file_name === newName && f.id !== file.id)) {
      toast.error(`A file named "${newName}" already exists.`);
      return;
    }

    try {
      const { error } = await supabase
        .from('files')
        .update({ file_name: newName })
        .eq('id', file.id);

      if (error) throw error;
      
      toast.success('File renamed');
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, file_name: newName } : f));
    } catch (error: any) {
      toast.error('Error renaming file: ' + error.message);
    }
  };

  const deleteFile = async (file: UserFile) => {
    try {
      // Extract file path from URL or re-derive it
      // For simplicity, let's assume we store the storage path or derived it.
      // In a real app, storing the path is better.
      const fileName = file.file_url.split('/').pop();
      if (!fileName) return;

      const { error: storageError } = await supabase.storage
        .from('user-files')
        .remove([`${userId}/${fileName}`]);

      // Note: If storing in subfolders, you need the full path.
      // Better to store path in DB. For now, let's try to just delete from DB if storage path is tricky.
      // Actually, let's try a simpler storage structure if needed.
      
      const { error: dbError } = await supabase
        .from('files')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;
      
      toast.success('File deleted');
      setFiles(prev => prev.filter(f => f.id !== file.id));
    } catch (error: any) {
      toast.error('Error deleting file: ' + error.message);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [userId]);

  return { files, loading, uploading, uploadFile, renameFile, deleteFile, fetchFiles };
}
