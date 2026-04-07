export interface PokemonType {
  name: string
}

export interface Pokemon {
  id: number
  name: string
  image: string         // front_default sprite (pool/tier)
  artwork: string       // official artwork
  artworkShiny: string  // official shiny artwork (high-res)
  shiny: string         // shiny sprite thumbnail
  types: PokemonType[]
}

export interface Tier {
  id: string
  label: string
  color: string
  pokemon: Pokemon[]
}

export interface DragData {
  pokemonId: number
  sourceType: 'pool' | 'tier'
  sourceTierId?: string
}
