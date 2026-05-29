import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aizscacuaclpjohqanqd.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpenNjYWN1YWNscGpvaHFhbnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMjg5MzgsImV4cCI6MjA5NTYwNDkzOH0.22fxynOAbLwKHmO3eBsm1T7bcvBAJ5xL_aYlUWWKZ_g'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
