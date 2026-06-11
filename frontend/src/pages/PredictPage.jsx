import { useState, useEffect } from 'react'
import { getGroups, predictMatch } from '../api'
import WinProbBar from '../components/WinProbBar'
import { Flag } from '../flags'
import { useIsMobile } from '../hooks/useIsMobile'

const selectStyle = {
  width: '100%',
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  borderRadius: 10,
  padding: '11px 36px 11px 13px',
  fontSize: 15,
  fontWeight: 500,
  color: '#0F172A',
  cursor: 'pointer',
  outline: 'none',
}

export default function PredictPage() {
  const [teams, setTeams] = useState([])
  const [home, setHome] = useState('')
  const [away, setAway] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    getGroups().then(groups => {
      const all = Object.values(groups).flat()
      const sorted = all.sort((a, b) => a.name.localeCompare(b.name))
      setTeams(sorted)
      if (sorted.length >= 2) {
        setHome(sorted[0].name)
        setAway(sorted[1].name)
      }
    })
  }, [])

  const handleSwap = () => {
    setHome(away)
    setAway(home)
    setResult(null)
  }

  const handlePredict = async () => {
    if (!home || !away || home === away) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await predictMatch(home, away)
      setResult({ data, home, away })
    } catch {
      setError('Prediction failed. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>
          FIFA World Cup 2026
        </div>
        <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A' }}>
          Match Predictor
        </h2>
        <p style={{ margin: '8px 0 0', fontSize: 15, color: '#475569' }}>
          Head-to-head win probability via Elo ratings
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 16,
        overflow: 'hidden',
      }}>
        {/* Team selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#F1F5F9' }}>
          <div style={{ background: '#FFFFFF', padding: '20px 20px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>
              Home
            </div>
            <select value={home} onChange={e => { setHome(e.target.value); setResult(null) }} style={selectStyle}>
              {teams.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
            </select>
          </div>
          <div style={{ background: '#FFFFFF', padding: '20px 20px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#64748B', textTransform: 'uppercase', marginBottom: 8 }}>
              Away
            </div>
            <select value={away} onChange={e => { setAway(e.target.value); setResult(null) }} style={selectStyle}>
              {teams.filter(t => t.name !== home).map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
            </select>
          </div>
        </div>

        {/* Matchup hero */}
        <div style={{ padding: isMobile ? '20px 16px' : '28px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ marginBottom: 8 }}><Flag name={home} size={isMobile ? 36 : 48} /></div>
            <div style={{ fontSize: isMobile ? 15 : 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A', lineHeight: 1.1 }}>
              {home}
            </div>
          </div>

          <div style={{ padding: isMobile ? '0 10px' : '0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
              fontSize: 12, fontWeight: 800, letterSpacing: '0.18em',
              color: '#64748B', textTransform: 'uppercase',
              padding: '7px 14px',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
            }}>
              VS
            </div>
            <button
              onClick={handleSwap}
              title="Swap teams"
              style={{
                width: 32, height: 32,
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '50%',
                fontSize: 15,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#64748B',
                transition: 'all 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#0F172A' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#64748B' }}
            >
              ⇄
            </button>
          </div>

          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ marginBottom: 8 }}><Flag name={away} size={isMobile ? 36 : 48} /></div>
            <div style={{ fontSize: isMobile ? 15 : 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A', lineHeight: 1.1 }}>
              {away}
            </div>
          </div>
        </div>

        {/* Predict button */}
        <div style={{ padding: '0 20px 20px' }}>
          <button
            onClick={handlePredict}
            disabled={loading || home === away}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#FEE2E2' : '#CC1420',
              border: 'none',
              borderRadius: 10,
              color: loading ? '#FCA5A5' : '#FFFFFF',
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.01em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#B01020' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#CC1420' }}
          >
            {loading && <span className="spinner" style={{ width: 15, height: 15, borderTopColor: '#FFFFFF' }} />}
            {loading ? 'Calculating…' : 'Run Prediction'}
          </button>
          {error && <p style={{ margin: '10px 0 0', color: '#B91C1C', fontSize: 13, textAlign: 'center' }}>{error}</p>}
        </div>
      </div>

      {result && <WinProbBar home={result.home} away={result.away} probs={result.data} />}
    </div>
  )
}
