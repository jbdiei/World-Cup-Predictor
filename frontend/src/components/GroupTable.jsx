import { Flag } from '../flags'

const ROW_ACCENT = [
  { left: '#0E7490', bg: 'rgba(14,116,144,0.04)' },
  { left: '#0E7490', bg: 'rgba(14,116,144,0.04)' },
  { left: '#B45309', bg: 'rgba(180,83,9,0.04)'   },
  { left: 'transparent', bg: 'transparent'         },
]

export default function GroupTable({ group, standings, onSimulate }) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: 16,
      overflow: 'hidden',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = '#CBD5E1'
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = '#E2E8F0'
      e.currentTarget.style.boxShadow = 'none'
    }}
    >
      {/* Header */}
      <div style={{ position: 'relative', padding: '16px 20px 12px', overflow: 'hidden' }}>
        <span style={{
          position: 'absolute', right: 8, top: -8,
          fontSize: 100, fontWeight: 900, lineHeight: 1,
          color: 'rgba(0,0,0,0.07)', letterSpacing: '-0.05em',
          pointerEvents: 'none', userSelect: 'none',
        }}>
          {group}
        </span>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#64748B', textTransform: 'uppercase', marginBottom: 2 }}>
              Group
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {group}
            </div>
          </div>
          <button
            onClick={onSimulate}
            title="Re-simulate this group"
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              color: '#64748B',
              fontSize: 13,
              fontWeight: 600,
              padding: '5px 10px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              lineHeight: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0F172A'; e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.borderColor = '#CBD5E1' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0' }}
          >
            ↺
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#F1F5F9' }} />

      {/* Rows */}
      <div>
        {standings.map((s, i) => {
          const accent = ROW_ACCENT[i] || ROW_ACCENT[3]
          const isAdvancing = i < 2
          const isBest3 = i === 2
          return (
            <div
              key={s.team.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '11px 20px',
                borderLeft: `2px solid ${accent.left}`,
                background: accent.bg,
                borderBottom: i < standings.length - 1 ? '1px solid #F1F5F9' : 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC' }}
              onMouseLeave={e => { e.currentTarget.style.background = accent.bg }}
            >
              {/* Rank */}
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#64748B', fontWeight: 700, width: 16, flexShrink: 0 }}>
                {i + 1}
              </span>

              {/* Flag + Name */}
              <div style={{ flex: 1, marginLeft: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Flag name={s.team.name} size={20} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: isAdvancing ? '#0F172A' : '#64748B', letterSpacing: '-0.01em' }}>
                    {s.team.name}
                  </span>
                </div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#64748B', marginTop: 2, marginLeft: 23 }}>
                  {s.wins}W {s.draws}D {s.losses}L
                  <span style={{ marginLeft: 6, color: s.goal_difference > 0 ? '#0E7490' : s.goal_difference < 0 ? '#CC1420' : '#64748B' }}>
                    {s.goal_difference > 0 ? '+' : ''}{s.goal_difference}
                  </span>
                </div>
              </div>

              {/* Points */}
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'ui-monospace, monospace',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: isAdvancing ? '#0E7490' : isBest3 ? '#B45309' : '#64748B',
                  lineHeight: 1,
                }}>
                  {s.points}
                </div>
                <div style={{ fontSize: 10, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 1 }}>
                  pts
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer legend */}
      <div style={{
        padding: '8px 20px',
        borderTop: '1px solid #F1F5F9',
        display: 'flex',
        gap: 16,
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#64748B' }}>
          <span style={{ width: 8, height: 2, background: '#0E7490', borderRadius: 1, display: 'inline-block' }} />
          Advance
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#64748B' }}>
          <span style={{ width: 8, height: 2, background: '#B45309', borderRadius: 1, display: 'inline-block' }} />
          Best 3rd
        </span>
      </div>
    </div>
  )
}
