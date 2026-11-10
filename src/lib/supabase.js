import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrfehxsfqtgrzkladwtn.supabase.co';
const supabaseAnonKey = 'sb_publishable_qYaWUq0KarA2LxOPGgYYWw_YkdlJv0X';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
