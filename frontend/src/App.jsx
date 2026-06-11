import { useState } from 'react'
import GroupsPage from './pages/GroupsPage'
import PredictPage from './pages/PredictPage'
import TournamentPage from './pages/TournamentPage'
import OddsPage from './pages/OddsPage'
import { useIsMobile } from './hooks/useIsMobile'

const TABS = [
  { key: 'groups',     label: 'Groups' },
  { key: 'tournament', label: 'Tournament' },
  { key: 'odds',       label: 'Odds' },
  { key: 'predict',    label: 'Predict' },
]

function WC26Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {/* High-Visibility, Clean Vector World Cup Trophy */}
      <svg width="40" height="56" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="standalone-trophy">
          {/* Main Globe (Top) */}
          <circle cx="20" cy="14" r="9" fill="url(#gold-shimmer)" />
          <circle cx="20" cy="14" r="9" fill="url(#gold-core)" opacity="0.85" />
          
          {/* Decorative continental linework on the globe */}
          <path d="M 14 11 C 15 9, 18 10, 19 8 C 21 7, 24 9, 25 11" stroke="#FEF08A" strokeWidth="0.75" strokeLinecap="round" opacity="0.6" />
          <path d="M 13 15 C 15 17, 18 15, 21 18 C 24 19, 26 17, 27 15" stroke="#FEF08A" strokeWidth="0.75" strokeLinecap="round" opacity="0.6" />

          {/* Elegant Holding Silhouette / Wings */}
          <path 
            d="M 11 14
               C 11 14, 11.5 24, 14.5 29
               C 17.5 34, 16 42, 16 42
               H 24
               C 24 42, 22.5 34, 25.5 29
               C 28.5 24, 29 14, 29 14
               C 29 14, 26.5 21, 20 21
               C 13.5 21, 11 14, 11 14 Z" 
            fill="url(#gold-core)" 
          />
          
          {/* Internal stylized body contours for a 3D aesthetic */}
          <path 
            d="M 13.5 17 
               C 14.5 22, 16.5 26, 18.5 29 
               C 19.5 30.5, 19 36, 19 41" 
            stroke="#FEF08A" 
            strokeWidth="1" 
            strokeLinecap="round"
            opacity="0.5" 
          />
          <path 
            d="M 26.5 17 
               C 25.5 22, 23.5 26, 21.5 29 
               C 20.5 30.5, 21 36, 21 41" 
            stroke="#854D0E" 
            strokeWidth="1.2" 
            strokeLinecap="round"
            opacity="0.4" 
          />

          {/* Stately Base Rings (Green Malachite & Structured Gold Bands) */}
          <path d="M 15 42 H 25 V 44 H 15 Z" fill="#115E59" /> 
          <path d="M 14.5 44 H 25.5 V 46.5 H 14.5 Z" fill="url(#gold-shimmer)" />
          <path d="M 14 46.5 H 26 V 49 H 14 Z" fill="#115E59" />
          
          {/* Flared Bottom Plinth */}
          <path 
            d="M 13.5 49 
               H 26.5 
               L 27.5 53 
               C 27.5 54, 26.5 55, 25 55 
               H 15 
               C 13.5 55, 12.5 54, 12.5 53 
               Z" 
            fill="url(#gold-base)" 
          />
        </g>

        {/* Dynamic Multi-Tone Lighting Gradients */}
        <defs>
          <linearGradient id="gold-shimmer" x1="11" y1="5" x2="29" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          
          <linearGradient id="gold-core" x1="11" y1="14" x2="29" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="35%" stopColor="#EAB308" />
            <stop offset="75%" stopColor="#A16207" />
            <stop offset="100%" stopColor="#713F12" />
          </linearGradient>

          <linearGradient id="gold-base" x1="12.5" y1="49" x2="27.5" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EAB308" />
            <stop offset="30%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
        </defs>
      </svg>

      {/* App Branding */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.05em', color: '#0F172A', textTransform: 'uppercase', lineHeight: 1.1 }}>
          FIFA World Cup
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#CA8A04', letterSpacing: '0.08em', marginTop: 2 }}>
          2026 PREDICTOR
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('groups')
  const isMobile = useIsMobile()

  const tabButton = (key, label) => (
    <button
      key={key}
      onClick={() => setTab(key)}
      className="relative cursor-pointer border-0 bg-transparent"
      style={{
        padding: isMobile ? '0 14px' : '0 20px',
        height: isMobile ? 44 : 62,
        fontSize: isMobile ? 14 : 15,
        fontWeight: 500,
        color: tab === key ? '#0F172A' : '#64748B',
        transition: 'color 0.15s',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {label}
      {tab === key && (
        <span style={{
          position: 'absolute', bottom: 0,
          left: isMobile ? 14 : 20, right: isMobile ? 14 : 20,
          height: 2, background: '#CC1420',
          borderRadius: '2px 2px 0 0',
          animation: 'fadeInUp 0.2s ease',
        }} />
      )}
    </button>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <header style={{
        borderBottom: '1px solid #E2E8F0',
        background: '#FFFFFF',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        {isMobile ? (
          <>
            <div style={{ padding: '0 16px', height: 52, display: 'flex', alignItems: 'center' }}>
              <WC26Logo />
            </div>
            <div style={{
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              padding: '0 2px',
            }}>
              {TABS.map(({ key, label }) => tabButton(key, label))}
            </div>
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 62 }}>
            <WC26Logo />
            <nav className="flex items-center">
              {TABS.map(({ key, label }) => tabButton(key, label))}
            </nav>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto" style={{ padding: isMobile ? '24px 16px' : '40px 24px' }}>
        <div style={{ display: tab === 'groups'     ? 'block' : 'none' }}><GroupsPage /></div>
        <div style={{ display: tab === 'tournament' ? 'block' : 'none' }}><TournamentPage /></div>
        <div style={{ display: tab === 'odds'       ? 'block' : 'none' }}><OddsPage /></div>
        <div style={{ display: tab === 'predict'    ? 'block' : 'none' }}><PredictPage /></div>
      </main>
    </div>
  )
}
