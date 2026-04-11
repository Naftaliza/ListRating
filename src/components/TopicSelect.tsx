function Pokeball() {
  return (
    <svg viewBox="0 0 100 100" className="topic-icon" xmlns="http://www.w3.org/2000/svg">
      <path d="M 5 50 A 45 45 0 0 1 95 50 Z" fill="#e53935" />
      <path d="M 5 50 A 45 45 0 0 0 95 50 Z" fill="#fff" />
      <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="4" />
      <rect x="5" y="46" width="90" height="8" fill="#222" />
      <circle cx="50" cy="50" r="13" fill="#222" />
      <circle cx="50" cy="50" r="9" fill="#fff" />
      <circle cx="46" cy="46" r="3" fill="rgba(255,255,255,0.6)" />
    </svg>
  )
}

function TvIcon() {
  return (
    <svg viewBox="0 0 100 100" className="topic-icon" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="84" height="56" rx="6" ry="6" fill="#1e1e2e" stroke="#555" strokeWidth="4" />
      <rect x="16" y="22" width="68" height="40" rx="3" ry="3" fill="#0d0d1a" />
      <rect x="16" y="22" width="68" height="40" rx="3" ry="3" fill="url(#tvglow)" opacity="0.6" />
      <polygon points="40,33 40,51 60,42" fill="#a78bfa" />
      <rect x="44" y="70" width="12" height="10" fill="#555" />
      <rect x="30" y="80" width="40" height="6" rx="3" fill="#555" />
      <line x1="36" y1="14" x2="26" y2="4" stroke="#555" strokeWidth="4" strokeLinecap="round" />
      <line x1="64" y1="14" x2="74" y2="4" stroke="#555" strokeWidth="4" strokeLinecap="round" />
      <defs>
        <linearGradient id="tvglow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function MovieIcon() {
  return (
    <svg viewBox="0 0 100 100" className="topic-icon" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="80" height="60" rx="5" fill="#1e1e2e" stroke="#555" strokeWidth="3" />
      <rect x="10" y="20" width="80" height="60" rx="5" fill="url(#filmglow)" opacity="0.4" />
      <rect x="13" y="26" width="8" height="10" rx="2" fill="#0d0d1a" />
      <rect x="13" y="42" width="8" height="10" rx="2" fill="#0d0d1a" />
      <rect x="13" y="58" width="8" height="10" rx="2" fill="#0d0d1a" />
      <rect x="79" y="26" width="8" height="10" rx="2" fill="#0d0d1a" />
      <rect x="79" y="42" width="8" height="10" rx="2" fill="#0d0d1a" />
      <rect x="79" y="58" width="8" height="10" rx="2" fill="#0d0d1a" />
      <circle cx="50" cy="50" r="16" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="2" />
      <polygon points="44,42 44,58 62,50" fill="#f59e0b" />
      <defs>
        <linearGradient id="filmglow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function GameIcon() {
  return (
    <svg viewBox="0 0 100 100" className="topic-icon" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 38 Q10 38 8 50 L12 72 Q14 80 22 80 Q28 80 34 70 L38 62 L62 62 L66 70 Q72 80 78 80 Q86 80 88 72 L92 50 Q90 38 85 38 Z" fill="#1e1e2e" stroke="#555" strokeWidth="3" />
      <path d="M15 38 Q10 38 8 50 L12 72 Q14 80 22 80 Q28 80 34 70 L38 62 L62 62 L66 70 Q72 80 78 80 Q86 80 88 72 L92 50 Q90 38 85 38 Z" fill="url(#gameglow)" opacity="0.35" />
      <rect x="22" y="48" width="18" height="6" rx="2" fill="#555" />
      <rect x="27" y="43" width="6" height="16" rx="2" fill="#555" />
      <circle cx="68" cy="46" r="4" fill="#7c3aed" />
      <circle cx="76" cy="52" r="4" fill="#16a34a" />
      <circle cx="60" cy="52" r="4" fill="#dc2626" />
      <circle cx="68" cy="58" r="4" fill="#ca8a04" />
      <rect x="43" y="48" width="6" height="5" rx="2" fill="#444" />
      <rect x="51" y="48" width="6" height="5" rx="2" fill="#444" />
      <defs>
        <linearGradient id="gameglow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function AnimeIcon() {
  return (
    <svg viewBox="0 0 100 100" className="topic-icon" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="52" r="34" fill="#1e1e2e" stroke="#555" strokeWidth="3" />
      <circle cx="50" cy="52" r="34" fill="url(#animeglow)" opacity="0.25" />
      <ellipse cx="36" cy="50" rx="10" ry="12" fill="#0d0d1a" />
      <ellipse cx="64" cy="50" rx="10" ry="12" fill="#0d0d1a" />
      <ellipse cx="36" cy="51" rx="7" ry="9" fill="#4f46e5" />
      <ellipse cx="64" cy="51" rx="7" ry="9" fill="#4f46e5" />
      <ellipse cx="36" cy="52" rx="4" ry="6" fill="#0d0d1a" />
      <ellipse cx="64" cy="52" rx="4" ry="6" fill="#0d0d1a" />
      <circle cx="33" cy="47" r="2.5" fill="white" opacity="0.9" />
      <circle cx="61" cy="47" r="2.5" fill="white" opacity="0.9" />
      <ellipse cx="26" cy="62" rx="6" ry="3" fill="#f472b6" opacity="0.5" />
      <ellipse cx="74" cy="62" rx="6" ry="3" fill="#f472b6" opacity="0.5" />
      <path d="M 42 68 Q 50 74 58 68" stroke="#888" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 22 36 Q 16 18 28 22 Q 24 10 36 20" fill="#7c3aed" />
      <path d="M 50 18 Q 46 4 54 4 Q 50 12 58 10 Q 56 20 50 18" fill="#7c3aed" />
      <path d="M 78 36 Q 84 18 72 22 Q 76 10 64 20" fill="#7c3aed" />
      <defs>
        <linearGradient id="animeglow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const TOPICS = [
  { id: 'pokemon',     label: 'Pokémon',    tagline: 'Rank every Pokémon by generation', Icon: Pokeball  },
  { id: 'tvseries',   label: 'TV Series',  tagline: 'Rank your favourite shows',         Icon: TvIcon    },
  { id: 'movies',     label: 'Movies',     tagline: 'Rate films from all eras',          Icon: MovieIcon },
  { id: 'videogames', label: 'Video Games',tagline: 'Rank the greatest games ever made', Icon: GameIcon  },
  { id: 'anime',      label: 'Anime',      tagline: 'Rank your favourite series',        Icon: AnimeIcon },
]

interface Props {
  onSelect: (topic: string) => void
}

export default function TopicSelect({ onSelect }: Props) {
  return (
    <div className="topic-page">
      <div className="topic-card">
        <h1 className="topic-title">Tier List Maker</h1>
        <p className="topic-subtitle">Choose a topic to start ranking</p>
        <div className="topic-cards-row">
          {TOPICS.map(({ id, label, tagline, Icon }) => (
            <button key={id} className="topic-pick-card" onClick={() => onSelect(id)}>
              <Icon />
              <span className="topic-pick-label">{label}</span>
              <span className="topic-pick-tagline">{tagline}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
