'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Monogram from '@/app/components/Monogram'

function AuthContent() {
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
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: email.split('@')[0] } }
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
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md editorial-panel p-10">
        <div className="text-center mb-8 pb-8 border-b border-rule">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Monogram size={36} />
            </div>
            <h1 className="font-masthead text-3xl text-ink tracking-wide">
              The Chronicle Finance
            </h1>
          </Link>
          <p className="font-label text-[8px] tracking-[0.2em] text-ink-soft mt-3 uppercase font-medium">
            Quantitative research gateway
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`font-label text-[10px] tracking-[0.15em] transition-colors pb-1 uppercase font-medium ${
              isLogin ? 'text-ink border-b border-ink' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`font-label text-[10px] tracking-[0.15em] transition-colors pb-1 uppercase font-medium ${
              !isLogin ? 'text-ink border-b border-ink' : 'text-ink-soft hover:text-ink'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 border border-rule bg-paper text-sm font-body text-ink">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block font-label text-[9px] tracking-[0.15em] text-ink-soft mb-2 uppercase font-medium">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="analyst@firm.com"
              className="w-full bg-paper border-b border-rule px-1 py-2 font-body text-sm text-ink focus:outline-none focus:border-gold transition-colors placeholder:text-ink-soft"
            />
          </div>
          
          <div>
            <label className="block font-label text-[9px] tracking-[0.15em] text-ink-soft mb-2 uppercase font-medium">
              Passphrase
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-paper border-b border-rule px-1 py-2 font-body text-sm text-ink focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full editorial-button py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : isLogin ? 'Access gateway' : 'Establish credential'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-rule">
          <p className="font-body text-xs italic text-ink-soft leading-relaxed">
            Simulation history, research notes, and report archives require a Chronicle account.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
        <div className="font-label text-[10px] tracking-[0.2em] text-ink-soft uppercase font-medium">
          LOADING GATEWAY...
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  )
}
