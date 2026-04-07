import { useState, useEffect } from 'react'
import type { Pokemon, DragData } from '../types/pokemon'
import { usePokemon } from '../hooks/usePokemon'
import { GENERATIONS } from '../constants/generations'
import PokemonImage from './PokemonImage'

interface Props {
  rankedIds: Set<number>
  onDrop: (data: DragData) => void
  onGenLoaded: (genId: number, pokemon: Pokemon[]) => void
}

export default function PokemonPool({ rankedIds, onDrop, onGenLoaded }: Props) {
  const [activeGen, setActiveGen] = useState(1)
  const [isDragOver, setIsDragOver] = useState(false)
  const { genData, loading, error, fetchGen } = usePokemon()

  // Fetch all gens immediately on mount
  useEffect(() => {
    GENERATIONS.forEach(gen => fetchGen(gen.id, gen.offset, gen.limit))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Notify App when any gen's data arrives
  useEffect(() => {
    Object.entries(genData).forEach(([id, pokemon]) => {
      if (pokemon) onGenLoaded(Number(id), pokemon)
    })
  }, [genData]) // eslint-disable-line react-hooks/exhaustive-deps

  const currentPokemon = (genData[activeGen] ?? []).filter(p => !rankedIds.has(p.id))
  const isLoading = loading[activeGen] ?? false
  const currentError = error[activeGen] ?? ''

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setIsDragOver(true)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const raw = e.dataTransfer.getData('application/json')
    if (!raw) return
    const data: DragData = JSON.parse(raw)
    if (data.sourceType === 'tier') onDrop(data)
  }

  return (
    <div className="pool-wrapper">
      <div className="gen-tabs">
        {GENERATIONS.map(gen => (
          <button
            key={gen.id}
            className={`gen-tab${activeGen === gen.id ? ' active' : ''}`}
            onClick={() => setActiveGen(gen.id)}
          >
            {gen.label}
          </button>
        ))}
      </div>

      <div
        className={`pokemon-pool${isDragOver ? ' drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        {isLoading && <span className="pool-loading">Loading…</span>}
        {currentError && !isLoading && (
          <span className="pool-loading" style={{ color: '#f87171' }}>
            {currentError}&nbsp;
            <button
              className="retry-btn"
              onClick={() => {
                const gen = GENERATIONS.find(g => g.id === activeGen)!
                fetchGen(gen.id, gen.offset, gen.limit, true)
              }}
            >Retry</button>
          </span>
        )}
        {!isLoading && currentPokemon.map(p => (
          <PokemonImage key={p.id} pokemon={p} sourceType="pool" />
        ))}
      </div>
    </div>
  )
}
