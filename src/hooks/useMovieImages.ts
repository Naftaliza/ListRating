import { useState, useEffect } from 'react'

type ImageMap = Record<number, string>

const WIKI: Record<number, string> = {
  // Original 50
  1:  'The Shawshank Redemption',
  2:  'The Godfather',
  3:  'The Dark Knight',
  4:  'Pulp Fiction',
  5:  "Schindler's List",
  6:  'The Lord of the Rings: The Fellowship of the Ring',
  7:  'Forrest Gump',
  8:  'Inception',
  9:  'The Matrix',
  10: 'Goodfellas',
  11: 'Fight Club',
  12: 'Interstellar (film)',
  13: 'The Silence of the Lambs (film)',
  14: 'Parasite (2019 film)',
  15: 'Avengers: Endgame',
  16: 'Joker (2019 film)',
  17: 'The Lion King',
  18: 'Toy Story',
  19: 'Gladiator (2000 film)',
  20: 'The Departed',
  21: 'Whiplash (film)',
  22: 'Mad Max: Fury Road',
  23: 'The Grand Budapest Hotel',
  24: 'La La Land',
  25: 'Get Out (film)',
  26: 'Dune (2021 film)',
  27: 'Everything Everywhere All at Once',
  28: 'Oppenheimer (film)',
  29: 'Top Gun: Maverick',
  30: 'Spider-Man: Into the Spider-Verse',
  31: 'Knives Out',
  32: '1917 (film)',
  33: 'Blade Runner 2049',
  34: 'The Revenant (2015 film)',
  35: 'Gone Girl (film)',
  36: 'No Country for Old Men',
  37: 'The Social Network',
  38: 'Eternal Sunshine of the Spotless Mind',
  39: 'Saving Private Ryan',
  40: 'The Prestige (film)',
  41: 'Memento (film)',
  42: 'City of God (film)',
  43: 'The Truman Show',
  44: 'Amélie',
  45: 'Spirited Away',
  46: 'Princess Mononoke',
  47: 'A Beautiful Mind (film)',
  48: '12 Angry Men (1957 film)',
  49: 'Oldboy (2003 film)',
  50: 'Hereditary (film)',
  // New movies 51–72
  51: 'Good Will Hunting',
  52: 'There Will Be Blood',
  53: 'Apocalypse Now',
  54: 'Taxi Driver',
  55: 'Casablanca (film)',
  56: '2001: A Space Odyssey',
  57: 'Alien (film)',
  58: 'Terminator 2: Judgment Day',
  59: 'Arrival (film)',
  60: 'The Martian (film)',
  61: 'Se7en',
  62: 'Heat (1995 film)',
  63: 'The Shining (film)',
  64: 'A Clockwork Orange (film)',
  65: 'Zodiac (film)',
  66: 'WALL-E',
  67: 'Up (2009 film)',
  68: 'Finding Nemo',
  69: 'Inside Out (film)',
  70: "Howl's Moving Castle (film)",
  71: 'Akira (1988 film)',
  72: 'The Iron Giant',
}

function wikiUrl(title: string): string {
  const encoded = title.split(' ').map(word => encodeURIComponent(word)).join('_')
  return `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`
}

export function useMovieImages(items: { id: number }[]): ImageMap {
  const [imageMap, setImageMap] = useState<ImageMap>({})

  useEffect(() => {
    let cancelled = false
    const BATCH = 6

    async function fetchAll() {
      for (let i = 0; i < items.length; i += BATCH) {
        if (cancelled) return
        const batch = items.slice(i, i + BATCH)
        const results = await Promise.allSettled(
          batch.map(item => {
            const title = WIKI[item.id]
            if (!title) return Promise.resolve({ id: item.id, url: null })
            return fetch(wikiUrl(title))
              .then(r => r.json())
              .then((data): { id: number; url: string | null } => ({
                id: item.id,
                url: data?.thumbnail?.source ?? data?.originalimage?.source ?? null,
              }))
              .catch(() => ({ id: item.id, url: null }))
          })
        )
        if (cancelled) return
        const partial: ImageMap = {}
        for (const r of results) {
          if (r.status === 'fulfilled' && r.value.url) {
            partial[r.value.id] = r.value.url
          }
        }
        setImageMap(prev => ({ ...prev, ...partial }))
        if (i + BATCH < items.length) await new Promise(res => setTimeout(res, 150))
      }
    }

    fetchAll()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return imageMap
}
