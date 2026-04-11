import { useRef } from 'react'
import { startDrag, moveDrag, endDrag } from '../utils/touchDrag'
import type { TvShow } from './TvModal'

interface Props {
  show: TvShow
  onClick: () => void
}

export default function TvCard({ show, onClick }: Props) {
  const pointerDown = useRef<{ x: number; y: number; time: number } | null>(null)
  const dragging = useRef(false)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleDragStart(e: React.DragEvent) {
    e.dataTransfer.setData('application/json', JSON.stringify({ pokemonId: show.id, sourceType: 'pool' }))
    e.dataTransfer.effectAllowed = 'move'
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (e.pointerType === 'mouse') return
    e.preventDefault()
    pointerDown.current = { x: e.clientX, y: e.clientY, time: Date.now() }
    dragging.current = false

    holdTimer.current = setTimeout(() => {
      if (pointerDown.current) {
        dragging.current = true
        const data = { pokemonId: show.id, sourceType: 'pool' as const }
        startDrag(data, show.image, pointerDown.current.x, pointerDown.current.y)
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      }
    }, 200)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (e.pointerType === 'mouse' || !pointerDown.current) return
    const dx = e.clientX - pointerDown.current.x
    const dy = e.clientY - pointerDown.current.y
    if (!dragging.current && Math.hypot(dx, dy) > 8) {
      if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null }
      dragging.current = true
      const data = { pokemonId: show.id, sourceType: 'pool' as const }
      startDrag(data, show.image, e.clientX, e.clientY)
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
    if (dragging.current) moveDrag(e.clientX, e.clientY)
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (e.pointerType === 'mouse') return
    if (holdTimer.current) { clearTimeout(holdTimer.current); holdTimer.current = null }

    if (dragging.current) {
      endDrag(e.clientX, e.clientY)
    } else if (pointerDown.current && Date.now() - pointerDown.current.time < 400) {
      onClick()
    }
    pointerDown.current = null
    dragging.current = false
  }

  return (
    <div
      className="tv-card"
      draggable
      onClick={onClick}
      onDragStart={handleDragStart}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      {show.image && (
        <img
          src={show.image}
          alt={show.name}
          className="tv-poster"
          onError={e => {
            (e.target as HTMLImageElement).style.display = 'none'
            ;(e.target as HTMLImageElement).nextElementSibling?.classList.add('tv-poster-fallback--visible')
          }}
        />
      )}
      <div className={`tv-poster-fallback${!show.image ? ' tv-poster-fallback--visible' : ''}`}>📺</div>
      <span className="tv-name">{show.name}</span>
    </div>
  )
}
