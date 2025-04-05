import { createClient, } from '@supabase/supabase-js';

const supabaseUrl = 'https://sypzttnhqtqzxuhbrhae.supabase.co';
const supabaseApiKey = process.env.SUPABASE_API_KEY || '';
const supabase = createClient( supabaseUrl, supabaseApiKey );

export default supabase;