import { useIsMobile } from '../hooks/useIsMobile'

export default function WinProbBar({ home, away, probs }) {
  const isMobile = useIsMobile()
  const homeProb = probs[home] ?? 0
  const drawProb = probs['draw'] ?? 0
  const awayProb = probs[away] ?? 0
  const total = homeProb + drawProb + awayProb

  const homePct = ((homeProb / total) * 100).toFixed(1)
  const drawPct = ((drawProb / total) * 100).toFixed(1)
  const awayPct = ((awayProb / total) * 100).toFixed(1)

  const dominant = homeProb > awayProb ? 'home' : awayProb > homeProb ? 'away' : 'draw'

  return (
    <div style={{
      marginTop: 12,
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: 16,
      overflow: 'hidden',
      animation: 'reveal 0.4s ease both',
    }}>
      {/* Three big numbers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', padding: isMobile ? '20px 16px 16px' : '32px 28px 24px', gap: 0 }}>
        {/* Home */}
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: dominant === 'home' ? (isMobile ? 40 : 60) : (isMobile ? 28 : 42),
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: dominant === 'home' ? '#0F172A' : '#64748B',
            lineHeight: 1,
            transition: 'all 0.3s',
          }}>
            {homePct}
            <span style={{ fontSize: '0.4em', fontWeight: 600, marginLeft: 2, verticalAlign: 'super', color: 'inherit', opacity: 0.6 }}>%</span>
          </div>
          <div style={{ marginTop: 6, fontSize: isMobile ? 10 : 12, fontWeight: 600, color: '#475569', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            {home}
          </div>
          <div style={{ fontSize: 11, color: '#64748B', letterSpacing: '0.05em' }}>Win</div>
        </div>

        {/* Draw */}
        <div style={{ textAlign: 'center', padding: isMobile ? '0 12px' : '0 24px', borderLeft: '1px solid #F1F5F9', borderRight: '1px solid #F1F5F9' }}>
          <div style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: dominant === 'draw' ? (isMobile ? 40 : 60) : (isMobile ? 22 : 34),
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: dominant === 'draw' ? '#0F172A' : '#64748B',
            lineHeight: 1,
          }}>
            {drawPct}
            <span style={{ fontSize: '0.4em', fontWeight: 600, marginLeft: 2, verticalAlign: 'super', opacity: 0.6 }}>%</span>
          </div>
          <div style={{ marginTop: 6, fontSize: isMobile ? 10 : 12, fontWeight: 600, color: '#475569', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            Draw
          </div>
        </div>

        {/* Away */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: dominant === 'away' ? (isMobile ? 40 : 60) : (isMobile ? 28 : 42),
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: dominant === 'away' ? '#0F172A' : '#64748B',
            lineHeight: 1,
            transition: 'all 0.3s',
          }}>
            {awayPct}
            <span style={{ fontSize: '0.4em', fontWeight: 600, marginLeft: 2, verticalAlign: 'super', color: 'inherit', opacity: 0.6 }}>%</span>
          </div>
          <div style={{ marginTop: 6, fontSize: isMobile ? 10 : 12, fontWeight: 600, color: '#475569', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            {away}
          </div>
          <div style={{ fontSize: 11, color: '#64748B', letterSpacing: '0.05em' }}>Win</div>
        </div>
      </div>

      {/* Probability bar */}
      <div style={{ margin: isMobile ? '0 16px' : '0 28px', height: 4, borderRadius: 2, overflow: 'hidden', background: '#F1F5F9' }}>
        <div style={{ display: 'flex', height: '100%', transformOrigin: 'left', animation: 'barGrow 0.6s ease both' }}>
          <div style={{ width: `${homePct}%`, background: '#CC1420', transition: 'width 0.4s ease' }} />
          <div style={{ width: `${drawPct}%`, background: '#CBD5E1', transition: 'width 0.4s ease' }} />
          <div style={{ width: `${awayPct}%`, background: '#0E7490', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <div style={{ padding: isMobile ? '10px 16px 14px' : '12px 28px 16px', fontSize: 11, color: '#64748B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Elo · Poisson distribution model
      </div>
    </div>
  )
}
