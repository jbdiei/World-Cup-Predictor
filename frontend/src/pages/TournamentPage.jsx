import { useState, useRef } from 'react'
import { simulateTournament } from '../api'
import BracketView from '../components/BracketView'
import { Flag } from '../flags'

const ROUND_SCHEDULE = [
  { key: 'round_of_32',   matchDelay: 160, pauseAfter: 800  },
  { key: 'round_of_16',   matchDelay: 230, pauseAfter: 700  },
  { key: 'quarterfinals', matchDelay: 340, pauseAfter: 700  },
  { key: 'semifinals',    matchDelay: 500, pauseAfter: 900  },
  { key: 'final',         matchDelay: 900, pauseAfter: 0    },
]

function ChampionBanner({ champion, finalMatch }) {
  const runner = finalMatch.winner.name === finalMatch.home_team.name
    ? finalMatch.away_team
    : finalMatch.home_team
  const score = `${finalMatch.home_goals}–${finalMatch.away_goals}${finalMatch.penalties ? ' (P)' : ''}`

  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 55%)',
      border: '1px solid #FCD34D',
      borderRadius: 20,
      padding: '36px 48px',
      marginBottom: 40,
      animation: 'reveal 0.5s ease both',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <div style={{ flexShrink: 0 }}><Flag name={champion.name} size={80} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: '#B45309', textTransform: 'uppercase', marginBottom: 8 }}>
            World Cup 2026 Champion
          </div>
          <h2 style={{ margin: 0, fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', color: '#0F172A', lineHeight: 1 }}>
            {champion.name}
          </h2>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{
              fontSize: 14, color: '#475569',
              fontFamily: 'ui-monospace, monospace',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 8, padding: '6px 14px',
            }}>
              Final · {finalMatch.home_team.name} {score} {finalMatch.away_team.name}
            </div>
            <div style={{ fontSize: 14, color: '#64748B' }}>
              Runner-up: <Flag name={runner.name} size={16} /> {runner.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TournamentPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [revealed, setRevealed] = useState(null)
  const cancelRef = useRef(false)

  const sleep = (ms) => new Promise(r => setTimeout(r, ms))

  const runAnimation = async (data) => {
    cancelRef.current = false
    setAnimating(true)
    setRevealed({ round_of_32: 0, round_of_16: 0, quarterfinals: 0, semifinals: 0, final: 0 })

    for (const { key, matchDelay, pauseAfter } of ROUND_SCHEDULE) {
      const count = key === 'final' ? 1 : data[key].length
      for (let i = 1; i <= count; i++) {
        if (cancelRef.current) return
        await sleep(matchDelay)
        setRevealed(prev => ({ ...prev, [key]: i }))
      }
      if (pauseAfter > 0 && !cancelRef.current) await sleep(pauseAfter)
    }

    setAnimating(false)
  }

  const handleSimulate = async () => {
    cancelRef.current = true
    setLoading(true)
    setError(null)
    setResult(null)
    setRevealed(null)
    try {
      const data = await simulateTournament()
      setResult(data)
      runAnimation(data)
    } catch {
      setError('Simulation failed. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const skipAnimation = () => {
    cancelRef.current = true
    if (result) {
      setRevealed({
        round_of_32:   result.round_of_32.length,
        round_of_16:   result.round_of_16.length,
        quarterfinals: result.quarterfinals.length,
        semifinals:    result.semifinals.length,
        final:         1,
      })
    }
    setAnimating(false)
  }

  const finalRevealed = revealed?.final >= 1

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>
            FIFA World Cup 2026
          </div>
          <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A', lineHeight: 1 }}>
            Tournament Simulator
          </h2>
          <p style={{ margin: '8px 0 0', fontSize: 15, color: '#475569' }}>
            Simulates all 12 groups · R32 through Final · 103 matches
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {animating && (
            <button
              onClick={skipAnimation}
              style={{
                padding: '11px 18px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 10,
                color: '#475569',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#CBD5E1' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E2E8F0' }}
            >
              Skip →
            </button>
          )}
          <button
            onClick={handleSimulate}
            disabled={loading}
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
            {loading ? 'Simulating…' : result ? 'Re-simulate' : 'Simulate Tournament'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', color: '#B91C1C', fontSize: 14, marginBottom: 24 }}>
          {error}
        </div>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 20,
          padding: '52px 40px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', color: '#CC1420', textTransform: 'uppercase', marginBottom: 12 }}>
            Full Tournament Simulation
          </div>
          <h3 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em' }}>
            Watch the bracket play out in real time
          </h3>
          <p style={{ margin: '0 0 32px', fontSize: 15, color: '#475569', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
            Simulates all 12 groups, picks 32 qualifiers, then runs every knockout match from R32 to the Final.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 36 }}>
            {['12 groups', '103 matches', 'Animated reveal'].map(label => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, color: '#475569' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0E7490', flexShrink: 0, display: 'inline-block' }} />
                {label}
              </div>
            ))}
          </div>
          <button
            onClick={handleSimulate}
            style={{
              padding: '14px 40px',
              background: '#CC1420',
              border: 'none',
              borderRadius: 12,
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#B01020' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#CC1420' }}
          >
            Run Full Simulation
          </button>
        </div>
      )}

      {/* Animation status */}
      {result && animating && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 20, padding: '11px 16px',
          background: '#ECFEFF', border: '1px solid #A5F3FC',
          borderRadius: 10, fontSize: 14, color: '#0E7490', fontWeight: 600,
        }}>
          <span className="spinner" style={{ width: 14, height: 14, borderTopColor: '#0E7490', borderColor: 'rgba(14,116,144,0.15)' }} />
          Simulating tournament…
        </div>
      )}

      {/* Results */}
      {result && revealed && (
        <>
          {finalRevealed && (
            <ChampionBanner champion={result.champion} finalMatch={result.final} />
          )}

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#64748B', textTransform: 'uppercase', marginBottom: 4 }}>
              Knockout Bracket
            </div>
            <p style={{ margin: 0, fontSize: 14, color: '#64748B' }}>
              Seeded by group finish · Scroll right to follow the path
            </p>
          </div>
          <BracketView result={result} revealed={revealed} />
        </>
      )}
    </div>
  )
}
