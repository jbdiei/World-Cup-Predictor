export const FLAG_CODES = {
  'USA':           'us',
  'Mexico':        'mx',
  'Canada':        'ca',
  'Brazil':        'br',
  'Argentina':     'ar',
  'France':        'fr',
  'Spain':         'es',
  'England':       'gb-eng',
  'Germany':       'de',
  'Portugal':      'pt',
  'Netherlands':   'nl',
  'Belgium':       'be',
  'Croatia':       'hr',
  'Japan':         'jp',
  'South Korea':   'kr',
  'Morocco':       'ma',
  'Senegal':       'sn',
  'Uruguay':       'uy',
  'Colombia':      'co',
  'Ecuador':       'ec',
  'Switzerland':   'ch',
  'Austria':       'at',
  'Turkey':        'tr',
  'Norway':        'no',
  'Sweden':        'se',
  'Scotland':      'gb-sct',
  'Czechia':       'cz',
  'Bosnia':        'ba',
  'Australia':     'au',
  'Iran':          'ir',
  'Saudi Arabia':  'sa',
  'Qatar':         'qa',
  'Iraq':          'iq',
  'Jordan':        'jo',
  'Uzbekistan':    'uz',
  'Algeria':       'dz',
  'Egypt':         'eg',
  'Ghana':         'gh',
  'Tunisia':       'tn',
  'Cabo Verde':    'cv',
  "Cote d'Ivoire": 'ci',
  'Congo DR':      'cd',
  'South Africa':  'za',
  'Haiti':         'ht',
  'Panama':        'pa',
  'Curacao':       'cw',
  'Paraguay':      'py',
  'New Zealand':   'nz',
}

function srcWidth(displaySize) {
  return [20, 40, 80, 160, 320].find(w => w >= displaySize * 2) ?? 320
}

export function Flag({ name, size = 20 }) {
  const code = FLAG_CODES[name]
  const h = Math.round(size * 0.75)
  if (!code) return <span style={{ display: 'inline-block', width: size, height: h }} />
  return (
    <img
      src={`https://flagcdn.com/w${srcWidth(size)}/${code}.png`}
      width={size}
      height={h}
      alt={name}
      style={{ borderRadius: 2, objectFit: 'cover', verticalAlign: 'middle', flexShrink: 0, display: 'inline-block' }}
    />
  )
}
