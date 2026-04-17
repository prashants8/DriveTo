export interface UserFile {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  user_id: string;
  created_at: string;
}

export interface AuthUser {
  id: string;
  email?: string;
}
