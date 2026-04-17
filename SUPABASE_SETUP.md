# Supabase Setup Guide for DriveTo

To get your DriveTo application fully functional, you need to set up your Supabase project with a database table and a storage bucket.

## 1. Create a Supabase Project
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Once created, go to **Project Settings > API** to get your `Project URL` and `Anon Key`.
3. Add these to your environment variables (`.env`).

## 2. Authentication
1. Go to **Authentication > Providers**.
2. Ensure **Email** is enabled.
3. (Optional) Disable "Confirm Email" if you want to test immediately without verifying emails.

## 3. Database Table
Run the following SQL in the **SQL Editor**:

```sql
-- Create a table for file metadata
create table files (
  id uuid default gen_random_uuid() primary key,
  file_name text not null,
  file_url text not null,
  file_type text not null,
  file_size bigint not null,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table files enable row level security;

-- Create policies
create policy "Users can view their own files"
  on files for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own files"
  on files for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own files"
  on files for delete
  using ( auth.uid() = user_id );
```

## 4. Storage Bucket
1. Go to **Storage** in the Supabase dashboard.
2. Create a new bucket named `user-files`.
3. Set the bucket to **Public** (or configure more restrictive policies if you prefer).
4. **Important**: Add a policy for the bucket to allow authenticated users to upload and delete objects.

### Storage Policy (SQL Editor):
```sql
-- Allow authenticated users to upload files to their own folder
create policy "Allow authenticated uploads"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'user-files' 
);

-- Allow users to view files in the bucket
create policy "Allow public viewing"
on storage.objects for select
to public
using (
  bucket_id = 'user-files'
);

-- Allow owners to delete their files
create policy "Allow owners to delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'user-files'
);
```

## 5. Deployment
Your app is ready to run! Make sure your `.env` variables are correctly set in your deployment environment (e.g., Vercel, Netlify).
