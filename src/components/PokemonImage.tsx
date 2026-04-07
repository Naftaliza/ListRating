import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { Pokemon, DragData } from '../types/pokemon'
import { useModal } from '../context/ModalContext'
import PokemonTooltip from './PokemonTooltip'

interface Props {
  pokemon: Pokemon
  sourceType: 'pool' | 'tier'
  sourceTierId?: string
}

export default function PokemonImage({ pokemon, sourceType, sourceTierId }: Props) {
  const openModal = useModal()
  const [tooltip, setTooltip] = useState<{ x: number; y: number } | null>(null)

  function handleDragStart(e: React.DragEvent) {
    setTooltip(null)
    const data: DragData = { pokemonId: pokemon.id, sourceType, sourceTierId }
    e.dataTransfer.setData('application/json', JSON.stringify(data))
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        draggable
        onDragStart={handleDragStart}
        onMouseEnter={e => setTooltip({ x: e.clientX, y: e.clientY })}
        onMouseMove={e => setTooltip({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setTooltip(null)}
        onDoubleClick={() => { setTooltip(null); openModal(pokemon) }}
        className="pokemon-sprite"
      />
      {tooltip && createPortal(
        <PokemonTooltip pokemon={pokemon} x={tooltip.x} y={tooltip.y} />,
        document.body
      )}
    </>
  )
}
