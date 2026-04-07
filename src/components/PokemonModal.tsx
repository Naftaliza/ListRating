import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Pokemon } from '../types/pokemon'

const TYPE_COLORS: Record<string, string> = {
  normal:   '#A8A878', fire:     '#F08030', water:    '#6890F0',
  electric: '#F8D030', grass:    '#78C850', ice:      '#98D8D8',
  fighting: '#C03028', poison:   '#A040A0', ground:   '#E0C068',
  flying:   '#A890F0', psychic:  '#F85888', bug:      '#A8B820',
  rock:     '#B8A038', ghost:    '#705898', dragon:   '#7038F8',
  dark:     '#705848', steel:    '#B8B8D0', fairy:    '#EE99AC',
}

interface Props {
  pokemon: Pokemon
  allPokemon: Pokemon[]
  onClose: () => void
  onNavigate: (pokemon: Pokemon) => void
}

export default function PokemonModal({ pokemon, allPokemon, onClose, onNavigate }: Props) {
  const idStr = `#${String(pokemon.id).padStart(3, '0')}`
  const name = pokemon.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  const currentIndex = allPokemon.findIndex(p => p.id === pokemon.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < allPokemon.length - 1

  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const [showShiny, setShowShiny] = useState(false)
  const [shinyArtworkFailed, setShinyArtworkFailed] = useState(false)

  function goTo(next: Pokemon, dir: 'left' | 'right') {
    setSlideDir(dir)
    setAnimKey(k => k + 1)
    setShowShiny(false)
    setShinyArtworkFailed(false)
    onNavigate(next)
  }

  function goPrev() { if (hasPrev) goTo(allPokemon[currentIndex - 1], 'right') }
  function goNext() { if (hasNext) goTo(allPokemon[currentIndex + 1], 'left') }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const touchStartX = useRef<number | null>(null)
  function handleTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (delta < -50) goNext()
    if (delta >  50) goPrev()
  }

  const slideClass = slideDir === 'left' ? 'slide-in-left' : slideDir === 'right' ? 'slide-in-right' : ''

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <button className="modal-nav modal-nav-prev" onClick={e => { e.stopPropagation(); goPrev() }} disabled={!hasPrev}>‹</button>

      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div key={animKey} className={`modal-content ${slideClass}`}>
          <div className="modal-id">{idStr}{showShiny && <span className="modal-shiny-label"> ✨ Shiny</span>}</div>

          <img
            src={showShiny ? (shinyArtworkFailed ? pokemon.shiny : pokemon.artworkShiny) : pokemon.artwork}
            alt={name}
            className={`modal-artwork${showShiny ? ' modal-artwork--shiny' : ''}`}
            onError={showShiny && !shinyArtworkFailed ? () => setShinyArtworkFailed(true) : undefined}
          />

          <div className="modal-name">{name}</div>

          <div className="modal-types">
            {pokemon.types.map(t => (
              <span key={t.name} className="modal-type-badge" style={{ background: TYPE_COLORS[t.name] ?? '#888' }}>
                {t.name}
              </span>
            ))}
          </div>

          <div className="modal-sprites">
            <div className={`modal-sprite-item${!showShiny ? ' modal-sprite-active' : ''}`} onClick={() => setShowShiny(false)}>
              <img src={pokemon.image} alt="normal" />
              <span>Normal</span>
            </div>
            <div className={`modal-sprite-item${showShiny ? ' modal-sprite-active' : ''}`} onClick={() => setShowShiny(true)}>
              <img src={pokemon.shiny} alt="shiny" />
              <span>Shiny ✨</span>
            </div>
          </div>
        </div>
      </div>

      <button className="modal-nav modal-nav-next" onClick={e => { e.stopPropagation(); goNext() }} disabled={!hasNext}>›</button>
    </div>,
    document.body
  )
}
