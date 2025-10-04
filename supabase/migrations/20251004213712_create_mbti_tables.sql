/*
  # MBTI Gamified Survey Database Schema

  ## Overview
  Creates tables to store MBTI survey results and track user progress through the gamified experience.

  ## New Tables
  
  ### `mbti_results`
  Stores completed MBTI survey results for users
  - `id` (uuid, primary key) - Unique identifier for each result
  - `user_id` (uuid, nullable) - Optional reference to authenticated user
  - `personality_type` (text) - The 4-letter MBTI type (e.g., INTJ, ENFP)
  - `scores` (jsonb) - Detailed scores for each dimension (E/I, S/N, T/F, J/P)
  - `completed_at` (timestamptz) - When the survey was completed
  - `session_id` (text) - Anonymous session identifier for tracking
  
  ## Security
  - Enable RLS on `mbti_results` table
  - Allow anyone to insert their own results
  - Allow users to read their own results by session_id or user_id
  
  ## Notes
  - Survey is designed to work for both authenticated and anonymous users
  - Session IDs allow anonymous users to retrieve their results
  - Scores are stored as JSON for flexibility in analysis
*/

-- Create mbti_results table
CREATE TABLE IF NOT EXISTS mbti_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  personality_type text NOT NULL,
  scores jsonb NOT NULL,
  completed_at timestamptz DEFAULT now(),
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE mbti_results ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert results
CREATE POLICY "Anyone can insert results"
  ON mbti_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Users can read their own results by session_id
CREATE POLICY "Users can read own results by session"
  ON mbti_results
  FOR SELECT
  TO anon, authenticated
  USING (session_id = current_setting('request.jwt.claims', true)::json->>'session_id' OR user_id = auth.uid());

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_mbti_results_session_id ON mbti_results(session_id);
CREATE INDEX IF NOT EXISTS idx_mbti_results_user_id ON mbti_results(user_id);