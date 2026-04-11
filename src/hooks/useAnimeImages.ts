import { useState, useEffect } from 'react'

type ImageMap = Record<number, string>

export function useAnimeImages(items: { id: number; name: string }[]): ImageMap {
  const [imageMap, setImageMap] = useState<ImageMap>({})

  useEffect(() => {
    let cancelled = false

    async function fetchAll() {
      // Jikan allows ~3 req/sec; batch in groups of 4 with a short delay
      const BATCH = 4
      for (let i = 0; i < items.length; i += BATCH) {
        if (cancelled) return
        const batch = items.slice(i, i + BATCH)
        const results = await Promise.allSettled(
          batch.map(item =>
            fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(item.name)}&limit=1`)
              .then(r => r.json())
              .then(data => ({
                id: item.id,
                url: (data.data?.[0]?.images?.jpg?.image_url ?? null) as string | null,
              }))
          )
        )
        if (cancelled) return
        const partial: ImageMap = {}
        for (const r of results) {
          if (r.status === 'fulfilled' && r.value.url) {
            partial[r.value.id] = r.value.url
          }
        }
        setImageMap(prev => ({ ...prev, ...partial }))
        if (i + BATCH < items.length) await new Promise(res => setTimeout(res, 400))
      }
    }

    fetchAll()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return imageMap
}
