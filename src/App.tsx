import { useState, useMemo, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import type { Tier, Pokemon, DragData } from './types/pokemon'
import { GENERATIONS } from './constants/generations'
import { ModalContext } from './context/ModalContext'
import { LangProvider, useLang } from './context/LangContext'
import { tr } from './i18n'
import FlagIcon from './components/FlagIcon'
import TierRow from './components/TierRow'
import PokemonPool from './components/PokemonPool'
import PokemonModal from './components/PokemonModal'
import TopicSelect from './components/TopicSelect'
import TvTierList from './components/TvTierList'
import MovieTierList from './components/MovieTierList'
import GameTierList from './components/GameTierList'
import AnimeTierList from './components/AnimeTierList'
import './App.css'

const TIER_COLORS = [
  { id: 'goat',   key: 'goat'  as const, color: 'linear-gradient(135deg, #ff4e50, #fc913a)' },
  { id: 'elite',  key: 'elite' as const, color: 'linear-gradient(135deg, #f9a825, #ff6f00)' },
  { id: 'solid',  key: 'solid' as const, color: 'linear-gradient(135deg, #fff176, #f9a825)' },
  { id: 'decent', key: 'decent'as const, color: 'linear-gradient(135deg, #b5f5a0, #57c84d)' },
  { id: 'meh',    key: 'meh'  as const,  color: 'linear-gradient(135deg, #80deea, #0097a7)' },
  { id: 'weak',   key: 'weak' as const,  color: 'linear-gradient(135deg, #9575cd, #512da8)' },
  { id: 'trash',  key: 'trash' as const, color: 'linear-gradient(135deg, #546e7a, #263238)' },
]

function makeTiers(tiers: ReturnType<typeof tr>['tiers']) {
  return TIER_COLORS.map(t => ({ id: t.id, label: tiers[t.key], color: t.color, pokemon: [] as Tier['pokemon'] }))
}

function PokemonTierList({ onHome }: { onHome: () => void }) {
  const { lang, toggle } = useLang()
  const t = tr(lang)
  const [tiers, setTiers] = useState<Tier[]>(() => makeTiers(t.tiers))
  const [allPokemon, setAllPokemon] = useState<Map<number, Pokemon>>(new Map())

  // Update default tier labels when language changes
  useEffect(() => {
    const defaults = makeTiers(t.tiers)
    setTiers(prev => prev.map((tier, i) => ({ ...tier, label: defaults[i]?.label ?? tier.label })))
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps
  const [modalPokemon, setModalPokemon] = useState<Pokemon | null>(null)
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'done'>('idle')
  const [displayMode, setDisplayMode] = useState(false)
  const [poolOrder, setPoolOrder] = useState<number[] | null>(null)
  const [blindMode, setBlindMode] = useState(false)
  const [blindQueue, setBlindQueue] = useState<number[]>([])
  const [activeGen, setActiveGen] = useState(1)
  const tierListRef = useRef<HTMLDivElement>(null)

  const sortedAllPokemon = useMemo(
    () => Array.from(allPokemon.values()).sort((a, b) => a.id - b.id),
    [allPokemon]
  )

  const rankedIds = new Set(tiers.flatMap(t => t.pokemon.map(p => p.id)))

  function handleGenLoaded(_genId: number, pokemon: Pokemon[]) {
    setAllPokemon(prev => {
      if (pokemon.every(p => prev.has(p.id))) return prev
      const next = new Map(prev)
      pokemon.forEach(p => next.set(p.id, p))
      return next
    })
  }

  function findPokemon(id: number) { return allPokemon.get(id) }

  function removePokemon(id: number) {
    return tiers.map(t => ({ ...t, pokemon: t.pokemon.filter(p => p.id !== id) }))
  }

  function handleDropOnTier(data: DragData, targetTierId: string) {
    const pokemon = findPokemon(data.pokemonId)
    if (!pokemon) return
    if (data.sourceType === 'tier' && data.sourceTierId === targetTierId) return
    setTiers(removePokemon(data.pokemonId).map(t =>
      t.id === targetTierId ? { ...t, pokemon: [...t.pokemon, pokemon] } : t
    ))
  }

  function handleDropOnPool(data: DragData) {
    if (data.sourceType !== 'tier') return
    setTiers(removePokemon(data.pokemonId))
  }

  function handleLabelChange(tierId: string, label: string) {
    setTiers(prev => prev.map(t => t.id === tierId ? { ...t, label } : t))
  }

  function getGenIds(genId: number) {
    const gen = GENERATIONS.find(g => g.id === genId)
    if (!gen) return []
    const min = gen.offset + 1
    const max = gen.offset + gen.limit
    return Array.from(allPokemon.keys()).filter(id => id >= min && id <= max)
  }

  function shuffle(ids: number[]) {
    const arr = [...ids]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  function handleShuffle() {
    setPoolOrder(shuffle(getGenIds(activeGen)))
  }

  function handleToggleBlind() {
    if (blindMode) {
      setBlindMode(false)
      setBlindQueue([])
    } else {
      setBlindQueue(shuffle(getGenIds(activeGen).filter(id => !rankedIds.has(id))))
      setBlindMode(true)
    }
  }

  function handleGenChange(genId: number) {
    setActiveGen(genId)
    setPoolOrder(null)
    if (blindMode) {
      setBlindQueue(shuffle(getGenIds(genId).filter(id => !rankedIds.has(id))))
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

  async function handleShare() {
    if (!tierListRef.current) return
    setShareStatus('copying')
    try {
      const canvas = await html2canvas(tierListRef.current, {
        backgroundColor: '#1a1a1a',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })
      canvas.toBlob(async blob => {
        if (!blob) return
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
          setShareStatus('done')
        } catch {
          const a = document.createElement('a')
          a.href = URL.createObjectURL(blob)
          a.download = 'pokemon-tierlist.png'
          a.click()
          setShareStatus('done')
        }
        setTimeout(() => setShareStatus('idle'), 2000)
      })
    } catch {
      setShareStatus('idle')
    }
  }

  return (
    <ModalContext.Provider value={setModalPokemon}>
      <div className="app" dir={lang === 'he' ? 'rtl' : 'ltr'}>
        <div className="header">
          <button className="header-btn home-btn" onClick={onHome}>{t.home}</button>
          <button className={`header-btn display-btn${displayMode ? ' display-btn--active' : ''}`} onClick={() => setDisplayMode(d => !d)}>
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
            onClick={() => { setTiers(makeTiers(t.tiers)); setPoolOrder(null); setBlindMode(false); setBlindQueue([]) }}
          >{t.reset}</button>
          <button className="header-btn lang-toggle-btn" onClick={toggle} style={{ display: 'flex', alignItems: 'center' }}><FlagIcon lang={lang} />{t.langToggle}</button>
        </div>

        <div className={`main-layout${displayMode ? ' display-mode' : ''}`}>
          <div className="tier-list-col">
            <div className="tier-list" ref={tierListRef}>
              {tiers.map((tier) => (
                <TierRow
                  key={tier.id}
                  tier={tier}
                  onDrop={handleDropOnTier}
                  onLabelChange={handleLabelChange}
                />
              ))}
            </div>
          </div>

          {!displayMode && (
            <div className="pool-col">
              <PokemonPool
                rankedIds={rankedIds}
                onDrop={handleDropOnPool}
                onGenLoaded={handleGenLoaded}
                activeGen={activeGen}
                onGenChange={handleGenChange}
                displayOrder={poolOrder ?? undefined}
                blindMode={blindMode}
                currentBlindItem={blindMode ? (allPokemon.get(blindQueue.find(id => !rankedIds.has(id))!) ?? null) : null}
                blindRemaining={blindMode ? blindQueue.filter(id => !rankedIds.has(id)).length : 0}
                onSkip={handleSkip}
              />
            </div>
          )}
        </div>
      </div>

      {modalPokemon && (
        <PokemonModal
          pokemon={modalPokemon}
          allPokemon={sortedAllPokemon}
          onClose={() => setModalPokemon(null)}
          onNavigate={setModalPokemon}
        />
      )}
    </ModalContext.Provider>
  )
}

function AppInner() {
  const [topic, setTopic] = useState<string | null>(null)

  if (!topic) return <TopicSelect onSelect={setTopic} />
  if (topic === 'tvseries')   return <TvTierList    onHome={() => setTopic(null)} />
  if (topic === 'movies')     return <MovieTierList  onHome={() => setTopic(null)} />
  if (topic === 'videogames') return <GameTierList   onHome={() => setTopic(null)} />
  if (topic === 'anime')      return <AnimeTierList  onHome={() => setTopic(null)} />
  return <PokemonTierList onHome={() => setTopic(null)} />
}

export default function App() {
  return <LangProvider><AppInner /></LangProvider>
}
