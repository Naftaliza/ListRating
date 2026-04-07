import type { Pokemon } from '../types/pokemon'

const TYPE_COLORS: Record<string, string> = {
  normal:   '#A8A878', fire:     '#F08030', water:    '#6890F0',
  electric: '#F8D030', grass:    '#78C850', ice:      '#98D8D8',
  fighting: '#C03028', poison:   '#A040A0', ground:   '#E0C068',
  flying:   '#A890F0', psychic:  '#F85888', bug:      '#A8B820',
  rock:     '#B8A038', ghost:    '#705898', dragon:   '#7038F8',
  dark:     '#705848', steel:    '#B8B8D0', fairy:    '#EE99AC',
}

interface Props {
  pokemon: Pokemon
  x: number
  y: number
}

export default function PokemonTooltip({ pokemon, x, y }: Props) {
  const idStr = `#${String(pokemon.id).padStart(3, '0')}`
  const name = pokemon.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  // Keep tooltip on screen
  const tooltipWidth = 160
  const tooltipHeight = 210
  const margin = 12
  const left = Math.min(x + 14, window.innerWidth - tooltipWidth - margin)
  const top  = Math.min(y + 14, window.innerHeight - tooltipHeight - margin)

  return (
    <div
      className="pokemon-tooltip"
      style={{ left, top }}
    >
      <img src={pokemon.artwork} alt={name} className="tooltip-artwork" />
      <div className="tooltip-id">{idStr}</div>
      <div className="tooltip-name">{name}</div>
      <div className="tooltip-types">
        {pokemon.types.map(t => (
          <span
            key={t.name}
            className="tooltip-type-badge"
            style={{ background: TYPE_COLORS[t.name] ?? '#888' }}
          >
            {t.name}
          </span>
        ))}
      </div>
    </div>
  )
}
