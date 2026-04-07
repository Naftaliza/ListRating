import { useState } from 'react'

const TOPICS = [
  { id: 'pokemon', label: 'Pokémon' },
  { id: 'tvseries', label: 'TV Series' },
]

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
      {/* Screen body */}
      <rect x="8" y="14" width="84" height="56" rx="6" ry="6" fill="#1e1e2e" stroke="#555" strokeWidth="4" />
      {/* Screen face */}
      <rect x="16" y="22" width="68" height="40" rx="3" ry="3" fill="#0d0d1a" />
      {/* Screen glow */}
      <rect x="16" y="22" width="68" height="40" rx="3" ry="3" fill="url(#tvglow)" opacity="0.6" />
      {/* Play triangle */}
      <polygon points="40,33 40,51 60,42" fill="#a78bfa" />
      {/* Stand stem */}
      <rect x="44" y="70" width="12" height="10" fill="#555" />
      {/* Stand base */}
      <rect x="30" y="80" width="40" height="6" rx="3" fill="#555" />
      {/* Antenna left */}
      <line x1="36" y1="14" x2="26" y2="4" stroke="#555" strokeWidth="4" strokeLinecap="round" />
      {/* Antenna right */}
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

function TopicIcon({ id }: { id: string }) {
  if (id === 'pokemon') return <Pokeball />
  if (id === 'tvseries') return <TvIcon />
  return <div className="topic-icon-placeholder">?</div>
}

interface Props {
  onSelect: (topic: string) => void
}

export default function TopicSelect({ onSelect }: Props) {
  const [selected, setSelected] = useState('')

  return (
    <div className="topic-page">
      <div className="topic-card">
        {selected
          ? <TopicIcon id={selected} />
          : <div className="topic-icon-placeholder">?</div>
        }
        <h1 className="topic-title">Tier List Maker</h1>
        <p className="topic-subtitle">Choose a topic to start ranking</p>
        <div className="topic-controls">
          <select
            className="topic-select"
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            <option value="" disabled>Select a topic…</option>
            {TOPICS.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
          <button
            className="topic-go-btn"
            disabled={!selected}
            onClick={() => selected && onSelect(selected)}
          >
            Let's Go →
          </button>
        </div>
      </div>
    </div>
  )
}
