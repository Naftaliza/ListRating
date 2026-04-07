import { useState, useMemo, useRef } from 'react'
import html2canvas from 'html2canvas'
import type { Tier, Pokemon, DragData } from './types/pokemon'
import { ModalContext } from './context/ModalContext'
import TierRow from './components/TierRow'
import PokemonPool from './components/PokemonPool'
import PokemonModal from './components/PokemonModal'
import TopicSelect from './components/TopicSelect'
import TvTierList from './components/TvTierList'
import './App.css'

const DEFAULT_TIERS: Omit<Tier, 'pokemon'>[] = [
  { id: 'goat',   label: '🏆 GOAT',             color: 'linear-gradient(135deg, #ff4e50, #fc913a)' },
  { id: 'elite',  label: '⚡ Elite',            color: 'linear-gradient(135deg, #f9a825, #ff6f00)' },
  { id: 'solid',  label: '💪 Solid Pick',       color: 'linear-gradient(135deg, #fff176, #f9a825)' },
  { id: 'decent', label: '👍 Decent',           color: 'linear-gradient(135deg, #b5f5a0, #57c84d)' },
  { id: 'meh',    label: '😐 Meh',             color: 'linear-gradient(135deg, #80deea, #0097a7)' },
  { id: 'weak',   label: '💀 Weak',            color: 'linear-gradient(135deg, #9575cd, #512da8)' },
  { id: 'trash',  label: '🗑️ Who Approved This',color: 'linear-gradient(135deg, #546e7a, #263238)' },
]

function PokemonTierList({ onHome }: { onHome: () => void }) {
  const [tiers, setTiers] = useState<Tier[]>(
    DEFAULT_TIERS.map(t => ({ ...t, pokemon: [] }))
  )
  const [allPokemon, setAllPokemon] = useState<Map<number, Pokemon>>(new Map())
  const [modalPokemon, setModalPokemon] = useState<Pokemon | null>(null)
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'done'>('idle')
  const [displayMode, setDisplayMode] = useState(false)
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

  function moveTierUp(index: number) {
    if (index === 0) return
    setTiers(prev => { const n = [...prev]; [n[index-1], n[index]] = [n[index], n[index-1]]; return n })
  }

  function moveTierDown(index: number) {
    if (index === tiers.length - 1) return
    setTiers(prev => { const n = [...prev]; [n[index], n[index+1]] = [n[index+1], n[index]]; return n })
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
      <div className="app">
        <div className="header">
          <button className="header-btn home-btn" onClick={onHome}>⌂ Home</button>
          <button className={`header-btn display-btn${displayMode ? ' display-btn--active' : ''}`} onClick={() => setDisplayMode(d => !d)}>
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
              {tiers.map((tier, index) => (
                <TierRow
                  key={tier.id}
                  tier={tier}
                  onDrop={handleDropOnTier}
                  onLabelChange={handleLabelChange}
                  onMoveUp={() => moveTierUp(index)}
                  onMoveDown={() => moveTierDown(index)}
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

export default function App() {
  const [topic, setTopic] = useState<string | null>(null)

  if (!topic) return <TopicSelect onSelect={setTopic} />
  if (topic === 'tvseries') return <TvTierList onHome={() => setTopic(null)} />
  return <PokemonTierList onHome={() => setTopic(null)} />
}
