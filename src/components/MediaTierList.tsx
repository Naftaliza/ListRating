import { useState, useRef, useEffect, useMemo } from 'react'
import html2canvas from 'html2canvas'
import TierRow from './TierRow'
import TvModal from './TvModal'
import TvCard from './TvCard'
import type { TvShow } from './TvModal'
import { ModalContext } from '../context/ModalContext'
import type { Tier, DragData } from '../types/pokemon'

const DEFAULT_TIERS: Omit<Tier, 'pokemon'>[] = [
  { id: 'goat',   label: '🏆 GOAT',              color: 'linear-gradient(135deg, #ff4e50, #fc913a)' },
  { id: 'elite',  label: '⚡ Elite',             color: 'linear-gradient(135deg, #f9a825, #ff6f00)' },
  { id: 'solid',  label: '💪 Solid Pick',        color: 'linear-gradient(135deg, #fff176, #f9a825)' },
  { id: 'decent', label: '👍 Decent',            color: 'linear-gradient(135deg, #b5f5a0, #57c84d)' },
  { id: 'meh',    label: '😐 Meh',              color: 'linear-gradient(135deg, #80deea, #0097a7)' },
  { id: 'weak',   label: '💀 Weak',             color: 'linear-gradient(135deg, #9575cd, #512da8)' },
  { id: 'trash',  label: '🗑️ Who Approved This', color: 'linear-gradient(135deg, #546e7a, #263238)' },
]

interface Props {
  items: TvShow[]
  imageMap: Record<number, string>
  onHome: () => void
  shareFilename?: string
}

export default function MediaTierList({ items, imageMap, onHome, shareFilename = 'tierlist' }: Props) {
  const [tiers, setTiers] = useState<Tier[]>(DEFAULT_TIERS.map(t => ({ ...t, pokemon: [] })))
  const [displayMode, setDisplayMode] = useState(false)
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'done'>('idle')
  const [isDragOver, setIsDragOver] = useState(false)
  const [modalShow, setModalShow] = useState<TvShow | null>(null)
  const tierListRef = useRef<HTMLDivElement>(null)
  const poolRef = useRef<HTMLDivElement>(null)

  const enriched = useMemo(
    () => items.map(s => {
      const img = imageMap[s.id] || s.image
      return { ...s, image: img, artwork: img, artworkShiny: img, shiny: img, types: [] }
    }),
    [items, imageMap]
  )

  const rankedIds = new Set(tiers.flatMap(t => t.pokemon.map(p => p.id)))
  const poolItems = enriched.filter(s => !rankedIds.has(s.id))

  function findItem(id: number) { return enriched.find(s => s.id === id) }

  function handleDropOnTier(data: DragData, targetTierId: string) {
    const item = findItem(data.pokemonId)
    if (!item) return
    if (data.sourceType === 'tier' && data.sourceTierId === targetTierId) return
    setTiers(prev =>
      prev.map(t => ({ ...t, pokemon: t.pokemon.filter(p => p.id !== data.pokemonId) }))
          .map(t => t.id === targetTierId ? { ...t, pokemon: [...t.pokemon, item as any] } : t)
    )
  }

  function handleDropOnPool(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const raw = e.dataTransfer.getData('application/json')
    if (!raw) return
    const data: DragData = JSON.parse(raw)
    if (data.sourceType === 'tier') {
      setTiers(prev => prev.map(t => ({ ...t, pokemon: t.pokemon.filter(p => p.id !== data.pokemonId) })))
    }
  }

  async function handleShare() {
    if (!tierListRef.current) return
    setShareStatus('copying')
    try {
      const canvas = await html2canvas(tierListRef.current, {
        backgroundColor: '#1a1a1a', scale: 2, useCORS: true, allowTaint: true,
      })
      canvas.toBlob(async blob => {
        if (!blob) return
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        } catch {
          const a = document.createElement('a')
          a.href = URL.createObjectURL(blob)
          a.download = `${shareFilename}.png`
          a.click()
        }
        setShareStatus('done')
        setTimeout(() => setShareStatus('idle'), 2000)
      })
    } catch { setShareStatus('idle') }
  }

  // Touch drop on pool zone
  useEffect(() => {
    const el = poolRef.current
    if (!el) return
    function onTouchDrop(e: Event) {
      const { data } = (e as CustomEvent).detail
      setIsDragOver(false)
      if ((data as DragData).sourceType === 'tier') {
        setTiers(prev => prev.map(t => ({
          ...t,
          pokemon: t.pokemon.filter(p => p.id !== (data as DragData).pokemonId),
        })))
      }
    }
    el.addEventListener('touchdrop', onTouchDrop)
    return () => el.removeEventListener('touchdrop', onTouchDrop)
  }, [])

  function openModal(id: number) {
    const show = enriched.find(s => s.id === id)
    if (show) setModalShow(show as TvShow)
  }

  return (
    <ModalContext.Provider value={(p: any) => openModal(p.id)}>
      <div className="app">
        <div className="header">
          <button className="header-btn home-btn" onClick={onHome}>⌂ Home</button>
          <button
            className={`header-btn display-btn${displayMode ? ' display-btn--active' : ''}`}
            onClick={() => setDisplayMode(d => !d)}
          >
            {displayMode ? '✎ Edit' : '✦ Present'}
          </button>
          <button className="header-btn share-btn" onClick={handleShare} disabled={shareStatus !== 'idle'}>
            {shareStatus === 'copying' ? '⏳ Capturing…' : shareStatus === 'done' ? '✓ Copied!' : '📸 Share'}
          </button>
          <button
            className="header-btn reset-btn"
            onClick={() => setTiers(DEFAULT_TIERS.map(t => ({ ...t, pokemon: [] })))}
          >↺ Reset</button>
        </div>

        <div className={`main-layout${displayMode ? ' display-mode' : ''}`}>
          <div className="tier-list-col">
            <div className="tier-list" ref={tierListRef}>
              {tiers.map(tier => (
                <TierRow
                  key={tier.id}
                  tier={tier}
                  onDrop={handleDropOnTier}
                  onLabelChange={(id, label) =>
                    setTiers(prev => prev.map(t => t.id === id ? { ...t, label } : t))
                  }
                />
              ))}
            </div>
          </div>

          {!displayMode && (
            <div className="pool-col">
              <div className="pool-label">Unranked</div>
              <div className="pool-wrapper">
                <div
                  ref={poolRef}
                  data-pool-zone="true"
                  className={`pokemon-pool tv-pool${isDragOver ? ' drag-over' : ''}`}
                  onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDropOnPool}
                >
                  {poolItems.map(item => (
                    <TvCard key={item.id} show={item} onClick={() => setModalShow(item as TvShow)} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {modalShow && (
          <TvModal
            show={modalShow}
            allShows={enriched as TvShow[]}
            onClose={() => setModalShow(null)}
            onNavigate={setModalShow}
          />
        )}
      </div>
    </ModalContext.Provider>
  )
}
