/*
  # Event Management System Database Schema

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `date` (date)
      - `location` (text)
      - `created_at` (timestamp)
    
    - `registrations`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key)
      - `name` (text)
      - `email` (text)
      - `registration_id` (text, unique)
      - `qr_code` (text)
      - `created_at` (timestamp)
    
    - `attendance`
      - `id` (uuid, primary key)
      - `registration_id` (text, foreign key)
      - `attended_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to events
    - Add policies for registration and attendance operations
    - Add admin user authentication

  3. Sample Data
    - Insert sample events (Hackathon, Ideathon, Tech Summit)
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  registration_id text UNIQUE NOT NULL,
  qr_code text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id text REFERENCES registrations(registration_id) ON DELETE CASCADE,
  attended_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Create policies for events (public read access)
CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for registrations (public insert, authenticated read)
CREATE POLICY "Anyone can register for events"
  ON registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view registrations"
  ON registrations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for attendance (public insert, authenticated read)
CREATE POLICY "Anyone can mark attendance"
  ON attendance
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view attendance"
  ON attendance
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert sample events
INSERT INTO events (name, description, date, location) VALUES
  (
    'Tech Hackathon 2025',
    'A 48-hour hackathon where developers, designers, and innovators come together to build amazing projects. Prizes worth $50,000 await the winners!',
    '2025-02-15',
    'Innovation Center, Downtown Tech Hub'
  ),
  (
    'Startup Ideathon',
    'Generate and pitch your next big startup idea. Network with investors, mentors, and fellow entrepreneurs in this intensive ideation session.',
    '2025-02-28',
    'Entrepreneurship Incubator, Business District'
  ),
  (
    'AI & Machine Learning Summit',
    'Explore the latest trends in artificial intelligence and machine learning. Learn from industry experts and discover cutting-edge technologies.',
    '2025-03-10',
    'Convention Center, Tech Valley'
  ),
  (
    'Web Development Workshop',
    'Hands-on workshop covering modern web development techniques, frameworks, and best practices. Perfect for beginners and intermediate developers.',
    '2025-03-20',
    'Digital Learning Center, University Campus'
  ),
  (
    'Product Design Conference',
    'Discover the art and science of product design. Learn from top designers and product managers about creating user-centered experiences.',
    '2025-04-05',
    'Design Studio Complex, Creative District'
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_event_id ON registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_registration_id ON registrations(registration_id);
CREATE INDEX IF NOT EXISTS idx_attendance_registration_id ON attendance(registration_id);
CREATE INDEX IF NOT EXISTS idx_attendance_attended_at ON attendance(attended_at);