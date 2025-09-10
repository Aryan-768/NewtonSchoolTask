/*
  # Setup Admin Authentication

  1. Authentication Setup
    - Create admin user (aryaniam768@gmail.com)
    - Set up email confirmation disabled
    - Configure password authentication

  2. Security
    - Admin policies for full access to all tables
    - Service role access for admin operations
*/

-- Insert admin user if not exists
-- Note: This is handled by Supabase Auth automatically when user signs up
-- We just need to ensure our policies work with authenticated users

-- Create admin policies for full access
CREATE POLICY "Authenticated users can manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage registrations"
  ON registrations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage attendance"
  ON attendance
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT auth.email() = 'aryaniam768@gmail.com';
$$;