import { useState, useEffect } from 'react'
import { getGroups, simulateGroup } from '../api'
import GroupTable from '../components/GroupTable'

const GROUPS = 'ABCDEFGHIJKL'.split('')

function zeroStandings(teams) {
  return teams.map(team => ({
    team,
    played: 0, wins: 0, draws: 0, losses: 0,
    goals_for: 0, goals_against: 0,
    points: 0, goal_difference: 0,
  }))
}

export default function GroupsPage() {
  const [standings, setStandings] = useState({})
  const [loading, setLoading] = useState(true)
  const [simulating, setSimulating] = useState(false)
  const [hasSimulated, setHasSimulated] = useState(false)

  useEffect(() => {
    getGroups().then(groups => {
      const zeroed = Object.fromEntries(
        Object.entries(groups).map(([g, teams]) => [g, zeroStandings(teams)])
      )
      setStandings(zeroed)
      setLoading(false)
    })
  }, [])

  const simulateAll = async () => {
    setSimulating(true)
    const results = await Promise.all(
      GROUPS.map(g => simulateGroup(g).then(data => [g, data]))
    )
    setStandings(Object.fromEntries(results))
    setSimulating(false)
    setHasSimulated(true)
  }

  const handleSimulateGroup = async (group) => {
    const data = await simulateGroup(group)
    setStandings(prev => ({ ...prev, [group]: data }))
    setHasSimulated(true)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: '#64748B', textTransform: 'uppercase', marginBottom: 6 }}>
            FIFA World Cup 2026
          </div>
          <h2 style={{ margin: 0, fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A', lineHeight: 1 }}>
            Group Stage
          </h2>
          <p style={{ margin: '8px 0 0', fontSize: 15, color: '#475569' }}>
            Top 2 from each group advance · Best 8 third-place teams advance
          </p>
        </div>
        <button
          onClick={simulateAll}
          disabled={simulating || loading}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px',
            background: simulating ? '#FEE2E2' : hasSimulated ? '#FFFFFF' : '#CC1420',
            border: hasSimulated ? '1px solid #E2E8F0' : 'none',
            borderRadius: 10,
            color: simulating ? '#FCA5A5' : hasSimulated ? '#475569' : '#FFFFFF',
            fontSize: 15,
            fontWeight: 700,
            cursor: simulating ? 'not-allowed' : 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            if (simulating) return
            if (hasSimulated) { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#CBD5E1' }
            else e.currentTarget.style.background = '#B01020'
          }}
          onMouseLeave={e => {
            if (simulating) return
            if (hasSimulated) { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E2E8F0' }
            else e.currentTarget.style.background = '#CC1420'
          }}
        >
          {simulating && <span className="spinner" style={{ width: 14, height: 14, borderTopColor: hasSimulated ? '#CC1420' : '#FFFFFF' }} />}
          {simulating ? 'Simulating…' : hasSimulated ? 'Re-simulate All' : 'Simulate All'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {loading
          ? GROUPS.map(g => (
            <div key={g} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, height: 252 }} />
          ))
          : GROUPS.map((g, idx) => (
            <div
              key={g}
              style={{ animation: `fadeInUp 0.4s ease both`, animationDelay: `${idx * 0.04}s` }}
            >
              <GroupTable
                group={g}
                standings={standings[g] || []}
                onSimulate={() => handleSimulateGroup(g)}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}
