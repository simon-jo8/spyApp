import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_DDB_URL, import.meta.env.VITE_DDB_KEY)