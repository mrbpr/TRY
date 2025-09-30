/*
  # Create storage bucket for team images

  1. Storage
    - Create `team-images` bucket for team member photos
    - Enable public access for team images
    - Set up RLS policies for image management

  2. Security
    - Public read access for team images
    - Authenticated write access for admin functionality
*/

-- Create storage bucket for team images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team-images', 'team-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view team images
CREATE POLICY "Public Access to Team Images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'team-images');

-- Allow authenticated users to upload team images
CREATE POLICY "Authenticated users can upload team images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'team-images');

-- Allow authenticated users to update team images
CREATE POLICY "Authenticated users can update team images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'team-images');

-- Allow authenticated users to delete team images
CREATE POLICY "Authenticated users can delete team images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'team-images');