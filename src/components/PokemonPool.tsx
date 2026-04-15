import { useState, useEffect, useRef } from 'react'
import type { Pokemon, DragData } from '../types/pokemon'
import { usePokemon } from '../hooks/usePokemon'
import { GENERATIONS } from '../constants/generations'
import PokemonImage from './PokemonImage'
import { useLang } from '../context/LangContext'
import { tr } from '../i18n'

interface Props {
  rankedIds: Set<number>
  onDrop: (data: DragData) => void
  onGenLoaded: (genId: number, pokemon: Pokemon[]) => void
  activeGen: number
  onGenChange: (gen: number) => void
  displayOrder?: number[]
  blindMode?: boolean
  currentBlindItem?: Pokemon | null
  blindRemaining?: number
  onSkip?: () => void
}

export default function PokemonPool({ rankedIds, onDrop, onGenLoaded, activeGen, onGenChange, displayOrder, blindMode, currentBlindItem, blindRemaining, onSkip }: Props) {
  const { lang } = useLang()
  const t = tr(lang)
  const [isDragOver, setIsDragOver] = useState(false)
  const { genData, loading, error, fetchGen } = usePokemon()
  const poolRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    GENERATIONS.forEach(gen => fetchGen(gen.id, gen.offset, gen.limit))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    Object.entries(genData).forEach(([id, pokemon]) => {
      if (pokemon) onGenLoaded(Number(id), pokemon)
    })
  }, [genData]) // eslint-disable-line react-hooks/exhaustive-deps

  // Touch drop via custom event
  useEffect(() => {
    const el = poolRef.current
    if (!el) return
    function onTouchDrop(e: Event) {
      const { data } = (e as CustomEvent).detail
      setIsDragOver(false)
      if ((data as DragData).sourceType === 'tier') onDrop(data as DragData)
    }
    el.addEventListener('touchdrop', onTouchDrop)
    return () => el.removeEventListener('touchdrop', onTouchDrop)
  }, [onDrop])

  const genPokemon = (genData[activeGen] ?? []).filter(p => !rankedIds.has(p.id))
  const genIdSet = new Set((genData[activeGen] ?? []).map(p => p.id))
  const currentPokemon = displayOrder
    ? displayOrder.filter(id => genIdSet.has(id) && !rankedIds.has(id)).map(id => (genData[activeGen] ?? []).find(p => p.id === id)!)
    : genPokemon
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
    <>
    <div className="pool-label">{t.unranked}</div>
    <div className="pool-wrapper">
      <div className="gen-tabs">
        {GENERATIONS.map(gen => (
          <button
            key={gen.id}
            className={`gen-tab${activeGen === gen.id ? ' active' : ''}`}
            onClick={() => onGenChange(gen.id)}
          >
            {gen.label}
          </button>
        ))}
      </div>

      {blindMode ? (
        <div className="blind-spotlight">
          {currentBlindItem ? (
            <>
              <PokemonImage pokemon={currentBlindItem} sourceType="pool" />
              <div className="blind-progress">{blindRemaining} {t.remaining}</div>
              <button className="blind-skip-btn" onClick={onSkip}>{t.skip}</button>
            </>
          ) : (
            <div className="blind-all-ranked">{t.allRanked}</div>
          )}
        </div>
      ) : (
        <div
          ref={poolRef}
          data-pool-zone="true"
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
      )}
    </div>
    </>
  )
}
