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

const TOPICS = [
  { id: 'pokemon',  label: 'Pokémon',   tagline: 'Rank every Pokémon by generation', Icon: Pokeball },
  { id: 'tvseries', label: 'TV Series', tagline: 'Rank your favourite shows',         Icon: TvIcon  },
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
