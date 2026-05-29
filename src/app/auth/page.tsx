'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const supabase = createClient()
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: email.split('@')[0],
            }
          }
        })
        if (error) throw error
      }
      
      router.push(redirectTo)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-parchment flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-parchment border border-ink/20 p-8 shadow-sm">
        <div className="text-center mb-8 pb-8 border-b border-ink/20">
          <Link href="/" className="inline-block">
            <h1 className="font-display text-5xl text-ink tracking-tight">
              The Chronicle
            </h1>
          </Link>
          <p className="font-ui text-[9px] tracking-[0.2em] text-ink/60 mt-4 font-bold">
            Quantitative research gateway
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`font-ui text-[10px] tracking-[0.2em] transition-colors pb-1 font-bold ${
              isLogin 
                ? 'text-ink border-b border-ink' 
                : 'text-ink/40 hover:text-ink'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`font-ui text-[10px] tracking-[0.2em] transition-colors pb-1 font-bold ${
              !isLogin 
                ? 'text-ink border-b border-ink' 
                : 'text-ink/40 hover:text-ink'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 border border-ink/20 bg-parchment text-sm font-ui text-ink/80">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block font-ui text-[9px] tracking-[0.2em] text-ink/60 mb-2 font-bold">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="analyst@firm.com"
              className="w-full bg-parchment border border-ink/20 px-3 py-2 font-ui text-sm text-ink focus:outline-none focus:border-ink placeholder:text-ink/30 rounded-none"
            />
          </div>
          
          <div>
            <label className="block font-ui text-[9px] tracking-[0.2em] text-ink/60 mb-2 font-bold">
              Passphrase
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-parchment border border-ink/20 px-3 py-2 font-ui text-sm text-ink focus:outline-none focus:border-ink rounded-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full editorial-button font-ui text-[10px] tracking-[0.2em] py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : isLogin ? 'Access gateway' : 'Establish credential'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-ink/10">
          <p className="font-ui text-xs italic text-ink/60 leading-relaxed">
            Simulation history, research notes, and report archives require a Chronicle account.
          </p>
        </div>
      </div>
    </div>
  )
}
