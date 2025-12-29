import { createClient } from '@supabase/supabase-js';
//TODO: Move these to environment variables later
const supabaseUrl = 'https://sibeyhfunnadejlcuyxu.supabase.co';
const supabaseAnonKey = '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);