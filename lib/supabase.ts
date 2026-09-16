import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Ensure URL is valid to prevent synchronous crashes
let validUrl = 'https://placeholder.supabase.co';
try {
  if (supabaseUrl) {
    new URL(supabaseUrl); // Validates format
    validUrl = supabaseUrl;
  }
} catch (e) {
  console.error("Invalid Supabase URL format:", supabaseUrl);
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(validUrl, supabaseAnonKey || 'placeholder');
