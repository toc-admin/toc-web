import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

// Cookie-less anon client for contexts outside a request scope
// (sitemap generation, build-time data fetching)
export const createAnonClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
