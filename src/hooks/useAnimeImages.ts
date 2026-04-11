import { useState, useEffect } from 'react'

type ImageMap = Record<number, string>

const QUERY = `
query ($ids: [Int]) {
  Page(perPage: 100) {
    media(idMal_in: $ids, type: ANIME) {
      idMal
      coverImage { large }
    }
  }
}
`

export function useAnimeImages(items: { id: number; malId: number }[]): ImageMap {
  const [imageMap, setImageMap] = useState<ImageMap>({})

  useEffect(() => {
    let cancelled = false

    async function fetchAll() {
      const malIds = items.map(i => i.malId)
      const malToItemId: Record<number, number> = {}
      for (const item of items) malToItemId[item.malId] = item.id

      try {
        const res = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ query: QUERY, variables: { ids: malIds } }),
        })
        if (cancelled) return
        const json = await res.json()
        const media: { idMal: number; coverImage: { large: string } }[] =
          json?.data?.Page?.media ?? []

        const result: ImageMap = {}
        for (const m of media) {
          const itemId = malToItemId[m.idMal]
          if (itemId && m.coverImage?.large) result[itemId] = m.coverImage.large
        }
        if (!cancelled) setImageMap(result)
      } catch {
        // silently fail
      }
    }

    fetchAll()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return imageMap
}
