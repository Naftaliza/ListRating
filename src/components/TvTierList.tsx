import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import TierRow from './TierRow'
import TvModal from './TvModal'
import type { TvShow } from './TvModal'
import { ModalContext } from '../context/ModalContext'
import type { Tier, DragData } from '../types/pokemon'

const DEFAULT_TIERS: Omit<Tier, 'pokemon'>[] = [
  { id: 'goat',   label: '🏆 GOAT',             color: 'linear-gradient(135deg, #ff4e50, #fc913a)' },
  { id: 'elite',  label: '⚡ Elite',            color: 'linear-gradient(135deg, #f9a825, #ff6f00)' },
  { id: 'solid',  label: '💪 Solid Pick',       color: 'linear-gradient(135deg, #fff176, #f9a825)' },
  { id: 'decent', label: '👍 Decent',           color: 'linear-gradient(135deg, #b5f5a0, #57c84d)' },
  { id: 'meh',    label: '😐 Meh',             color: 'linear-gradient(135deg, #80deea, #0097a7)' },
  { id: 'weak',   label: '💀 Weak',            color: 'linear-gradient(135deg, #9575cd, #512da8)' },
  { id: 'trash',  label: '🗑️ Who Approved This',color: 'linear-gradient(135deg, #546e7a, #263238)' },
]

const TMDB = (path: string) => `https://image.tmdb.org/t/p/w92${path}`

const TV_SHOWS = [
  { id: 1,  name: 'Breaking Bad',         image: TMDB('/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'),  years: '2008–2013', genres: ['Crime', 'Drama', 'Thriller'],   rating: 9.5, desc: 'A chemistry teacher turned drug kingpin after a cancer diagnosis.' },
  { id: 2,  name: 'Game of Thrones',      image: TMDB('/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg'),  years: '2011–2019', genres: ['Fantasy', 'Drama', 'Action'],     rating: 9.2, desc: 'Noble families battle for control of the Iron Throne of Westeros.' },
  { id: 3,  name: 'The Wire',             image: TMDB('/4lbclFySvugI51fwsyxBTOm4DqK.jpg'),  years: '2002–2008', genres: ['Crime', 'Drama'],                 rating: 9.3, desc: 'The drug scene in Baltimore seen through the eyes of both law enforcers and drug dealers.' },
  { id: 4,  name: 'The Sopranos',         image: TMDB('/57okjmSd3HCmVSF9yQBrVFQTqBN.jpg'),  years: '1999–2007', genres: ['Crime', 'Drama'],                 rating: 9.2, desc: 'New Jersey mob boss Tony Soprano deals with personal and professional crises.' },
  { id: 5,  name: 'Chernobyl',            image: TMDB('/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg'),  years: '2019',      genres: ['Drama', 'History', 'Thriller'],   rating: 9.4, desc: 'The true story of one of the worst man-made catastrophes in history.' },
  { id: 6,  name: 'Stranger Things',      image: TMDB('/49WJfeN0moxb9IPfGn8AIqMGskD.jpg'),  years: '2016–2025', genres: ['Sci-Fi', 'Horror', 'Drama'],      rating: 8.7, desc: 'Kids in a small town uncover supernatural mysteries and government secrets.' },
  { id: 7,  name: 'The Office',           image: TMDB('/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg'),  years: '2005–2013', genres: ['Comedy'],                         rating: 9.0, desc: 'A mockumentary about the everyday lives of office workers in Scranton, PA.' },
  { id: 8,  name: 'Friends',              image: TMDB('/f496cm9enuEsZkSPzCwnTESEK5s.jpg'),  years: '1994–2004', genres: ['Comedy', 'Romance'],              rating: 8.9, desc: 'Six friends navigate life, love, and careers in New York City.' },
  { id: 9,  name: 'The Last of Us',       image: TMDB('/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'),  years: '2023–',     genres: ['Drama', 'Sci-Fi', 'Thriller'],    rating: 8.8, desc: 'A smuggler and a teenage girl traverse a post-apocalyptic United States.' },
  { id: 10, name: 'House of the Dragon',  image: TMDB('/z2yahl2uefxDCl0nogcRBstwruJ.jpg'),  years: '2022–',     genres: ['Fantasy', 'Drama', 'Action'],     rating: 8.4, desc: 'The story of House Targaryen, 200 years before Game of Thrones.' },
  { id: 11, name: 'Succession',           image: TMDB('/e2X8zvOp6QgJEKgBHxHmBxoOgwZ.jpg'),  years: '2018–2023', genres: ['Drama', 'Comedy'],                rating: 8.9, desc: 'A media dynasty family fights for control of their empire.' },
  { id: 12, name: 'The Boys',             image: TMDB('/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg'),  years: '2019–2024', genres: ['Action', 'Comedy', 'Sci-Fi'],     rating: 8.7, desc: 'A group fights back against corrupt, celebrity superheroes.' },
  { id: 13, name: 'Squid Game',           image: TMDB('/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg'),  years: '2021–',     genres: ['Thriller', 'Drama', 'Action'],    rating: 8.0, desc: 'Desperate people risk their lives in deadly children\'s games for a cash prize.' },
  { id: 14, name: 'Black Mirror',         image: TMDB('/7PRddO7z7mcPi21nZTCMGShAyy1.jpg'),  years: '2011–',     genres: ['Sci-Fi', 'Thriller', 'Drama'],    rating: 8.7, desc: 'Anthology series exploring dark sides of technology and modern society.' },
  { id: 15, name: 'Peaky Blinders',       image: TMDB('/vUUqzWa2LnHIVqkaKVn3nyfVsa1.jpg'),  years: '2013–2022', genres: ['Crime', 'Drama', 'History'],     rating: 8.8, desc: 'A gangster family epic set in Birmingham after World War I.' },
  { id: 16, name: 'The Crown',            image: TMDB('/1M876KPjulVwppEpldhdc8V4o68.jpg'),  years: '2016–2023', genres: ['Drama', 'History'],               rating: 8.7, desc: 'The reign of Queen Elizabeth II from the 1940s to the 2010s.' },
  { id: 17, name: 'Ozark',               image: TMDB('/pCGyPVrI9Fzc5LqGcpFGRKCfkCr.jpg'),  years: '2017–2022', genres: ['Crime', 'Drama', 'Thriller'],    rating: 8.5, desc: 'A financial advisor is forced to launder money for a drug cartel in the Ozarks.' },
  { id: 18, name: 'Westworld',            image: TMDB('/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg'),  years: '2016–2022', genres: ['Sci-Fi', 'Drama', 'Thriller'],   rating: 8.6, desc: 'A futuristic theme park populated by AI hosts spirals into chaos.' },
  { id: 19, name: 'The Mandalorian',      image: TMDB('/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg'),  years: '2019–',     genres: ['Action', 'Sci-Fi', 'Adventure'], rating: 8.7, desc: 'A lone bounty hunter protects a mysterious child in the Star Wars galaxy.' },
  { id: 20, name: 'Better Call Saul',     image: TMDB('/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg'),  years: '2015–2022', genres: ['Crime', 'Drama'],                rating: 9.0, desc: 'The transformation of Jimmy McGill into morally compromised lawyer Saul Goodman.' },
  { id: 21, name: 'The Witcher',          image: TMDB('/cZ0d3rtvXPVo2M3ynqcMqTlLRWx.jpg'),  years: '2019–2023', genres: ['Fantasy', 'Action', 'Adventure'], rating: 8.2, desc: 'A mutated monster hunter struggles to find his place in a world where people are often more wicked than beasts.' },
  { id: 22, name: 'Severance',            image: TMDB('/lG30f8qnHEPST4At2IKkHu2FkNb.jpg'),  years: '2022–',     genres: ['Sci-Fi', 'Thriller', 'Drama'],   rating: 8.7, desc: 'Office workers undergo a procedure to separate their work and personal memories.' },
  { id: 23, name: 'House of Cards',       image: TMDB('/hKWxrZfVdum1YKFpkgYDuzCBgjE.jpg'),  years: '2013–2018', genres: ['Drama', 'Thriller'],              rating: 8.7, desc: 'A ruthless politician and his wife scheme their way to the US Presidency.' },
  { id: 24, name: 'Lost',                 image: TMDB('/og6S0aTZU6YUJAbqxeKjCa3kY1E.jpg'),  years: '2004–2010', genres: ['Drama', 'Mystery', 'Sci-Fi'],    rating: 8.3, desc: 'Survivors of a plane crash are stranded on a mysterious tropical island.' },
  { id: 25, name: 'The X-Files',          image: TMDB('/bsXfU7PC5oFbBgCJ2mxyNQunMDu.jpg'),  years: '1993–2018', genres: ['Sci-Fi', 'Mystery', 'Thriller'],  rating: 8.6, desc: 'Two FBI agents investigate unexplained and paranormal cases.' },
  { id: 26, name: 'Dexter',              image: TMDB('/p0TXMBQrqmCqKLLSPSSlFEdJGKh.jpg'),  years: '2006–2013', genres: ['Crime', 'Drama', 'Mystery'],     rating: 8.6, desc: 'A forensic expert moonlights as a vigilante serial killer targeting murderers.' },
  { id: 27, name: 'True Detective',       image: TMDB('/6tzKEOVxAWEYFXBCqeIMmfP3jJX.jpg'),  years: '2014–',     genres: ['Crime', 'Drama', 'Mystery'],     rating: 9.0, desc: 'Anthology series following detectives through dark and complex criminal investigations.' },
  { id: 28, name: 'Fargo',               image: TMDB('/6U9CPeD8obHzweikFhiLhpc7YBT.jpg'),  years: '2014–',     genres: ['Crime', 'Drama', 'Thriller'],    rating: 8.9, desc: 'An anthology series of intricate stories of ordinary people and extraordinary circumstances.' },
  { id: 29, name: 'Arrested Development', image: TMDB('/a4sFg9JBMdqF0MkNTiB2KDhbNDL.jpg'),  years: '2003–2019', genres: ['Comedy'],                        rating: 8.7, desc: 'A wealthy dysfunctional family loses its fortune and must learn to survive.' },
  { id: 30, name: 'It\'s Always Sunny',   image: TMDB('/sPkzFQkYSJb2TqBK5SYWQZB2FRMO.jpg'), years: '2005–',     genres: ['Comedy'],                        rating: 8.8, desc: 'Five horrible people run a bar in Philadelphia while getting into ridiculous schemes.' },
  { id: 31, name: 'Curb Your Enthusiasm', image: TMDB('/7HCMflzCbQbHfUKjlNH7oNAWR3e.jpg'),  years: '2000–2024', genres: ['Comedy'],                        rating: 8.7, desc: 'Larry David stars as a fictionalized version of himself in awkward social situations.' },
  { id: 32, name: 'Seinfeld',             image: TMDB('/aCw8ONfyz3AhngVQa1E2Ss4KSUQ.jpg'),  years: '1989–1998', genres: ['Comedy'],                        rating: 8.9, desc: 'A comedian and his quirky friends navigate the absurdities of everyday life in NYC.' },
  { id: 33, name: 'The Simpsons',         image: TMDB('/2IWouZK5gGOoKoPOPnfNGMys2YB.jpg'),  years: '1989–',     genres: ['Animation', 'Comedy'],            rating: 8.7, desc: 'The satirical adventures of a working-class family in the fictional town of Springfield.' },
  { id: 34, name: 'South Park',           image: TMDB('/vdpO7jP8FQFfFZ9IVlNPZnqhq6l.jpg'),  years: '1997–',     genres: ['Animation', 'Comedy'],            rating: 8.7, desc: 'Four boys in Colorado tackle social issues with crude and irreverent humor.' },
  { id: 35, name: 'Rick and Morty',       image: TMDB('/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg'),  years: '2013–',     genres: ['Animation', 'Sci-Fi', 'Comedy'],  rating: 9.1, desc: 'A genius scientist and his impressionable grandson go on interdimensional adventures.' },
  { id: 36, name: 'Sherlock',             image: TMDB('/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg'),  years: '2010–2017', genres: ['Crime', 'Drama', 'Mystery'],     rating: 9.1, desc: 'A modern adaptation of Sherlock Holmes solving crimes in contemporary London.' },
  { id: 37, name: 'Fleabag',             image: TMDB('/6DkPDCpRr5lPnbFoXuEBaToBKYu.jpg'),  years: '2016–2019', genres: ['Comedy', 'Drama'],                rating: 8.7, desc: 'A witty and troubled woman navigates life and loss in London, breaking the fourth wall.' },
  { id: 38, name: 'Ted Lasso',            image: TMDB('/5fhZdwP1DVJ0FyVH6vrFdHwpXIn.jpg'),  years: '2020–2023', genres: ['Comedy', 'Drama', 'Sport'],       rating: 8.8, desc: 'An American football coach is hired to manage an English soccer team.' },
  { id: 39, name: 'Andor',               image: TMDB('/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg'),  years: '2022–',     genres: ['Sci-Fi', 'Action', 'Drama'],      rating: 8.4, desc: 'The origin story of rebel spy Cassian Andor in the Star Wars universe.' },
  { id: 40, name: 'Euphoria',             image: TMDB('/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg'),  years: '2019–',     genres: ['Drama'],                          rating: 8.4, desc: 'A group of high school students navigate identity, trauma, drugs, and love.' },
  { id: 41, name: 'White Lotus',          image: TMDB('/obLBdhLxheKg8Li1qO11r2SwmYO.jpg'),  years: '2021–',     genres: ['Drama', 'Comedy', 'Mystery'],     rating: 8.0, desc: 'Social satire following guests and employees at luxury tropical resorts.' },
  { id: 42, name: 'Yellowstone',          image: TMDB('/1Ct4PFBp3Ck8GOJDRLRmMPGqLuO.jpg'),  years: '2018–',     genres: ['Drama', 'Western'],               rating: 8.7, desc: 'A ranching family in Montana faces conflict from land developers and politicians.' },
  { id: 43, name: 'Cobra Kai',            image: TMDB('/6POBOcP7jFJoTFKEFQbOHVaHXza.jpg'),  years: '2018–2025', genres: ['Action', 'Drama', 'Comedy'],      rating: 8.5, desc: 'The Karate Kid rivalry reignites 30 years later through competing dojos.' },
  { id: 44, name: 'Loki',                image: TMDB('/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg'),  years: '2021–2023', genres: ['Sci-Fi', 'Fantasy', 'Action'],    rating: 8.2, desc: 'The God of Mischief steps out of his brother\'s shadow in a time-bending adventure.' },
  { id: 45, name: 'House M.D.',           image: TMDB('/3GrRgt6CiLIUXymGhnL4yqGdMbX.jpg'),  years: '2004–2012', genres: ['Drama', 'Mystery'],               rating: 8.7, desc: 'A misanthropic genius doctor leads a team solving medical mysteries.' },
  { id: 46, name: '24',                   image: TMDB('/8pHDnFPHNzBJbN5nLMbBKfBNuxt.jpg'),  years: '2001–2014', genres: ['Action', 'Drama', 'Thriller'],    rating: 8.4, desc: 'CTU agent Jack Bauer fights terrorism in real-time over 24 hours.' },
  { id: 47, name: 'Prison Break',         image: TMDB('/5E1BhkCgjLBlqx557Z5yzcN0i88.jpg'),  years: '2005–2017', genres: ['Action', 'Crime', 'Drama'],       rating: 8.3, desc: 'A man gets arrested to break his wrongly convicted brother out of prison.' },
  { id: 48, name: 'Suits',               image: TMDB('/vbZCMmxHAlqBauUr4OqMtK4FOOu.jpg'),  years: '2011–2019', genres: ['Drama', 'Comedy'],                rating: 8.5, desc: 'A talented college dropout begins working for a top NYC law firm using a fake degree.' },
  { id: 49, name: 'Narcos',              image: TMDB('/rTmal9fDbwh5F0waol2hq35U4ah.jpg'),  years: '2015–2017', genres: ['Crime', 'Drama', 'History'],     rating: 8.8, desc: 'The rise and fall of Pablo Escobar and Colombia\'s cocaine cartels.' },
  { id: 50, name: 'Mindhunter',           image: TMDB('/rCPUkZh7wRGJCRkD3cDHDIUwKSx.jpg'),  years: '2017–2019', genres: ['Crime', 'Drama', 'Thriller'],    rating: 8.6, desc: 'FBI agents interview serial killers to understand and catch future murderers.' },
].map(s => ({ ...s, artwork: s.image, artworkShiny: s.image, shiny: s.image, types: [] }))

interface DraggableShow {
  id: number
  name: string
  image: string
  artwork: string
  artworkShiny: string
  shiny: string
  types: never[]
}

interface Props {
  onHome: () => void
}

export default function TvTierList({ onHome }: Props) {
  const [tiers, setTiers] = useState<Tier[]>(DEFAULT_TIERS.map(t => ({ ...t, pokemon: [] })))
  const [pool] = useState<DraggableShow[]>(TV_SHOWS)
  const [displayMode, setDisplayMode] = useState(false)
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'done'>('idle')
  const [isDragOver, setIsDragOver] = useState(false)
  const [modalShow, setModalShow] = useState<TvShow | null>(null)
  const tierListRef = useRef<HTMLDivElement>(null)

  const rankedIds = new Set(tiers.flatMap(t => t.pokemon.map(p => p.id)))
  const poolShows = pool.filter(s => !rankedIds.has(s.id))

  function findShow(id: number) { return pool.find(s => s.id === id) }

  function removePokemon(id: number) {
    return tiers.map(t => ({ ...t, pokemon: t.pokemon.filter(p => p.id !== id) }))
  }

  function handleDropOnTier(data: DragData, targetTierId: string) {
    const show = findShow(data.pokemonId)
    if (!show) return
    if (data.sourceType === 'tier' && data.sourceTierId === targetTierId) return
    setTiers(removePokemon(data.pokemonId).map(t =>
      t.id === targetTierId ? { ...t, pokemon: [...t.pokemon, show as any] } : t
    ))
  }

  function handleDropOnPool(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const raw = e.dataTransfer.getData('application/json')
    if (!raw) return
    const data: DragData = JSON.parse(raw)
    if (data.sourceType === 'tier') setTiers(removePokemon(data.pokemonId))
  }

  async function handleShare() {
    if (!tierListRef.current) return
    setShareStatus('copying')
    try {
      const canvas = await html2canvas(tierListRef.current, { backgroundColor: '#1a1a1a', scale: 2, useCORS: true, allowTaint: true })
      canvas.toBlob(async blob => {
        if (!blob) return
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        } catch {
          const a = document.createElement('a')
          a.href = URL.createObjectURL(blob)
          a.download = 'tv-tierlist.png'
          a.click()
        }
        setShareStatus('done')
        setTimeout(() => setShareStatus('idle'), 2000)
      })
    } catch { setShareStatus('idle') }
  }

  const allShows = TV_SHOWS as TvShow[]

  function openModal(id: number) {
    const show = allShows.find(s => s.id === id)
    if (show) setModalShow(show)
  }

  return (
    <ModalContext.Provider value={(p: any) => openModal(p.id)}>
    <div className="app">
      <div className="header">
        <button className="header-btn home-btn" onClick={onHome}>⌂ Home</button>
        <button className={`header-btn display-btn${displayMode ? ' display-btn--active' : ''}`} onClick={() => setDisplayMode(d => !d)}>
          {displayMode ? '✎ Edit' : '✦ Present'}
        </button>
        <button className="header-btn share-btn" onClick={handleShare} disabled={shareStatus !== 'idle'}>
          {shareStatus === 'copying' ? '⏳ Capturing…' : shareStatus === 'done' ? '✓ Copied!' : '📸 Share'}
        </button>
        <button className="header-btn reset-btn" onClick={() => setTiers(DEFAULT_TIERS.map(t => ({ ...t, pokemon: [] })))}>↺ Reset</button>
      </div>

      <div className={`main-layout${displayMode ? ' display-mode' : ''}`}>
        <div className="tier-list-col">
          <div className="tier-list" ref={tierListRef}>
            {tiers.map((tier) => (
              <TierRow
                key={tier.id}
                tier={tier}
                onDrop={handleDropOnTier}
                onLabelChange={(id, label) => setTiers(prev => prev.map(t => t.id === id ? { ...t, label } : t))}
              />
            ))}
          </div>
        </div>

        {!displayMode && (
          <div className="pool-col">
            <div className="pool-wrapper">
              <div
                className={`pokemon-pool tv-pool${isDragOver ? ' drag-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDropOnPool}
              >
                {poolShows.map(show => (
                  <div
                    key={show.id}
                    className="tv-card"
                    draggable
                    onClick={() => setModalShow(show)}
                    onDragStart={e => e.dataTransfer.setData('application/json', JSON.stringify({ pokemonId: show.id, sourceType: 'pool' }))}
                  >
                    <img
                      src={show.image}
                      alt={show.name}
                      className="tv-poster"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.add('tv-poster-fallback--visible') }}
                    />
                    <div className="tv-poster-fallback">📺</div>
                    <span className="tv-name">{show.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {modalShow && (
        <TvModal
          show={modalShow}
          allShows={allShows}
          onClose={() => setModalShow(null)}
          onNavigate={setModalShow}
        />
      )}
    </div>
    </ModalContext.Provider>
  )
}
