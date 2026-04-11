import MediaTierList from './MediaTierList'
import { useTvImages } from '../hooks/useTvImages'

const TMDB = (path: string) => `https://image.tmdb.org/t/p/w92${path}`

const TV_SHOWS = [
  // ── Drama (1–13) ──────────────────────────────────────────────────────────
  { id: 1,  name: 'Breaking Bad',         image: TMDB('/ggFHVNu6YYI5L9pCfOacjizRGt.jpg'),  years: '2008–2013', genres: ['Crime', 'Drama'],        rating: 9.5, desc: 'A chemistry teacher turned drug kingpin after a cancer diagnosis.' },
  { id: 2,  name: 'The Sopranos',         image: TMDB('/57okjmSd3HCmVSF9yQBrVFQTqBN.jpg'),  years: '1999–2007', genres: ['Crime', 'Drama'],        rating: 9.2, desc: 'New Jersey mob boss Tony Soprano deals with personal and professional crises.' },
  { id: 3,  name: 'The Wire',             image: TMDB('/4lbclFySvugI51fwsyxBTOm4DqK.jpg'),  years: '2002–2008', genres: ['Crime', 'Drama'],        rating: 9.3, desc: 'The drug scene in Baltimore seen through the eyes of both law enforcers and drug dealers.' },
  { id: 4,  name: 'Chernobyl',            image: TMDB('/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg'),  years: '2019',      genres: ['Drama', 'History'],      rating: 9.4, desc: 'The true story of one of the worst man-made catastrophes in history.' },
  { id: 5,  name: 'Succession',           image: TMDB('/e2X8zvOp6QgJEKgBHxHmBxoOgwZ.jpg'),  years: '2018–2023', genres: ['Drama', 'Comedy'],       rating: 8.9, desc: 'A media dynasty family fights for control of their empire.' },
  { id: 6,  name: 'Better Call Saul',     image: TMDB('/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg'),  years: '2015–2022', genres: ['Crime', 'Drama'],        rating: 9.0, desc: 'The transformation of Jimmy McGill into morally compromised lawyer Saul Goodman.' },
  { id: 7,  name: 'Peaky Blinders',       image: TMDB('/vUUqzWa2LnHIVqkaKVn3nyfVsa1.jpg'),  years: '2013–2022', genres: ['Crime', 'Drama'],        rating: 8.8, desc: 'A gangster family epic set in Birmingham after World War I.' },
  { id: 8,  name: 'Ozark',               image: TMDB('/pCGyPVrI9Fzc5LqGcpFGRKCfkCr.jpg'),  years: '2017–2022', genres: ['Crime', 'Drama'],        rating: 8.5, desc: 'A financial advisor is forced to launder money for a drug cartel in the Ozarks.' },
  { id: 9,  name: 'The Crown',            image: TMDB('/1M876KPjulVwppEpldhdc8V4o68.jpg'),  years: '2016–2023', genres: ['Drama', 'History'],      rating: 8.7, desc: 'The reign of Queen Elizabeth II from the 1940s to the 2010s.' },
  { id: 10, name: 'True Detective',       image: TMDB('/6tzKEOVxAWEYFXBCqeIMmfP3jJX.jpg'),  years: '2014–',     genres: ['Crime', 'Drama'],        rating: 9.0, desc: 'Anthology series following detectives through dark and complex criminal investigations.' },
  { id: 11, name: 'Mindhunter',           image: TMDB('/rCPUkZh7wRGJCRkD3cDHDIUwKSx.jpg'),  years: '2017–2019', genres: ['Crime', 'Drama'],        rating: 8.6, desc: 'FBI agents interview serial killers to understand and catch future murderers.' },
  { id: 12, name: 'Narcos',              image: TMDB('/rTmal9fDbwh5F0waol2hq35U4ah.jpg'),  years: '2015–2017', genres: ['Crime', 'Drama'],        rating: 8.8, desc: 'The rise and fall of Pablo Escobar and Colombia\'s cocaine cartels.' },
  { id: 13, name: 'Euphoria',             image: TMDB('/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg'),  years: '2019–',     genres: ['Drama'],                 rating: 8.4, desc: 'A group of high school students navigate identity, trauma, drugs, and love.' },

  // ── Thriller / Sci-Fi (14–27) ─────────────────────────────────────────────
  { id: 14, name: 'Game of Thrones',      image: TMDB('/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg'),  years: '2011–2019', genres: ['Fantasy', 'Drama'],      rating: 9.2, desc: 'Noble families battle for control of the Iron Throne of Westeros.' },
  { id: 15, name: 'Stranger Things',      image: TMDB('/49WJfeN0moxb9IPfGn8AIqMGskD.jpg'),  years: '2016–2025', genres: ['Sci-Fi', 'Horror'],      rating: 8.7, desc: 'Kids in a small town uncover supernatural mysteries and government secrets.' },
  { id: 16, name: 'The Last of Us',       image: TMDB('/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'),  years: '2023–',     genres: ['Drama', 'Sci-Fi'],       rating: 8.8, desc: 'A smuggler and a teenage girl traverse a post-apocalyptic United States.' },
  { id: 17, name: 'Black Mirror',         image: TMDB('/7PRddO7z7mcPi21nZTCMGShAyy1.jpg'),  years: '2011–',     genres: ['Sci-Fi', 'Thriller'],    rating: 8.7, desc: 'Anthology series exploring dark sides of technology and modern society.' },
  { id: 18, name: 'Westworld',            image: TMDB('/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg'),  years: '2016–2022', genres: ['Sci-Fi', 'Thriller'],    rating: 8.6, desc: 'A futuristic theme park populated by AI hosts spirals into chaos.' },
  { id: 19, name: 'Squid Game',           image: TMDB('/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg'),  years: '2021–',     genres: ['Thriller', 'Drama'],     rating: 8.0, desc: 'Desperate people risk their lives in deadly children\'s games for a cash prize.' },
  { id: 20, name: 'Severance',            image: TMDB('/lG30f8qnHEPST4At2IKkHu2FkNb.jpg'),  years: '2022–',     genres: ['Sci-Fi', 'Thriller'],    rating: 8.7, desc: 'Office workers undergo a procedure to separate their work and personal memories.' },
  { id: 21, name: 'House of Cards',       image: TMDB('/hKWxrZfVdum1YKFkgYDuzCBgjE.jpg'),  years: '2013–2018', genres: ['Drama', 'Thriller'],     rating: 8.7, desc: 'A ruthless politician and his wife scheme their way to the US Presidency.' },
  { id: 22, name: 'Lost',                 image: TMDB('/og6S0aTZU6YUJAbqxeKjCa3kY1E.jpg'),  years: '2004–2010', genres: ['Mystery', 'Sci-Fi'],     rating: 8.3, desc: 'Survivors of a plane crash are stranded on a mysterious tropical island.' },
  { id: 23, name: 'The X-Files',          image: TMDB('/bsXfU7PC5oFbBgCJ2mxyNQunMDu.jpg'),  years: '1993–2018', genres: ['Sci-Fi', 'Mystery'],     rating: 8.6, desc: 'Two FBI agents investigate unexplained and paranormal cases.' },
  { id: 24, name: 'Dexter',              image: TMDB('/p0TXMBQrqmCqKLLSPSSlFEdJGKh.jpg'),  years: '2006–2013', genres: ['Crime', 'Thriller'],     rating: 8.6, desc: 'A forensic expert moonlights as a vigilante serial killer targeting murderers.' },
  { id: 25, name: 'Fargo',               image: TMDB('/6U9CPeD8obHzweikFhiLhpc7YBT.jpg'),  years: '2014–',     genres: ['Crime', 'Thriller'],     rating: 8.9, desc: 'Anthology of intricate stories of ordinary people and extraordinary circumstances.' },
  { id: 26, name: 'Sherlock',             image: TMDB('/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg'),  years: '2010–2017', genres: ['Crime', 'Mystery'],      rating: 9.1, desc: 'A modern adaptation of Sherlock Holmes solving crimes in contemporary London.' },
  { id: 27, name: 'House M.D.',           image: TMDB('/3GrRgt6CiLIUXymGhnL4yqGdMbX.jpg'),  years: '2004–2012', genres: ['Drama', 'Mystery'],      rating: 8.7, desc: 'A misanthropic genius doctor leads a team solving medical mysteries.' },

  // ── Comedy (28–39) ────────────────────────────────────────────────────────
  { id: 28, name: 'The Office',           image: TMDB('/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg'),  years: '2005–2013', genres: ['Comedy'],                rating: 9.0, desc: 'A mockumentary about the everyday lives of office workers in Scranton, PA.' },
  { id: 29, name: 'Friends',              image: TMDB('/f496cm9enuEsZkSPzCwnTESEK5s.jpg'),  years: '1994–2004', genres: ['Comedy', 'Romance'],     rating: 8.9, desc: 'Six friends navigate life, love, and careers in New York City.' },
  { id: 30, name: 'Seinfeld',             image: TMDB('/aCw8ONfyz3AhngVQa1E2Ss4KSUQ.jpg'),  years: '1989–1998', genres: ['Comedy'],                rating: 8.9, desc: 'A comedian and his quirky friends navigate the absurdities of everyday life in NYC.' },
  { id: 31, name: "It's Always Sunny",    image: TMDB('/sPkzFQkYSJb2TqBK5SYWQZB2FRMO.jpg'), years: '2005–',     genres: ['Comedy'],                rating: 8.8, desc: 'Five horrible people run a bar in Philadelphia while getting into ridiculous schemes.' },
  { id: 32, name: 'Arrested Development', image: TMDB('/a4sFg9JBMdqF0MkNTiB2KDhbNDL.jpg'),  years: '2003–2019', genres: ['Comedy'],                rating: 8.7, desc: 'A wealthy dysfunctional family loses its fortune and must learn to survive.' },
  { id: 33, name: 'Curb Your Enthusiasm', image: TMDB('/7HCMflzCbQbHfUKjlNH7oNAWR3e.jpg'),  years: '2000–2024', genres: ['Comedy'],                rating: 8.7, desc: 'Larry David stars as a fictionalized version of himself in awkward social situations.' },
  { id: 34, name: 'Fleabag',             image: TMDB('/6DkPDCpRr5lPnbFoXuEBaToBKYu.jpg'),  years: '2016–2019', genres: ['Comedy', 'Drama'],       rating: 8.7, desc: 'A witty and troubled woman navigates life and loss in London, breaking the fourth wall.' },
  { id: 35, name: 'Ted Lasso',            image: TMDB('/5fhZdwP1DVJ0FyVH6vrFdHwpXIn.jpg'),  years: '2020–2023', genres: ['Comedy', 'Drama'],       rating: 8.8, desc: 'An American football coach is hired to manage an English soccer team.' },
  { id: 36, name: 'Schitt\'s Creek',      image: TMDB('/lSYHvMwHGCqjkCRE3kCjvFVvNrp.jpg'),  years: '2015–2020', genres: ['Comedy'],                rating: 8.5, desc: 'A formerly wealthy family is forced to rebuild their lives in a small town they once bought as a joke.' },
  { id: 37, name: 'What We Do in the Shadows', image: TMDB('/k1OL02DibBNhZOjxDLiZkbGEi7W.jpg'), years: '2019–2024', genres: ['Comedy', 'Horror'], rating: 8.6, desc: 'Mockumentary about vampire roommates navigating modern life on Staten Island.' },
  { id: 38, name: 'Abbott Elementary',    image: TMDB('/3N2BVJBbGQAELBcfFwrUYJLjTZE.jpg'),  years: '2021–',     genres: ['Comedy'],                rating: 8.2, desc: 'A group of dedicated teachers try their best despite a lack of resources at a struggling public school.' },
  { id: 39, name: 'Bojack Horseman',      image: TMDB('/pB9sqfMzMH9VUlC7IhOKXGPqYLo.jpg'),  years: '2014–2020', genres: ['Comedy', 'Drama'],       rating: 8.8, desc: 'A washed-up celebrity horse navigates Hollywood and his own demons in this darkly comedic series.' },

  // ── Fantasy / Action (40–50) ──────────────────────────────────────────────
  { id: 40, name: 'House of the Dragon',  image: TMDB('/z2yahl2uefxDCl0nogcRBstwruJ.jpg'),  years: '2022–',     genres: ['Fantasy', 'Drama'],      rating: 8.4, desc: 'The story of House Targaryen, 200 years before Game of Thrones.' },
  { id: 41, name: 'The Boys',             image: TMDB('/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg'),  years: '2019–2024', genres: ['Action', 'Sci-Fi'],      rating: 8.7, desc: 'A group fights back against corrupt, celebrity superheroes.' },
  { id: 42, name: 'The Mandalorian',      image: TMDB('/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg'),  years: '2019–',     genres: ['Action', 'Sci-Fi'],      rating: 8.7, desc: 'A lone bounty hunter protects a mysterious child in the Star Wars galaxy.' },
  { id: 43, name: 'The Witcher',          image: TMDB('/cZ0d3rtvXPVo2M3ynqcMqTlLRWx.jpg'),  years: '2019–2023', genres: ['Fantasy', 'Action'],     rating: 8.2, desc: 'A mutated monster hunter struggles to find his place in a world where people are often more wicked than beasts.' },
  { id: 44, name: 'Andor',               image: TMDB('/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg'),  years: '2022–',     genres: ['Sci-Fi', 'Action'],      rating: 8.4, desc: 'The origin story of rebel spy Cassian Andor in the Star Wars universe.' },
  { id: 45, name: 'Loki',                image: TMDB('/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg'),  years: '2021–2023', genres: ['Sci-Fi', 'Fantasy'],     rating: 8.2, desc: 'The God of Mischief steps out of his brother\'s shadow in a time-bending adventure.' },
  { id: 46, name: '24',                   image: TMDB('/8pHDnFPHNzBJbN5nLMbBKfBNuxt.jpg'),  years: '2001–2014', genres: ['Action', 'Thriller'],    rating: 8.4, desc: 'CTU agent Jack Bauer fights terrorism in real-time over 24 hours.' },
  { id: 47, name: 'Prison Break',         image: TMDB('/5E1BhkCgjLBlqx557Z5yzcN0i88.jpg'),  years: '2005–2017', genres: ['Action', 'Crime'],       rating: 8.3, desc: 'A man gets arrested to break his wrongly convicted brother out of prison.' },
  { id: 48, name: 'Cobra Kai',            image: TMDB('/6POBOcP7jFJoTFKEFQbOHVaHXza.jpg'),  years: '2018–2025', genres: ['Action', 'Drama'],       rating: 8.5, desc: 'The Karate Kid rivalry reignites 30 years later through competing dojos.' },
  { id: 49, name: 'Suits',               image: TMDB('/vbZCMmxHAlqBauUr4OqMtK4FOOu.jpg'),  years: '2011–2019', genres: ['Drama'],                 rating: 8.5, desc: 'A talented college dropout begins working for a top NYC law firm using a fake degree.' },
  { id: 50, name: 'Yellowstone',          image: TMDB('/1Ct4PFBp3Ck8GOJDRLRmMPGqLuO.jpg'),  years: '2018–',     genres: ['Drama', 'Western'],      rating: 8.7, desc: 'A ranching family in Montana faces conflict from land developers and politicians.' },

  // ── Animation (51–57) ─────────────────────────────────────────────────────
  { id: 51, name: 'The Simpsons',         image: TMDB('/2IWouZK5gGOoKoPOPnfNGMys2YB.jpg'),  years: '1989–',     genres: ['Animation', 'Comedy'],   rating: 8.7, desc: 'The satirical adventures of a working-class family in the fictional town of Springfield.' },
  { id: 52, name: 'South Park',           image: TMDB('/vdpO7jP8FQFfFZ9IVlNPZnqhq6l.jpg'),  years: '1997–',     genres: ['Animation', 'Comedy'],   rating: 8.7, desc: 'Four boys in Colorado tackle social issues with crude and irreverent humor.' },
  { id: 53, name: 'Rick and Morty',       image: TMDB('/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg'),  years: '2013–',     genres: ['Animation', 'Sci-Fi'],   rating: 9.1, desc: 'A genius scientist and his impressionable grandson go on interdimensional adventures.' },
  { id: 54, name: 'Futurama',             image: TMDB('/2oKlMEAFBVpRkMKWlFiA2uFGMqE.jpg'),  years: '1999–2023', genres: ['Animation', 'Sci-Fi'],   rating: 8.5, desc: 'A pizza delivery guy accidentally gets frozen and wakes up 1000 years in the future.' },
  { id: 55, name: 'BoJack Horseman',      image: TMDB('/pB9sqfMzMH9VUlC7IhOKXGPqYLo.jpg'),  years: '2014–2020', genres: ['Animation', 'Drama'],    rating: 8.8, desc: 'A washed-up celebrity horse navigates Hollywood and his own demons.' },
  { id: 56, name: 'Arcane',               image: TMDB('/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg'),  years: '2021–',     genres: ['Animation', 'Fantasy'],  rating: 9.0, desc: 'Set in the utopian region of Piltover and the oppressed underground of Zaun, two sisters fight on different sides of a brewing war.' },
  { id: 57, name: 'Avatar: The Last Airbender', image: TMDB('/cIDSQMOiMvz5JzKDWilhCCKdqEq.jpg'), years: '2005–2008', genres: ['Animation', 'Fantasy'], rating: 9.3, desc: 'A young boy destined to master all four elements must save the world from the Fire Nation.' },
]

const POOL_TABS = [
  { key: 'drama',    label: 'Drama',           ids: new Set([1,2,3,4,5,6,7,8,9,10,11,12,13]) },
  { key: 'thriller', label: 'Thriller / Sci-Fi',ids: new Set([14,15,16,17,18,19,20,21,22,23,24,25,26,27]) },
  { key: 'comedy',   label: 'Comedy',           ids: new Set([28,29,30,31,32,33,34,35,36,37,38,39]) },
  { key: 'action',   label: 'Fantasy / Action', ids: new Set([40,41,42,43,44,45,46,47,48,49,50]) },
  { key: 'animation',label: 'Animation',        ids: new Set([51,52,53,54,55,56,57]) },
]

interface Props { onHome: () => void }

export default function TvTierList({ onHome }: Props) {
  const imageMap = useTvImages(TV_SHOWS)
  return (
    <MediaTierList
      items={TV_SHOWS}
      imageMap={imageMap}
      onHome={onHome}
      shareFilename="tv-tierlist"
      poolTabs={POOL_TABS}
    />
  )
}
