'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { simulationStore } from '@/features/simulation/persistence/simulationStore'
import type { SavedSimulation } from '@/features/simulation/types'
import Link from 'next/link'

export default function ArchivePage() {
  const { user } = useAuth()
  const [simulations, setSimulations] = useState<SavedSimulation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchSims = async () => {
        try {
          const data = await simulationStore.getUserSimulations(user.id)
          setSimulations(data)
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
      fetchSims()
    } else {
      setLoading(false)
    }
  }, [user])

  return (
    <div className="pb-24 px-6 max-w-5xl mx-auto">
      <div className="border-b-news-thick pb-8 mb-12 text-center pt-8">
        <p className="text-[9px] font-label tracking-[0.25em] text-ink-soft uppercase font-medium mb-4">Simulation Archive</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ink tracking-tight mb-6">
          Research Ledger
        </h1>
        <p className="font-body text-sm text-ink-soft max-w-2xl mx-auto leading-relaxed">
          A complete record of every simulation executed within your research environment.
        </p>
      </div>

      {!user ? (
        <div className="max-w-2xl mx-auto text-center py-16 editorial-panel p-10">
          <p className="font-body text-sm text-ink-soft mb-6">
            Sign in to access your simulation archive.
          </p>
          <Link href="/auth" className="editorial-button inline-block px-8 py-3">
            Sign in
          </Link>
        </div>
      ) : loading ? (
        <div className="text-center py-16">
          <span className="text-[10px] font-label tracking-[0.2em] text-ink-soft uppercase font-medium">
            Loading archive...
          </span>
        </div>
      ) : simulations.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-16 editorial-panel p-10">
          <p className="font-body text-sm text-ink-italic">
            No simulations recorded yet. Execute a model to begin your research journal.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-news-thick">
                <th className="text-[9px] font-label tracking-[0.2em] text-ink-soft uppercase font-medium text-left pb-4">ID</th>
                <th className="text-[9px] font-label tracking-[0.2em] text-ink-soft uppercase font-medium text-left pb-4">Model</th>
                <th className="text-[9px] font-label tracking-[0.2em] text-ink-soft uppercase font-medium text-left pb-4">Date</th>
                <th className="text-[9px] font-label tracking-[0.2em] text-ink-soft uppercase font-medium text-right pb-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {simulations.map((sim) => (
                <tr key={sim.id} className="border-b border-rule hover:bg-paper-aged transition-colors">
                  <td className="font-mono text-[10px] text-ink-soft py-3">SIM-{sim.id.toString().padStart(4, '0')}</td>
                  <td className="font-body text-xs text-ink py-3 capitalize">{sim.model_type.replace(/-/g, ' ')}</td>
                  <td className="font-body text-xs text-ink-soft py-3">{new Date(sim.created_at).toLocaleDateString()}</td>
                  <td className="text-right py-3">
                    <Link
                      href={`/${sim.model_type}?sim_id=${sim.id}`}
                      className="text-[9px] font-label tracking-[0.15em] text-gold hover:text-ink uppercase font-medium transition-colors"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
