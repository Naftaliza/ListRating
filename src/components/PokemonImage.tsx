import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Pokemon, DragData } from '../types/pokemon'
import { useModal } from '../context/ModalContext'
import PokemonTooltip from './PokemonTooltip'
import { startDrag, moveDrag, endDrag } from '../utils/touchDrag'

interface Props {
  pokemon: Pokemon
  sourceType: 'pool' | 'tier'
  sourceTierId?: string
}

const isTouchDevice = () => window.matchMedia('(hover: none)').matches

export default function PokemonImage({ pokemon, sourceType, sourceTierId }: Props) {
  const openModal = useModal()
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null)
  const pointerDown = useRef<{ x: number; y: number; time: number } | null>(null)
  const dragging = useRef(false)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Desktop HTML5 drag (mouse) ──
  function handleDragStart(e: React.DragEvent) {
    setTooltip(null)
    const data: DragData = { pokemonId: pokemon.id, sourceType, sourceTierId }
    e.dataTransfer.setData('application/json', JSON.stringify(data))
    e.dataTransfer.effectAllowed = 'move'
  }

  // ── Pointer events (touch + mouse fallback) ──
  function handlePointerDown(e: React.PointerEvent) {
    if (e.pointerType === 'mouse') return // handled by HTML5 DnD on desktop
    e.preventDefault()
    pointerDown.current = { x: e.clientX, y: e.clientY, time: Date.now() }
    dragging.current = false

    holdTimer.current = setTimeout(() => {
      if (pointerDown.current) {
        dragging.current = true
        const data: DragData = { pokemonId: pokemon.id, sourceType, sourceTierId }
        startDrag(data, pokemon.image, pointerDown.current.x, pointerDown.current.y)
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      }
    }, 200)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (e.pointerType === 'mouse') return
    if (!pointerDown.current) return
    const dx = e.clientX - pointerDown.current.x
    const dy = e.clientY - pointerDown.current.y
    if (!dragging.current && Math.hypot(dx, dy) > 8 && holdTimer.current) {
      clearTimeout(holdTimer.current)
      holdTimer.current = null
      dragging.current = true
      const data: DragData = { pokemonId: pokemon.id, sourceType, sourceTierId }
      startDrag(data, pokemon.image, e.clientX, e.clientY)
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
      // Short tap = open modal
      openModal(pokemon)
    }
    pointerDown.current = null
    dragging.current = false
  }

  return (
    <>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        draggable={!isTouchDevice()}
        onDragStart={handleDragStart}
        onMouseEnter={e => !isTouchDevice() && setTooltip({ x: e.clientX, y: e.clientY })}
        onMouseMove={e => !isTouchDevice() && setTooltip({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setTooltip(null)}
        onDoubleClick={() => { setTooltip(null); openModal(pokemon) }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="pokemon-sprite"
        style={{ touchAction: 'none' }}
      />
      {tooltip && createPortal(
        <PokemonTooltip pokemon={pokemon} x={tooltip.x} y={tooltip.y} />,
        document.body
      )}
    </>
  )
}
