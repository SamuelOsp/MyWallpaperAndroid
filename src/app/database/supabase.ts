import { createClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'

// Create a single supabase client for interacting with your database
export const supabase = createClient(environment.SUPABASE.URL, environment.SUPABASE.API_KEY);