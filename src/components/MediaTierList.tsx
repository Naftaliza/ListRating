import { useState, useRef, useEffect, useMemo } from 'react'
import html2canvas from 'html2canvas'
import { useLang } from '../context/LangContext'
import { tr } from '../i18n'
import FlagIcon from './FlagIcon'
import TierRow from './TierRow'
import TvModal from './TvModal'
import TvCard from './TvCard'
import type { TvShow } from './TvModal'
import { ModalContext } from '../context/ModalContext'
import type { Tier, DragData } from '../types/pokemon'

const TIER_COLORS = [
  { id: 'goat',   key: 'goat'  as const, color: 'linear-gradient(135deg, #ff4e50, #fc913a)' },
  { id: 'elite',  key: 'elite' as const, color: 'linear-gradient(135deg, #f9a825, #ff6f00)' },
  { id: 'solid',  key: 'solid' as const, color: 'linear-gradient(135deg, #fff176, #f9a825)' },
  { id: 'decent', key: 'decent'as const, color: 'linear-gradient(135deg, #b5f5a0, #57c84d)' },
  { id: 'meh',    key: 'meh'  as const,  color: 'linear-gradient(135deg, #80deea, #0097a7)' },
  { id: 'weak',   key: 'weak' as const,  color: 'linear-gradient(135deg, #9575cd, #512da8)' },
  { id: 'trash',  key: 'trash' as const, color: 'linear-gradient(135deg, #546e7a, #263238)' },
]

function makeDefaultTiers(tiers: ReturnType<typeof tr>['tiers']) {
  return TIER_COLORS.map(t => ({ id: t.id, label: tiers[t.key], color: t.color, pokemon: [] as Tier['pokemon'] }))
}

interface PoolTab {
  key: string
  label: string
  ids: Set<number>
}

interface Props {
  items: TvShow[]
  imageMap: Record<number, string>
  onHome: () => void
  shareFilename?: string
  poolTabs?: PoolTab[]
}

export default function MediaTierList({ items, imageMap, onHome, shareFilename = 'tierlist', poolTabs }: Props) {
  const { lang, toggle } = useLang()
  const t = tr(lang)
  const [tiers, setTiers] = useState<Tier[]>(() => makeDefaultTiers(t.tiers))
  const [displayMode, setDisplayMode] = useState(false)
  const [poolOrder, setPoolOrder] = useState<number[] | null>(null)
  const [blindMode, setBlindMode] = useState(false)
  const [blindQueue, setBlindQueue] = useState<number[]>([])

  // Update default tier labels when language changes
  useEffect(() => {
    const defaults = makeDefaultTiers(t.tiers)
    setTiers(prev => prev.map((tier, i) => ({ ...tier, label: defaults[i]?.label ?? tier.label })))
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'done'>('idle')
  const [isDragOver, setIsDragOver] = useState(false)
  const [modalShow, setModalShow] = useState<TvShow | null>(null)
  const [activePoolTab, setActivePoolTab] = useState(() => poolTabs?.[0]?.key ?? '')
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
  const visiblePoolItems = poolTabs && activePoolTab
    ? poolItems.filter(s => poolTabs.find(t => t.key === activePoolTab)?.ids.has(s.id))
    : poolItems
  const visibleIdSet = new Set(visiblePoolItems.map(s => s.id))
  const orderedPoolItems = poolOrder
    ? poolOrder.filter(id => !rankedIds.has(id) && visibleIdSet.has(id)).map(id => enriched.find(s => s.id === id)!).filter(Boolean)
    : visiblePoolItems

  const currentBlindId = blindMode ? blindQueue.find(id => !rankedIds.has(id)) : undefined
  const currentBlindItem = currentBlindId !== undefined ? (enriched.find(s => s.id === currentBlindId) ?? null) : null
  const blindRemaining = blindMode ? blindQueue.filter(id => !rankedIds.has(id)).length : 0

  function handleShuffle() {
    const ids = visiblePoolItems.map(s => s.id)
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]]
    }
    setPoolOrder(ids)
  }

  function buildShuffledQueue(items: typeof visiblePoolItems) {
    const ids = items.map(s => s.id)
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]]
    }
    return ids
  }

  function handleToggleBlind() {
    if (blindMode) {
      setBlindMode(false)
      setBlindQueue([])
    } else {
      setBlindQueue(buildShuffledQueue(visiblePoolItems))
      setBlindMode(true)
    }
  }

  function handleSkip() {
    setBlindQueue(q => {
      const first = q.find(id => !rankedIds.has(id))
      if (first === undefined) return q
      const rest = q.filter(id => id !== first)
      return [...rest, first]
    })
  }

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
      <div className="app" dir={lang === 'he' ? 'rtl' : 'ltr'}>
        <div className="header">
          <button className="header-btn home-btn" onClick={onHome}>{t.home}</button>
          <button
            className={`header-btn display-btn${displayMode ? ' display-btn--active' : ''}`}
            onClick={() => setDisplayMode(d => !d)}
          >
            {displayMode ? t.edit : t.present}
          </button>
          <button className="header-btn share-btn" onClick={handleShare} disabled={shareStatus !== 'idle'}>
            {shareStatus === 'copying' ? t.capturing : shareStatus === 'done' ? t.copied : t.share}
          </button>
          <button className="header-btn shuffle-btn" onClick={handleShuffle}>{t.shuffle}</button>
          <button
            className={`header-btn blind-btn${blindMode ? ' blind-btn--active' : ''}`}
            onClick={handleToggleBlind}
          >{blindMode ? t.blindModeOff : t.blindMode}</button>
          <button
            className="header-btn reset-btn"
            onClick={() => { setTiers(makeDefaultTiers(t.tiers)); setPoolOrder(null); setBlindMode(false); setBlindQueue([]) }}
          >{t.reset}</button>
          <button className="header-btn lang-toggle-btn" onClick={toggle} style={{ display: 'flex', alignItems: 'center' }}><FlagIcon lang={lang} />{t.langToggle}</button>
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
              <div className="pool-label">{t.unranked}</div>
              <div className="pool-wrapper">
                {poolTabs && (
                  <div className="gen-tabs">
                    {poolTabs.map(tab => (
                      <button
                        key={tab.key}
                        className={`gen-tab${activePoolTab === tab.key ? ' active' : ''}`}
                        onClick={() => {
                          setActivePoolTab(tab.key)
                          setPoolOrder(null)
                          if (blindMode) {
                            const tabItems = poolItems.filter(s => tab.ids.has(s.id))
                            setBlindQueue(buildShuffledQueue(tabItems))
                          }
                        }}
                      >
                        {t.tabs[tab.label] ?? tab.label}
                      </button>
                    ))}
                  </div>
                )}
                {blindMode ? (
                  <div className="blind-spotlight">
                    {currentBlindItem ? (
                      <>
                        <TvCard show={currentBlindItem as TvShow} onClick={() => setModalShow(currentBlindItem as TvShow)} />
                        <div className="blind-progress">{blindRemaining} {t.remaining}</div>
                        <button className="blind-skip-btn" onClick={handleSkip}>{t.skip}</button>
                      </>
                    ) : (
                      <div className="blind-all-ranked">{t.allRanked}</div>
                    )}
                  </div>
                ) : (
                  <div
                    ref={poolRef}
                    data-pool-zone="true"
                    className={`pokemon-pool tv-pool${isDragOver ? ' drag-over' : ''}`}
                    onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDropOnPool}
                  >
                    {orderedPoolItems.map(item => (
                      <TvCard key={item.id} show={item} onClick={() => setModalShow(item as TvShow)} />
                    ))}
                  </div>
                )}
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
