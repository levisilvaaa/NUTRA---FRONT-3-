/*
  # Create Homepage Headlines Table

  1. New Tables
    - `homepage_headlines`
      - `id` (integer, primary key) - Fixed ID (always 1) for single active configuration
      - `line1` (text) - Main headline first line (e.g., "The trick used by")
      - `line2` (text) - Main headline second line (e.g., "adult film actors")
      - `line3_prefix` (text) - Description prefix (e.g., "How this")
      - `line3_highlight` (text) - Highlighted text (e.g., "baking soda trick")
      - `line3_suffix` (text) - Description suffix (e.g., "produces rock-hard erections instantly?")
      - `cta_text` (text) - Call-to-action text (e.g., "WATCH BELOW AND SEE HOW IT WORKS")
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `homepage_headlines` table
    - Add policy for public read access (anyone can view headlines)
    - Add policy for public write access (anyone can update headlines in Bolt environment)

  3. Initial Data
    - Insert default headlines with current values from the app
*/

CREATE TABLE IF NOT EXISTS homepage_headlines (
  id integer PRIMARY KEY DEFAULT 1,
  line1 text NOT NULL DEFAULT 'The trick used by',
  line2 text NOT NULL DEFAULT 'adult film actors',
  line3_prefix text NOT NULL DEFAULT 'How this ',
  line3_highlight text NOT NULL DEFAULT 'baking soda trick',
  line3_suffix text NOT NULL DEFAULT ' produces rock-hard erections instantly?',
  cta_text text NOT NULL DEFAULT 'WATCH BELOW AND SEE HOW IT WORKS',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE homepage_headlines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read homepage headlines"
  ON homepage_headlines
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update homepage headlines"
  ON homepage_headlines
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert homepage headlines"
  ON homepage_headlines
  FOR INSERT
  WITH CHECK (id = 1);

INSERT INTO homepage_headlines (id, line1, line2, line3_prefix, line3_highlight, line3_suffix, cta_text)
VALUES (
  1,
  'The trick used by',
  'adult film actors',
  'How this ',
  'baking soda trick',
  ' produces rock-hard erections instantly?',
  'WATCH BELOW AND SEE HOW IT WORKS'
)
ON CONFLICT (id) DO NOTHING;