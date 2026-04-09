import { useState, useEffect } from 'react'

type ImageMap = Record<number, string>

export function useTvImages(shows: { id: number; name: string }[]): ImageMap {
  const [imageMap, setImageMap] = useState<ImageMap>({})

  useEffect(() => {
    let cancelled = false

    Promise.allSettled(
      shows.map(show =>
        fetch(`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(show.name)}`)
          .then(r => r.json())
          .then(data => ({
            id: show.id,
            url: (data?.image?.medium ?? null) as string | null,
          }))
      )
    ).then(results => {
      if (cancelled) return
      const map: ImageMap = {}
      for (const r of results) {
        if (r.status === 'fulfilled' && r.value.url) {
          map[r.value.id] = r.value.url
        }
      }
      setImageMap(map)
    })

    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return imageMap
}
