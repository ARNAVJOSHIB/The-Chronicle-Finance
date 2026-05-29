'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { apiService, SavedSimulation } from '@/app/services/apiService'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function ArchivePage() {
  const { user } = useAuth()
  const [simulations, setSimulations] = useState<SavedSimulation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchSims = async () => {
        try {
          const data = await apiService.getUserSimulations(user.id)
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

  if (!user) {
    return null // middleware handles redirect
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col min-h-screen font-ibm">
      <Navbar />
      
      <main className="flex-1 p-12 pb-32">
        <div className="border-b border-dark-charcoal/20 pb-10 mb-12 relative text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] font-inter text-dark-charcoal mb-4">Historical Data</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-black text-dark-charcoal tracking-tight leading-tight mb-6">
            Simulation Archive
          </h1>
          <p className="text-sm md:text-base text-dark-charcoal/80 max-w-2xl mx-auto font-libre italic">
            Access your previously executed models, review past assumptions, and track how your financial perspectives have evolved over time.
          </p>
        </div>

        {loading ? (
          <p className="text-center py-24 font-ibm italic text-dark-charcoal/60">Accessing secure archives...</p>
        ) : simulations.length === 0 ? (
          <p className="text-center py-24 font-ibm italic text-dark-charcoal/60">No simulation history found for this analyst.</p>
        ) : (
          <div className="overflow-x-auto editorial-panel border-black p-0 border">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-dark-charcoal bg-dark-charcoal/5">
                  <th className="py-4 px-6 font-inter text-[10px] uppercase tracking-[0.2em] font-bold text-dark-charcoal">Record ID</th>
                  <th className="py-4 px-6 font-inter text-[10px] uppercase tracking-[0.2em] font-bold text-dark-charcoal">Framework</th>
                  <th className="py-4 px-6 font-inter text-[10px] uppercase tracking-[0.2em] font-bold text-dark-charcoal">Timestamp</th>
                  <th className="py-4 px-6 font-inter text-[10px] uppercase tracking-[0.2em] font-bold text-dark-charcoal text-right">Action</th>
                </tr>
              </thead>
              <tbody className="font-ibm text-sm text-dark-charcoal">
                {simulations.map((sim, i) => (
                  <tr key={sim.id} className={`hover:bg-dark-charcoal/5 transition-colors ${i !== simulations.length - 1 ? 'border-b border-dark-charcoal/10' : ''}`}>
                    <td className="py-4 px-6 font-mono text-xs text-dark-charcoal/60">
                      SIM-{sim.id.toString().padStart(4, '0')}
                    </td>
                    <td className="py-4 px-6 font-bold capitalize">
                      {sim.model_type.replace(/-/g, ' ')}
                    </td>
                    <td className="py-4 px-6 text-dark-charcoal/80">
                      {new Date(sim.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link 
                        href={`/${sim.model_type}?sim_id=${sim.id}`}
                        className="text-[10px] font-inter uppercase tracking-[0.2em] text-financial-blue hover:text-dark-charcoal transition-colors font-bold whitespace-nowrap border-b border-financial-blue hover:border-dark-charcoal pb-0.5"
                      >
                        Load Model &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
