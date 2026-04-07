import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface TvShow {
  id: number
  name: string
  image: string
  years?: string
  genres?: string[]
  rating?: number
  desc?: string
}

interface Props {
  show: TvShow
  allShows: TvShow[]
  onClose: () => void
  onNavigate: (show: TvShow) => void
}

const LARGE = (path: string) => path.replace('/w92/', '/w342/')

export default function TvModal({ show, allShows, onClose, onNavigate }: Props) {
  const currentIndex = allShows.findIndex(s => s.id === show.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < allShows.length - 1

  function goPrev() { if (hasPrev) onNavigate(allShows[currentIndex - 1]) }
  function goNext() { if (hasNext) onNavigate(allShows[currentIndex + 1]) }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const stars = show.rating ? Math.round(show.rating / 2) : null

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <button className="modal-nav modal-nav-prev" onClick={e => { e.stopPropagation(); goPrev() }} disabled={!hasPrev}>‹</button>

      <div className="modal-card tv-modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="tv-modal-content">
          <img
            src={LARGE(show.image)}
            alt={show.name}
            className="tv-modal-poster"
            onError={e => { (e.target as HTMLImageElement).src = show.image }}
          />
          <div className="tv-modal-info">
            <div className="tv-modal-name">{show.name}</div>

            {show.years && (
              <div className="tv-modal-meta">
                <span className="tv-modal-meta-item">📅 {show.years}</span>
                {show.rating && (
                  <span className="tv-modal-meta-item">⭐ {show.rating}/10</span>
                )}
              </div>
            )}

            {show.genres && show.genres.length > 0 && (
              <div className="tv-modal-genres">
                {show.genres.map(g => (
                  <span key={g} className="tv-modal-genre">{g}</span>
                ))}
              </div>
            )}

            {show.desc && (
              <p className="tv-modal-desc">{show.desc}</p>
            )}

            {stars && (
              <div className="tv-modal-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ color: i < stars ? '#facc15' : '#444' }}>★</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <button className="modal-nav modal-nav-next" onClick={e => { e.stopPropagation(); goNext() }} disabled={!hasNext}>›</button>
    </div>,
    document.body
  )
}
