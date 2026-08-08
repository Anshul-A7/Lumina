import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hrjwhvkaznsszuzubnah.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_YM0qWYq7eOEU-FJ_p1CkqA_Qt3h5lVp';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
