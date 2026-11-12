-- ================================================================
-- NPVL GALLERY SETUP - Run this in Supabase SQL Editor
-- URL: https://supabase.com/dashboard/project/nrfehxsfqtgrzkladwtn/sql/new
-- ================================================================

-- 1. Create gallery_photos table
CREATE TABLE IF NOT EXISTS public.gallery_photos (
  id TEXT PRIMARY KEY,
  title TEXT DEFAULT '',
  event_name TEXT NOT NULL DEFAULT 'General Photos',
  image_url TEXT NOT NULL,
  storage_path TEXT DEFAULT NULL,
  caption TEXT DEFAULT '',
  date TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to READ gallery photos (public gallery)
CREATE POLICY "Public can read gallery photos"
  ON public.gallery_photos
  FOR SELECT
  USING (true);

-- 4. Allow anon/service to INSERT (admin uploads)
CREATE POLICY "Anyone can insert gallery photos"
  ON public.gallery_photos
  FOR INSERT
  WITH CHECK (true);

-- 5. Allow anon/service to DELETE (admin deletes)
CREATE POLICY "Anyone can delete gallery photos"
  ON public.gallery_photos
  FOR DELETE
  USING (true);

-- 6. Create Storage Bucket for gallery images (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  10485760,  -- 10MB limit per file (we compress before upload so this is plenty)
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage policy: Anyone can upload to gallery bucket
CREATE POLICY "Public upload to gallery"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'gallery');

-- 8. Storage policy: Anyone can read gallery files
CREATE POLICY "Public read gallery"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'gallery');

-- 9. Storage policy: Anyone can delete gallery files
CREATE POLICY "Public delete gallery"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'gallery');

-- Done! Now gallery photos will sync across all devices.
SELECT 'NPVL Gallery setup complete!' as status;
