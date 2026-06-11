import { useState, useEffect } from 'react'
import { getGroups, simulateOdds } from '../api'
import { Flag } from '../flags'
import { useIsMobile } from '../hooks/useIsMobile'

const N_OPTIONS = [
  { value: 500,  label: '500',  note: 'Fast' },
  { value: 1000, label: '1000', note: 'Balanced' },
  { value: 5000, label: '5000', note: 'Precise' },
]

function rowAccent(rank) {
  if (rank <= 3)  return { left: '#B45309', bg: 'rgba(180,83,9,0.04)' }
  if (rank <= 8)  return { left: '#0E7490', bg: 'rgba(14,116,144,0.03)' }
  return { left: 'transparent', bg: 'transparent' }
}

export default function OddsPage() {
  const [allTeams, setAllTeams] = useState([])
  const [rankings, setRankings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [n, setN] = useState(1000)
  const [ranWith, setRanWith] = useState(null)

  useEffect(() => {
    getGroups().then(groups => {
      setAllTeams(Object.values(groups).flat())
    })
  }, [])

  const handleRun = async () => {
    setLoading(true)
    setError(null)
    try {
      const odds = await simulateOdds(n)
      const merged = allTeams
        .map(t => ({ ...t, prob: odds[t.name] ?? 0 }))
        .sort((a, b) => b.prob - a.prob)
      setRankings(merged)
      setRanWith(n)
    } catch {
      setError('Simulation failed. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const isMobile = useIsMobile()
  const maxProb = rankings.length > 0 ? rankings[0].prob : 1

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: isMobile ? 16 : 0, marginBottom: isMobile ? 20 : 32 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>
            FIFA World Cup 2026
          </div>
          <h2 style={{ margin: 0, fontSize: isMobile ? 26 : 34, fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A', lineHeight: 1 }}>
            Tournament Odds
          </h2>
          <p style={{ margin: '8px 0 0', fontSize: 15, color: '#475569' }}>
            Monte Carlo win probability across all 48 teams
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', gap: 8, width: isMobile ? '100%' : 'auto' }}>
          {/* N selector */}
          <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 10, padding: 3, gap: 2 }}>
            {N_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setN(opt.value)}
                style={{
                  padding: '6px 12px',
                  background: n === opt.value ? '#FFFFFF' : 'transparent',
                  border: n === opt.value ? '1px solid #E2E8F0' : '1px solid transparent',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: n === opt.value ? '#0F172A' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  lineHeight: 1,
                }}
              >
                {opt.label}
                <span style={{ fontSize: 10, display: 'block', fontWeight: 400, color: '#64748B', marginTop: 1 }}>
                  {opt.note}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleRun}
            disabled={loading || allTeams.length === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 22px',
              background: loading ? '#FEE2E2' : '#CC1420',
              border: 'none',
              borderRadius: 10,
              color: loading ? '#FCA5A5' : '#FFFFFF',
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#B01020' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#CC1420' }}
          >
            {loading && <span className="spinner" style={{ width: 14, height: 14, borderTopColor: '#FFFFFF' }} />}
            {loading ? `Running ${n} sims…` : rankings.length > 0 ? 'Re-run' : 'Run Simulation'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', color: '#B91C1C', fontSize: 14, marginBottom: 24 }}>
          {error}
        </div>
      )}

      {/* Empty state */}
      {rankings.length === 0 && !loading && (
        <div style={{
          background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 20,
          padding: '52px 40px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', color: '#CC1420', textTransform: 'uppercase', marginBottom: 12 }}>
            Monte Carlo Simulation
          </div>
          <h3 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>
            Who wins the World Cup?
          </h3>
          <p style={{ margin: '0 0 28px', fontSize: 15, color: '#475569', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            Runs the full tournament N times and ranks all 48 teams by how often they win.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 10, padding: 3, gap: 2 }}>
              {N_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setN(opt.value)}
                  style={{
                    padding: '8px 16px',
                    background: n === opt.value ? '#FFFFFF' : 'transparent',
                    border: n === opt.value ? '1px solid #E2E8F0' : '1px solid transparent',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: n === opt.value ? '#0F172A' : '#64748B',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    lineHeight: 1,
                  }}
                >
                  {opt.label}
                  <span style={{ fontSize: 10, display: 'block', fontWeight: 400, color: '#64748B', marginTop: 2 }}>
                    {opt.note}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleRun}
            disabled={allTeams.length === 0}
            style={{
              padding: '14px 40px', background: '#CC1420', border: 'none', borderRadius: 12,
              color: '#FFFFFF', fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#B01020' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#CC1420' }}
          >
            Run Simulation
          </button>
        </div>
      )}

      {/* Results table */}
      {rankings.length > 0 && (
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, overflow: 'hidden' }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '44px 1fr 72px' : '44px 1fr 180px 72px',
            padding: '10px 20px', borderBottom: '1px solid #F1F5F9',
            background: '#F8FAFC',
          }}>
            {(isMobile ? ['#', 'Team', '%'] : ['#', 'Team', 'Win probability', '%']).map((h, i) => (
              <div key={h} style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: '#64748B',
                textTransform: 'uppercase', textAlign: i === (isMobile ? 2 : 3) ? 'right' : 'left',
              }}>
                {h}
              </div>
            ))}
          </div>

          {rankings.map((team, i) => {
            const accent = rowAccent(i + 1)
            const barWidth = maxProb > 0 ? (team.prob / maxProb) * 100 : 0

            return (
              <div
                key={team.name}
                style={{
                  display: 'grid', gridTemplateColumns: isMobile ? '44px 1fr 72px' : '44px 1fr 180px 72px',
                  alignItems: 'center',
                  padding: '12px 20px',
                  borderLeft: `2px solid ${accent.left}`,
                  background: accent.bg,
                  borderBottom: i < rankings.length - 1 ? '1px solid #F1F5F9' : 'none',
                  animation: 'fadeInUp 0.3s ease both',
                  animationDelay: `${Math.min(i * 0.015, 0.4)}s`,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC' }}
                onMouseLeave={e => { e.currentTarget.style.background = accent.bg }}
              >
                {/* Rank */}
                <div style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: i < 3 ? 14 : 12,
                  fontWeight: i < 3 ? 800 : 600,
                  color: i < 3 ? '#B45309' : i < 8 ? '#0E7490' : '#64748B',
                }}>
                  {i + 1}
                </div>

                {/* Flag + Name + Conf */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Flag name={team.name} size={22} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', letterSpacing: '-0.01em' }}>
                      {team.name}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>
                      {team.confederation} · Rank {team.fifa_rank}
                    </div>
                  </div>
                </div>

                {/* Bar — hidden on mobile */}
                {!isMobile && (
                  <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                    {team.prob > 0 && (
                      <div style={{
                        height: '100%',
                        width: `${barWidth}%`,
                        background: i < 3 ? '#B45309' : i < 8 ? '#CC1420' : '#CBD5E1',
                        borderRadius: 3,
                        animation: 'barGrow 0.5s ease both',
                        animationDelay: `${Math.min(i * 0.015, 0.4)}s`,
                        transformOrigin: 'left',
                      }} />
                    )}
                  </div>
                )}

                {/* Percentage */}
                <div style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: i < 3 ? 16 : 14,
                  fontWeight: 700,
                  color: i < 3 ? '#B45309' : i < 8 ? '#0E7490' : (team.prob > 0 ? '#475569' : '#64748B'),
                  textAlign: 'right',
                  letterSpacing: '-0.02em',
                }}>
                  {team.prob > 0 ? `${(team.prob * 100).toFixed(1)}%` : '—'}
                </div>
              </div>
            )
          })}

          {/* Footer */}
          <div style={{
            padding: '10px 20px', borderTop: '1px solid #F1F5F9', background: '#F8FAFC',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: 20 }}>
              {[
                { color: '#B45309', label: 'Top 3 favorites' },
                { color: '#0E7490', label: 'Top 8' },
              ].map(({ color, label }) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748B' }}>
                  <span style={{ width: 8, height: 2, background: color, borderRadius: 1, display: 'inline-block' }} />
                  {label}
                </span>
              ))}
            </div>
            {ranWith && (
              <div style={{ fontSize: 11, color: '#64748B' }}>
                Based on {ranWith.toLocaleString()} simulations · Elo + Poisson model
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
