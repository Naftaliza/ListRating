import { useState, useRef, useEffect } from 'react'
import type { Tier, DragData } from '../types/pokemon'
import PokemonImage from './PokemonImage'

interface Props {
  tier: Tier
  onDrop: (data: DragData, targetTierId: string) => void
  onLabelChange: (tierId: string, label: string) => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export default function TierRow({ tier, onDrop, onLabelChange, onMoveUp, onMoveDown }: Props) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(tier.label)
  const [zoneSize, setZoneSize] = useState({ w: 600, h: 80 })
  const inputRef = useRef<HTMLInputElement>(null)
  const zoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (editing) inputRef.current?.select() }, [editing])

  useEffect(() => {
    if (!zoneRef.current) return
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setZoneSize({ w: width, h: height })
    })
    ro.observe(zoneRef.current)
    return () => ro.disconnect()
  }, [])

  // Touch drop via custom event
  useEffect(() => {
    const el = zoneRef.current
    if (!el) return
    function onTouchDrop(e: Event) {
      const { data } = (e as CustomEvent).detail
      setIsDragOver(false)
      onDrop(data as DragData, tier.id)
    }
    el.addEventListener('touchdrop', onTouchDrop)
    return () => el.removeEventListener('touchdrop', onTouchDrop)
  }, [tier.id, onDrop])

  function startEdit() { setDraft(tier.label); setEditing(true) }

  function commitEdit() {
    setEditing(false)
    const trimmed = draft.trim()
    if (trimmed && trimmed !== tier.label) onLabelChange(tier.id, trimmed)
    else setDraft(tier.label)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') { setEditing(false); setDraft(tier.label) }
  }

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
    onDrop(JSON.parse(raw) as DragData, tier.id)
  }

  function computeSpriteSize(count: number, w: number, h: number): number {
    if (count === 0) return 60
    for (let s = 60; s >= 20; s -= 2) {
      const cols = Math.max(1, Math.floor((w - 4) / (s + 2)))
      const rows = Math.ceil(count / cols)
      if (rows * (s + 2) <= h - 4) return s
    }
    return 20
  }
  const spriteSize = computeSpriteSize(tier.pokemon.length, zoneSize.w, zoneSize.h)

  return (
    <div className="tier-row" style={{ '--sprite-size': `${spriteSize}px` } as React.CSSProperties}>
      <div className="tier-label" style={{ background: tier.color }} onClick={startEdit} title="Click to rename">
        {editing ? (
          <input
            ref={inputRef}
            className="tier-label-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <>
            <span className="tier-label-text">{tier.label}</span>
            {tier.pokemon.length > 0 && (
              <span className="tier-count">{tier.pokemon.length}</span>
            )}
          </>
        )}
      </div>

      <div
        ref={zoneRef}
        data-tier-id={tier.id}
        className={`tier-drop-zone${isDragOver ? ' drag-over' : ''}${tier.pokemon.length === 0 ? ' tier-drop-zone--empty' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        {tier.pokemon.length === 0 && <span className="tier-empty-hint">Drop Pokémon here</span>}
        {tier.pokemon.map(p => (
          <PokemonImage key={p.id} pokemon={p} sourceType="tier" sourceTierId={tier.id} />
        ))}
      </div>

      <div className="tier-controls">
        <button className="tier-btn" title="Settings">⚙</button>
        <button className="tier-btn" onClick={onMoveUp} title="Move up">▲</button>
        <button className="tier-btn" onClick={onMoveDown} title="Move down">▼</button>
      </div>
    </div>
  )
}
