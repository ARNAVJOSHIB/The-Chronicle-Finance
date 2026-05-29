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
        // If email confirmation is enabled, they might need to check their email
        // but for now we'll assume they can just log in if it succeeds without email confirmation, or we show a message
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
    <div className="min-h-screen bg-[#F3F1EB] flex flex-col items-center justify-center p-4 font-libre">
      <div className="w-full max-w-md bg-[#F3F1EB] border border-dark-charcoal/10 p-8 shadow-sm">
        <div className="text-center mb-8 pb-8 border-b border-dark-charcoal/10">
          <Link href="/" className="inline-block">
            <h1 className="font-unifraktur text-4xl text-dark-charcoal tracking-tight">
              Chronicle Finance
            </h1>
          </Link>
          <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-dark-charcoal/60 mt-4">
            Quantitative Research Gateway
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`font-inter text-[10px] uppercase tracking-[0.2em] transition-colors pb-1 ${
              isLogin 
                ? 'text-dark-charcoal border-b border-dark-charcoal' 
                : 'text-dark-charcoal/40 hover:text-dark-charcoal'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`font-inter text-[10px] uppercase tracking-[0.2em] transition-colors pb-1 ${
              !isLogin 
                ? 'text-dark-charcoal border-b border-dark-charcoal' 
                : 'text-dark-charcoal/40 hover:text-dark-charcoal'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 border border-dark-charcoal/10 bg-white/50 text-sm font-ibm text-dark-charcoal/80">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block font-inter text-[9px] uppercase tracking-[0.2em] text-dark-charcoal/60 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="analyst@firm.com"
              className="w-full bg-[#F3F1EB] border border-dark-charcoal/20 px-3 py-2 font-ibm text-sm text-dark-charcoal focus:outline-none focus:border-dark-charcoal placeholder:text-dark-charcoal/30 rounded-none"
            />
          </div>
          
          <div>
            <label className="block font-inter text-[9px] uppercase tracking-[0.2em] text-dark-charcoal/60 mb-2">
              Passphrase
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#F3F1EB] border border-dark-charcoal/20 px-3 py-2 font-ibm text-sm text-dark-charcoal focus:outline-none focus:border-dark-charcoal rounded-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-financial-blue hover:bg-financial-blue-light text-white font-inter text-[10px] uppercase tracking-[0.2em] py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
          >
            {loading ? 'Processing...' : isLogin ? 'Access Gateway' : 'Establish Credential'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-dark-charcoal/10">
          <p className="font-libre text-xs italic text-dark-charcoal/60 leading-relaxed">
            Simulation history, research notes, and report archives require a Chronicle account.
          </p>
        </div>
      </div>
    </div>
  )
}
