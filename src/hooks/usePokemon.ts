import { useState, useCallback } from 'react'
import type { Pokemon } from '../types/pokemon'

const cache: Record<number, Pokemon[]> = {}

const IS_DEV = import.meta.env.DEV

const cdn = (path: string) =>
  IS_DEV
    ? `/ghraw/PokeAPI/sprites/master/sprites/pokemon/${path}`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${path}`

// Extract numeric ID from PokeAPI URL e.g. "https://pokeapi.co/api/v2/pokemon/25/"
function idFromUrl(url: string): number {
  return parseInt(url.replace(/\/$/, '').split('/').pop()!)
}

export function usePokemon() {
  const [genData, setGenData] = useState<Record<number, Pokemon[]>>({})
  const [loading, setLoading] = useState<Record<number, boolean>>({})
  const [error, setError] = useState<Record<number, string>>({})

  const fetchGen = useCallback(async (genId: number, offset: number, limit: number, force = false) => {
    if (!force && cache[genId]) {
      setGenData(prev => ({ ...prev, [genId]: cache[genId] }))
      return
    }

    setLoading(prev => ({ ...prev, [genId]: true }))
    setError(prev => ({ ...prev, [genId]: '' }))

    try {
      // Only 1 API call per generation — build Pokemon from list + IDs
      const apiBase = IS_DEV ? '/pokeapi' : 'https://pokeapi.co'
      const res = await fetch(
        `${apiBase}/api/v2/pokemon?limit=${limit}&offset=${offset}`
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      const parsed: Pokemon[] = data.results.map((p: { name: string; url: string }) => {
        const id = idFromUrl(p.url)
        return {
          id,
          name: p.name,
          image:        cdn(`${id}.png`),
          artwork:      cdn(`other/official-artwork/${id}.png`),
          artworkShiny: cdn(`other/official-artwork/shiny/${id}.png`),
          shiny:        cdn(`shiny/${id}.png`),
          types:   [],   // loaded lazily in tooltip / modal
        }
      })

      cache[genId] = parsed
      setGenData(prev => ({ ...prev, [genId]: parsed }))
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      setError(prev => ({ ...prev, [genId]: `Failed to load Gen ${genId}: ${msg}` }))
    } finally {
      setLoading(prev => ({ ...prev, [genId]: false }))
    }
  }, [])

  return { genData, loading, error, fetchGen }
}
