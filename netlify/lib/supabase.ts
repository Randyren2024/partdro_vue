import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://gcsshuvfzuinevacraao.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
}

/**
 * Supabase client for server-side operations (Netlify Functions).
 * Uses service_role key to bypass RLS for administrative operations.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

/**
 * Supabase client for client-side operations within functions.
 * Uses anon key for RLS-enabled operations.
 */
export const supabaseClient = createClient(
  supabaseUrl,
  process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjc3NodXZmenVpbmV2YWNyYWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1ODk4MDYsImV4cCI6MjA4MTE2NTgwNn0.z0PWfvom52SFIacK0OiR4r_ofl0n9CSMlE3xe85wne4'
)
