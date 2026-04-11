import MediaTierList from './MediaTierList'
import { useAnimeImages } from '../hooks/useAnimeImages'

interface AnimeItem {
  id: number; malId: number; name: string; image: string
  years: string; genres: string[]; rating: number; desc: string
}

// Global unique IDs across all categories
const ANIME: AnimeItem[] = [
  // ── Action (1–15) ──────────────────────────────────────────────────────────
  { id: 1,  malId: 16498, name: 'Attack on Titan',            image: '', years: '2013–2023', genres: ['Action', 'Drama'],       rating: 9.0, desc: 'Humanity fights for survival against giant humanoid Titans behind enormous walls.' },
  { id: 2,  malId: 38000, name: 'Demon Slayer',               image: '', years: '2019–',     genres: ['Action', 'Fantasy'],     rating: 8.7, desc: 'Tanjiro joins the Demon Slayer Corps to avenge his family and cure his demonized sister.' },
  { id: 3,  malId: 40748, name: 'Jujutsu Kaisen',             image: '', years: '2020–',     genres: ['Action', 'Horror'],      rating: 8.7, desc: 'A boy swallows a cursed talisman and becomes host to a powerful curse.' },
  { id: 4,  malId: 30276, name: 'One Punch Man',              image: '', years: '2015–',     genres: ['Action', 'Comedy'],      rating: 8.8, desc: 'A hero so powerful he defeats every enemy with a single punch, searching for a worthy opponent.' },
  { id: 5,  malId: 32182, name: 'Mob Psycho 100',             image: '', years: '2016–',     genres: ['Action', 'Comedy'],      rating: 8.8, desc: 'A powerful psychic middle-schooler must navigate adolescence while fighting evil spirits.' },
  { id: 6,  malId: 11061, name: 'Hunter x Hunter',            image: '', years: '2011–2014', genres: ['Action', 'Adventure'],   rating: 9.0, desc: "A boy follows his father's footsteps to become a Hunter, pursuing fantastic and dangerous quests." },
  { id: 7,  malId: 37521, name: 'Vinland Saga',               image: '', years: '2019–',     genres: ['Action', 'Historical'],  rating: 8.7, desc: 'Young Thorfinn pursues revenge in the brutal world of Viking warriors.' },
  { id: 8,  malId: 44511, name: 'Chainsaw Man',               image: '', years: '2022–',     genres: ['Action', 'Horror'],      rating: 8.7, desc: 'A poor young man merges with his dog-demon and becomes Chainsaw Man to hunt devils.' },
  { id: 9,  malId: 14719, name: "JoJo's Bizarre Adventure",   image: '', years: '2012–',     genres: ['Action', 'Supernatural'], rating: 8.8, desc: 'The multigenerational saga of the Joestar family, each destined to battle supernatural evil.' },
  { id: 10, malId: 20583, name: 'Haikyuu!!',                  image: '', years: '2014–2020', genres: ['Sports', 'Comedy'],      rating: 8.7, desc: 'A short teen determined to become a volleyball ace joins a high school team.' },
  { id: 11, malId: 50265, name: 'Spy x Family',               image: '', years: '2022–',     genres: ['Comedy', 'Action'],      rating: 8.6, desc: 'A spy creates a fake family — his daughter reads minds and his wife is an assassin.' },
  { id: 12, malId: 269,   name: 'Bleach',                     image: '', years: '2004–',     genres: ['Action', 'Fantasy'],     rating: 8.2, desc: 'A teenager gains Soul Reaper powers and protects the living world from malevolent spirits.' },
  { id: 13, malId: 31964, name: 'My Hero Academia',           image: '', years: '2016–',     genres: ['Action', 'Superhero'],   rating: 8.4, desc: 'In a world of superpowers, a boy born without any enters a prestigious hero school.' },
  { id: 14, malId: 205,   name: 'Samurai Champloo',           image: '', years: '2004–2005', genres: ['Action', 'Historical'],  rating: 8.5, desc: 'Two contrasting samurai and a girl form an uneasy alliance to find a sunflower samurai.' },
  { id: 15, malId: 8074,  name: 'Soul Eater',                 image: '', years: '2008–2009', genres: ['Action', 'Fantasy'],     rating: 7.9, desc: 'Students at a Death Weapon Meister Academy train with hybrid weapons to fight evil.' },

  // ── Isekai (16–27) ─────────────────────────────────────────────────────────
  { id: 16, malId: 11757, name: 'Sword Art Online',                         image: '', years: '2012–', genres: ['Sci-Fi', 'Action'],     rating: 7.6, desc: 'Players of a VR MMORPG are trapped inside when the creator holds them hostage.' },
  { id: 17, malId: 31240, name: 'Re:Zero',                                  image: '', years: '2016–', genres: ['Fantasy', 'Thriller'],  rating: 8.2, desc: 'A teenager transported to a fantasy world discovers he can reset time by dying.' },
  { id: 18, malId: 19815, name: 'No Game No Life',                          image: '', years: '2014',  genres: ['Fantasy', 'Comedy'],    rating: 8.2, desc: 'Genius sibling gamers are transported to a world where all conflicts are resolved through games.' },
  { id: 19, malId: 29803, name: 'Overlord',                                 image: '', years: '2015–', genres: ['Fantasy', 'Action'],    rating: 7.9, desc: "A player is trapped in a game as his all-powerful avatar and sets out to dominate a new world." },
  { id: 20, malId: 37430, name: 'That Time I Got Reincarnated as a Slime',  image: '', years: '2018–', genres: ['Fantasy', 'Adventure'], rating: 8.1, desc: 'An office worker reincarnated as a powerful slime befriends monsters and builds a nation.' },
  { id: 21, malId: 39535, name: 'Mushoku Tensei',                           image: '', years: '2021–', genres: ['Fantasy', 'Adventure'], rating: 8.4, desc: 'A shut-in is reincarnated into a magical world and vows to live without regrets.' },
  { id: 22, malId: 30831, name: 'KonoSuba',                                 image: '', years: '2016–', genres: ['Fantasy', 'Comedy'],    rating: 8.4, desc: 'A boy reincarnates in a fantasy world and forms a hilariously dysfunctional adventuring party.' },
  { id: 23, malId: 35790, name: 'The Rising of the Shield Hero',            image: '', years: '2019–', genres: ['Fantasy', 'Action'],    rating: 8.0, desc: 'A falsely accused hero must rise from the weakest summoned warrior to save the world.' },
  { id: 24, malId: 17265, name: 'Log Horizon',                              image: '', years: '2013–', genres: ['Fantasy', 'Adventure'], rating: 7.9, desc: 'Thousands of gamers are trapped in an online fantasy game and rebuild society from scratch.' },
  { id: 25, malId: 40356, name: 'Cautious Hero',                            image: '', years: '2019',  genres: ['Fantasy', 'Comedy'],    rating: 7.8, desc: 'A goddess summons an overpowered hero who insists on preparing for the smallest threats.' },
  { id: 26, malId: 32750, name: 'Grimgar of Fantasy and Ash',               image: '', years: '2016',  genres: ['Fantasy', 'Drama'],     rating: 7.7, desc: 'People who wake with no memories must survive in a fantasy world by forming an adventuring party.' },
  { id: 27, malId: 34561, name: 'Made in Abyss',                            image: '', years: '2017–', genres: ['Fantasy', 'Adventure'], rating: 8.7, desc: 'A girl and a robot boy descend into a mysterious abyss full of relics and deadly dangers.' },

  // ── Psychological (28–39) ──────────────────────────────────────────────────
  { id: 28, malId: 1535,  name: 'Death Note',                image: '', years: '2006–2007', genres: ['Thriller', 'Mystery'],  rating: 8.9, desc: 'A student finds a supernatural notebook that lets him kill anyone whose name he writes in it.' },
  { id: 29, malId: 9253,  name: 'Steins;Gate',               image: '', years: '2011–2012', genres: ['Sci-Fi', 'Thriller'],   rating: 9.1, desc: 'A mad scientist accidentally discovers time travel and becomes entangled in a deadly conspiracy.' },
  { id: 30, malId: 1575,  name: 'Code Geass',                image: '', years: '2006–2008', genres: ['Mecha', 'Drama'],       rating: 8.7, desc: 'An exiled prince uses a mind-control power to lead a rebellion against a conquering empire.' },
  { id: 31, malId: 22535, name: 'Parasyte: The Maxim',       image: '', years: '2014–2015', genres: ['Sci-Fi', 'Horror'],     rating: 8.5, desc: "A parasitic alien bonds with a boy's hand instead of his brain, forcing an uneasy coexistence." },
  { id: 32, malId: 13601, name: 'Psycho-Pass',               image: '', years: '2012–',     genres: ['Sci-Fi', 'Thriller'],   rating: 8.4, desc: 'In a future Japan, a system predicts criminal intent — but who decides the rules?' },
  { id: 33, malId: 19,    name: 'Monster',                   image: '', years: '2004–2005', genres: ['Thriller', 'Mystery'],  rating: 8.8, desc: 'A surgeon saves a boy who grows up to be a serial killer, setting off a decade-long pursuit.' },
  { id: 34, malId: 31043, name: 'Erased',                    image: '', years: '2016',       genres: ['Mystery', 'Thriller'],  rating: 8.4, desc: 'A man with time-revival powers travels back to his childhood to prevent a series of murders.' },
  { id: 35, malId: 30,    name: 'Neon Genesis Evangelion',   image: '', years: '1995–1996', genres: ['Mecha', 'Drama'],       rating: 8.6, desc: 'A teen pilots a giant mech against mysterious beings called Angels in post-apocalyptic Tokyo.' },
  { id: 36, malId: 32998, name: '91 Days',                   image: '', years: '2016',       genres: ['Thriller', 'Crime'],    rating: 8.0, desc: 'A young man infiltrates the mafia to avenge his murdered family during Prohibition-era America.' },
  { id: 37, malId: 40028, name: 'ID: Invaded',               image: '', years: '2020',       genres: ['Sci-Fi', 'Mystery'],    rating: 7.9, desc: 'Detectives enter the minds of criminals to reconstruct murder scenes and identify killers.' },
  { id: 38, malId: 918,   name: 'Gintama',                   image: '', years: '2006–2018', genres: ['Comedy', 'Action'],     rating: 8.9, desc: 'In Edo-period Japan invaded by aliens, a lazy samurai takes on odd jobs with eccentric companions.' },
  { id: 39, malId: 11111, name: 'Another',                   image: '', years: '2012',       genres: ['Horror', 'Mystery'],    rating: 7.5, desc: 'A student moves to a town haunted by a curse that kills classmates one by one each month.' },

  // ── Romance (40–51) ───────────────────────────────────────────────────────
  { id: 40, malId: 23273, name: 'Your Lie in April',              image: '', years: '2014–2015', genres: ['Drama', 'Romance'],       rating: 8.6, desc: 'A piano prodigy who can no longer hear his music encounters a free-spirited violinist.' },
  { id: 41, malId: 33352, name: 'Violet Evergarden',              image: '', years: '2018',       genres: ['Drama', 'Romance'],       rating: 8.7, desc: 'A former child soldier becomes a letter writer, helping others express what they cannot say.' },
  { id: 42, malId: 4224,  name: 'Toradora',                       image: '', years: '2008–2009', genres: ['Romance', 'Comedy'],      rating: 8.2, desc: 'Two teens with reputations that do not match their true selves help each other find love.' },
  { id: 43, malId: 17549, name: 'My Teen Romantic Comedy SNAFU',  image: '', years: '2013–2020', genres: ['Romance', 'Drama'],       rating: 8.4, desc: "A cynical loner joins a service club and slowly changes through unexpected connections." },
  { id: 44, malId: 38680, name: 'Fruits Basket',                  image: '', years: '2019–2021', genres: ['Romance', 'Drama'],       rating: 8.3, desc: 'A girl discovers her classmates are cursed to transform into Chinese Zodiac animals.' },
  { id: 45, malId: 4181,  name: 'Clannad: After Story',           image: '', years: '2008–2009', genres: ['Drama', 'Romance'],       rating: 8.9, desc: 'The deeply emotional continuation of Tomoya and Nagisa\'s story into adulthood.' },
  { id: 46, malId: 9989,  name: 'AnoHana',                        image: '', years: '2011',       genres: ['Drama', 'Romance'],       rating: 8.5, desc: 'A childhood ghost reappears asking a reclusive boy to reunite their estranged friend group.' },
  { id: 47, malId: 37999, name: 'Kaguya-sama: Love is War',       image: '', years: '2019–',     genres: ['Romance', 'Comedy'],      rating: 8.5, desc: 'Two student council members too proud to confess engage in elaborate psychological battles.' },
  { id: 48, malId: 31646, name: 'March Comes in Like a Lion',     image: '', years: '2016–2018', genres: ['Drama', 'Slice of Life'], rating: 8.7, desc: 'A lonely teenage shogi prodigy slowly finds warmth through the family of three sisters.' },
  { id: 49, malId: 877,   name: 'Nana',                           image: '', years: '2006–2007', genres: ['Drama', 'Romance'],       rating: 8.5, desc: 'Two women named Nana meet on a train to Tokyo and form a life-changing friendship.' },
  { id: 50, malId: 42897, name: 'Horimiya',                       image: '', years: '2021',       genres: ['Romance', 'Slice of Life'], rating: 8.1, desc: 'A popular girl and a gloomy boy discover hidden sides only each other sees.' },
  { id: 51, malId: 37999, name: 'Wotakoi',                        image: '', years: '2018',       genres: ['Romance', 'Comedy'],      rating: 7.9, desc: 'Two adult otaku who have been childhood friends start dating while hiding their nerdy hobbies.' },

  // ── Classics (52–63) ──────────────────────────────────────────────────────
  { id: 52, malId: 1,   name: 'Cowboy Bebop',                    image: '', years: '1998–1999', genres: ['Sci-Fi', 'Action'],      rating: 8.9, desc: 'A ragtag group of bounty hunters chase criminals across the solar system, haunted by their pasts.' },
  { id: 53, malId: 20,  name: 'Naruto',                          image: '', years: '2002–2007', genres: ['Action', 'Adventure'],   rating: 8.3, desc: 'A young ninja dreams of becoming the greatest in his village while carrying the burden of a demon fox.' },
  { id: 54, malId: 813, name: 'Dragon Ball Z',                   image: '', years: '1989–1996', genres: ['Action', 'Sci-Fi'],      rating: 8.7, desc: 'Goku and friends defend Earth from increasingly powerful extraterrestrial villains.' },
  { id: 55, malId: 21,  name: 'One Piece',                       image: '', years: '1999–',     genres: ['Action', 'Adventure'],   rating: 9.0, desc: 'Monkey D. Luffy sails the seas to find the ultimate treasure and become the Pirate King.' },
  { id: 56, malId: 5114,name: 'Fullmetal Alchemist: Brotherhood', image: '', years: '2009–2010', genres: ['Action', 'Fantasy'],    rating: 9.1, desc: 'Two brothers search for a Philosopher\'s Stone after a forbidden alchemy experiment goes wrong.' },
  { id: 57, malId: 233, name: 'Yu Yu Hakusho',                   image: '', years: '1992–1994', genres: ['Action', 'Supernatural'], rating: 8.5, desc: 'A delinquent boy dies saving a child and becomes a spirit detective solving supernatural cases.' },
  { id: 58, malId: 249, name: 'Inuyasha',                        image: '', years: '2000–2010', genres: ['Action', 'Romance'],     rating: 7.9, desc: 'A girl from modern Japan teams up with a half-demon to find a powerful jewel in feudal Japan.' },
  { id: 59, malId: 45,  name: 'Rurouni Kenshin',                 image: '', years: '1996–1998', genres: ['Action', 'Historical'],  rating: 8.3, desc: 'A legendary swordsman who once killed for a warlord now wanders Japan vowing never to kill again.' },
  { id: 60, malId: 6,   name: 'Trigun',                          image: '', years: '1998',       genres: ['Sci-Fi', 'Action'],      rating: 8.3, desc: 'A pacifist gunman with a $$60 billion bounty wanders a desert planet trying to avoid violence.' },
  { id: 61, malId: 467, name: 'Ghost in the Shell: SAC',         image: '', years: '2002–2003', genres: ['Sci-Fi', 'Thriller'],    rating: 8.5, desc: 'A cyborg officer leads a counter-cyberterrorist unit in a future Japan wrestling with identity.' },
  { id: 62, malId: 223, name: 'Dragon Ball',                     image: '', years: '1986–1989', genres: ['Action', 'Adventure'],   rating: 8.1, desc: 'Young Goku embarks on a quest to find the seven Dragon Balls alongside new friends.' },
  { id: 63, malId: 355, name: 'Slam Dunk',                       image: '', years: '1993–1996', genres: ['Sports', 'Comedy'],      rating: 8.6, desc: 'A delinquent joins his high school basketball team and discovers a real passion for the sport.' },
]

const POOL_TABS = [
  { key: 'action',       label: 'Action',        ids: new Set([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]) },
  { key: 'isekai',       label: 'Isekai',         ids: new Set([16,17,18,19,20,21,22,23,24,25,26,27]) },
  { key: 'psychological',label: 'Psychological',  ids: new Set([28,29,30,31,32,33,34,35,36,37,38,39]) },
  { key: 'romance',      label: 'Romance',        ids: new Set([40,41,42,43,44,45,46,47,48,49,50,51]) },
  { key: 'classics',     label: 'Classics',       ids: new Set([52,53,54,55,56,57,58,59,60,61,62,63]) },
]

interface Props { onHome: () => void }

export default function AnimeTierList({ onHome }: Props) {
  const imageMap = useAnimeImages(ANIME)
  return (
    <MediaTierList
      items={ANIME as any}
      imageMap={imageMap}
      onHome={onHome}
      shareFilename="anime-tierlist"
      poolTabs={POOL_TABS}
    />
  )
}
