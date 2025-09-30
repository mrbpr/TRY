/*
  # Create team members table

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `credentials` (text)
      - `image_url` (text)
      - `description` (text)
      - `order_index` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `team_members` table
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  credentials text NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access to team members
CREATE POLICY "Anyone can view team members"
  ON team_members
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage team members (for admin functionality)
CREATE POLICY "Authenticated users can manage team members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (true);

-- Insert default team members
INSERT INTO team_members (name, role, credentials, image_url, description, order_index) VALUES
(
  'Dr. Sarah Johnson',
  'Chief Clinical Officer',
  'PhD in Clinical Psychology',
  'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  'Specializes in student mental health with 15+ years of experience in higher education counseling.',
  1
),
(
  'Michael Chen',
  'Director of Technology',
  'MS Computer Science, Mental Health Tech Advocate',
  'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  'Combines technical expertise with passion for creating accessible mental health solutions.',
  2
),
(
  'Dr. Maria Rodriguez',
  'Research Director',
  'PhD in Educational Psychology',
  'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  'Leads our evidence-based approach to digital mental health interventions for students.',
  3
),
(
  'James Thompson',
  'Community Outreach Manager',
  'MA in Counseling, Peer Support Specialist',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
  'Former student who experienced mental health challenges and now helps others navigate their journey.',
  4
);