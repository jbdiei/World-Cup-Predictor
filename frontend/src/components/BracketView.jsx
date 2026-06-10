import { Flag } from '../flags'

const BRACKET_HEIGHT = 1040

function BracketMatchCard({ match, isRevealed }) {
  const homeWon = match.winner.name === match.home_team.name

  return (
    <div style={{
      width: 184,
      background: '#FFFFFF',
      border: `1px solid ${isRevealed ? '#E2E8F0' : '#F1F5F9'}`,
      borderRadius: 10,
      overflow: 'hidden',
      opacity: isRevealed ? 1 : 0.4,
      animation: isRevealed ? 'matchReveal 0.32s ease both' : 'none',
      transition: 'opacity 0.2s',
    }}>
      {[
        { team: match.home_team, goals: match.home_goals, won: homeWon },
        { team: match.away_team, goals: match.away_goals, won: !homeWon },
      ].map((row, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 11px',
            background: isRevealed && row.won ? 'rgba(14,116,144,0.05)' : 'transparent',
            borderBottom: i === 0 ? '1px solid #F1F5F9' : 'none',
            borderLeft: isRevealed && row.won ? '2px solid #0E7490' : '2px solid transparent',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
            <Flag name={row.team.name} size={16} />
            <span style={{
              fontSize: 12,
              fontWeight: isRevealed && row.won ? 700 : 500,
              color: isRevealed ? (row.won ? '#0F172A' : '#64748B') : '#475569',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 96,
            }}>
              {row.team.name}
            </span>
          </span>
          <span style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: 13,
            fontWeight: 800,
            color: isRevealed ? (row.won ? '#0F172A' : '#64748B') : '#CBD5E1',
            flexShrink: 0,
            marginLeft: 4,
          }}>
            {isRevealed ? row.goals : '·'}
            {isRevealed && match.penalties && row.won && (
              <span style={{ fontSize: 9, color: '#B45309', marginLeft: 3 }}>P</span>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

function BracketColumn({ label, matches, revealedCount }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: BRACKET_HEIGHT }}>
      <div style={{
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.15em',
        color: '#64748B',
        textTransform: 'uppercase',
        marginBottom: 10,
        flexShrink: 0,
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {matches.map((match, i) => (
          <div
            key={i}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <BracketMatchCard match={match} isRevealed={i < revealedCount} />
          </div>
        ))}
      </div>
    </div>
  )
}

const ROUNDS = [
  { key: 'round_of_32',   label: 'Round of 32' },
  { key: 'round_of_16',   label: 'Round of 16' },
  { key: 'quarterfinals', label: 'Quarters' },
  { key: 'semifinals',    label: 'Semis' },
  { key: 'final',         label: 'Final' },
]

export default function BracketView({ result, revealed }) {
  return (
    <div style={{ overflowX: 'auto', paddingBottom: 16 }}>
      <div style={{ display: 'flex', gap: 8, minWidth: 'max-content' }}>
        {ROUNDS.map(({ key, label }) => {
          const matches = key === 'final' ? [result.final] : result[key]
          const revealedCount = revealed ? (revealed[key] ?? 0) : matches.length
          return (
            <BracketColumn
              key={key}
              label={label}
              matches={matches}
              revealedCount={revealedCount}
            />
          )
        })}
      </div>
    </div>
  )
}
