import MediaTierList from './MediaTierList'
import { useMovieImages } from '../hooks/useMovieImages'

const MOVIES = [
  // ── Drama (ids used in pool tab: 1,2,5,7,19,21,23,24,32,34,38,39,42,43,44,47,48,51,52,53,55) ──
  { id: 1,  name: 'The Shawshank Redemption',              image: '', years: '1994', genres: ['Drama'],              rating: 9.3, desc: 'A banker sentenced to life in Shawshank prison befriends a fellow prisoner and finds creative ways to keep his sanity.' },
  { id: 2,  name: 'The Godfather',                         image: '', years: '1972', genres: ['Crime', 'Drama'],     rating: 9.2, desc: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.' },
  { id: 5,  name: "Schindler's List",                      image: '', years: '1993', genres: ['Drama', 'History'],   rating: 9.0, desc: 'In German-occupied Poland during WWII, industrialist Oskar Schindler saves more than a thousand Jewish refugees.' },
  { id: 7,  name: 'Forrest Gump',                          image: '', years: '1994', genres: ['Drama', 'Comedy'],    rating: 8.8, desc: 'The life journey of a kind-hearted man from Alabama who influences several historical events.' },
  { id: 19, name: 'Gladiator',                             image: '', years: '2000', genres: ['Action', 'Drama'],    rating: 8.5, desc: 'A former Roman general sets out to exact vengeance against the corrupt emperor who murdered his family.' },
  { id: 21, name: 'Whiplash',                              image: '', years: '2014', genres: ['Drama', 'Music'],     rating: 8.5, desc: 'A promising young drummer is pushed to his limits by an abusive instructor at a music conservatory.' },
  { id: 23, name: 'The Grand Budapest Hotel',              image: '', years: '2014', genres: ['Comedy', 'Drama'],    rating: 8.1, desc: 'A writer encounters the owner of an aging European hotel and hears of his experiences in the 1930s.' },
  { id: 24, name: 'La La Land',                            image: '', years: '2016', genres: ['Romance', 'Musical'], rating: 8.0, desc: 'A jazz musician and an aspiring actress fall in love while chasing their dreams in Los Angeles.' },
  { id: 32, name: '1917',                                  image: '', years: '2019', genres: ['War', 'Drama'],       rating: 8.2, desc: 'Two British soldiers are sent on a mission to deliver a message that will save 1,600 men from a deadly trap.' },
  { id: 34, name: 'The Revenant',                          image: '', years: '2015', genres: ['Drama', 'Adventure'], rating: 8.0, desc: 'A frontiersman fights for survival after being mauled by a bear and left for dead.' },
  { id: 38, name: 'Eternal Sunshine of the Spotless Mind', image: '', years: '2004', genres: ['Romance', 'Sci-Fi'],  rating: 8.3, desc: 'A couple undergoes a medical procedure to have each other erased from their memories.' },
  { id: 39, name: 'Saving Private Ryan',                   image: '', years: '1998', genres: ['War', 'Drama'],       rating: 8.6, desc: 'A group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed.' },
  { id: 42, name: 'City of God',                           image: '', years: '2002', genres: ['Crime', 'Drama'],     rating: 8.6, desc: "In the slums of Rio de Janeiro, two kids' paths diverge — one becomes a photographer, the other a drug dealer." },
  { id: 43, name: 'The Truman Show',                       image: '', years: '1998', genres: ['Drama', 'Sci-Fi'],    rating: 8.1, desc: 'An insurance salesman discovers his entire life is a reality TV show.' },
  { id: 44, name: 'Amélie',                                image: '', years: '2001', genres: ['Romance', 'Comedy'],  rating: 8.3, desc: 'Amélie decides to improve the lives of those around her while searching for love herself.' },
  { id: 47, name: 'A Beautiful Mind',                      image: '', years: '2001', genres: ['Drama', 'Biography'], rating: 8.2, desc: 'After math prodigy John Nash develops paranoid schizophrenia, he recovers and wins the Nobel Prize.' },
  { id: 48, name: '12 Angry Men',                          image: '', years: '1957', genres: ['Drama'],              rating: 9.0, desc: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider.' },
  { id: 51, name: 'Good Will Hunting',                     image: '', years: '1997', genres: ['Drama'],              rating: 8.3, desc: 'A janitor at MIT has a gift for mathematics but needs help from a therapist to find his path in life.' },
  { id: 52, name: 'There Will Be Blood',                   image: '', years: '2007', genres: ['Drama'],              rating: 8.2, desc: 'A story of family, religion, hatred, and madness, centered on an oil prospector in early 20th century California.' },
  { id: 53, name: 'Apocalypse Now',                        image: '', years: '1979', genres: ['War', 'Drama'],       rating: 8.5, desc: 'During the Vietnam War, a soldier is sent on a mission into Cambodia to assassinate a rogue Special Forces colonel.' },
  { id: 55, name: 'Casablanca',                            image: '', years: '1942', genres: ['Drama', 'Romance'],   rating: 8.5, desc: 'A cynical American expatriate encounters a former lover and must choose between love and virtue in WWII.' },

  // ── Action / Sci-Fi (ids: 3,8,9,12,15,16,22,26,27,28,29,30,33,56,57,58,59,60) ──
  { id: 3,  name: 'The Dark Knight',                       image: '', years: '2008', genres: ['Action', 'Crime'],    rating: 9.0, desc: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.' },
  { id: 8,  name: 'Inception',                             image: '', years: '2010', genres: ['Sci-Fi', 'Thriller'], rating: 8.8, desc: "A thief who enters people's dreams to steal secrets is offered a chance to have his criminal record erased." },
  { id: 9,  name: 'The Matrix',                            image: '', years: '1999', genres: ['Sci-Fi', 'Action'],   rating: 8.7, desc: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.' },
  { id: 12, name: 'Interstellar',                          image: '', years: '2014', genres: ['Sci-Fi', 'Drama'],    rating: 8.7, desc: "A team of explorers travel through a wormhole in space to ensure humanity's survival." },
  { id: 15, name: 'Avengers: Endgame',                     image: '', years: '2019', genres: ['Action', 'Sci-Fi'],   rating: 8.4, desc: 'After half of all life is wiped out by Thanos, the Avengers assemble once more to undo his actions.' },
  { id: 16, name: 'Joker',                                 image: '', years: '2019', genres: ['Drama', 'Thriller'],  rating: 8.4, desc: 'A failed stand-up comedian spirals into madness, becoming the iconic villain of Gotham City.' },
  { id: 22, name: 'Mad Max: Fury Road',                    image: '', years: '2015', genres: ['Action', 'Sci-Fi'],   rating: 8.1, desc: 'In a post-apocalyptic wasteland, Max teams with a mysterious woman to flee from a warlord.' },
  { id: 26, name: 'Dune',                                  image: '', years: '2021', genres: ['Sci-Fi', 'Adventure'],rating: 8.0, desc: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset." },
  { id: 27, name: 'Everything Everywhere All at Once',     image: '', years: '2022', genres: ['Sci-Fi', 'Action'],   rating: 7.8, desc: 'A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save the world.' },
  { id: 28, name: 'Oppenheimer',                           image: '', years: '2023', genres: ['Drama', 'History'],   rating: 8.3, desc: 'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.' },
  { id: 29, name: 'Top Gun: Maverick',                     image: '', years: '2022', genres: ['Action', 'Drama'],    rating: 8.3, desc: 'After 30 years, Maverick is back as a top instructor pushing graduates for a special mission.' },
  { id: 30, name: 'Spider-Man: Into the Spider-Verse',     image: '', years: '2018', genres: ['Animation', 'Action'],rating: 8.4, desc: 'Teen Miles Morales becomes Spider-Man and must team up with his counterparts from other dimensions.' },
  { id: 33, name: 'Blade Runner 2049',                     image: '', years: '2017', genres: ['Sci-Fi', 'Drama'],    rating: 8.0, desc: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Deckard." },
  { id: 56, name: '2001: A Space Odyssey',                 image: '', years: '1968', genres: ['Sci-Fi'],             rating: 8.3, desc: 'Humanity finds a mysterious artifact buried beneath the lunar surface and sets off to find its origins.' },
  { id: 57, name: 'Alien',                                 image: '', years: '1979', genres: ['Sci-Fi', 'Horror'],   rating: 8.5, desc: 'The crew of a commercial spacecraft encounter a deadly extraterrestrial life form.' },
  { id: 58, name: 'Terminator 2: Judgment Day',            image: '', years: '1991', genres: ['Action', 'Sci-Fi'],   rating: 8.6, desc: 'A cyborg from the future is sent back in time to protect John Connor from an advanced killing machine.' },
  { id: 59, name: 'Arrival',                               image: '', years: '2016', genres: ['Sci-Fi', 'Drama'],    rating: 7.9, desc: 'A linguist is recruited by the military to communicate with alien lifeforms after twelve mysterious spacecraft appear.' },
  { id: 60, name: 'The Martian',                           image: '', years: '2015', genres: ['Sci-Fi', 'Adventure'],rating: 8.0, desc: 'An astronaut becomes stranded on Mars and uses his ingenuity to signal that he is alive.' },

  // ── Crime / Thriller (ids: 4,6,10,11,13,14,20,25,31,35,36,37,40,41,49,50,54,61,62,63,64,65) ──
  { id: 4,  name: 'Pulp Fiction',                          image: '', years: '1994', genres: ['Crime', 'Drama'],     rating: 8.9, desc: 'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales.' },
  { id: 6,  name: 'The Lord of the Rings: The Fellowship of the Ring', image: '', years: '2001', genres: ['Fantasy', 'Adventure'], rating: 8.8, desc: 'A meek Hobbit sets out to destroy an ancient ring that threatens to dominate all life in Middle Earth.' },
  { id: 10, name: 'Goodfellas',                            image: '', years: '1990', genres: ['Crime', 'Drama'],     rating: 8.7, desc: "The story of Henry Hill and his life in the mob." },
  { id: 11, name: 'Fight Club',                            image: '', years: '1999', genres: ['Drama', 'Thriller'],  rating: 8.8, desc: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.' },
  { id: 13, name: 'The Silence of the Lambs',              image: '', years: '1991', genres: ['Horror', 'Thriller'], rating: 8.6, desc: 'A young FBI cadet must confide in an incarcerated killer to catch another serial killer.' },
  { id: 14, name: 'Parasite',                              image: '', years: '2019', genres: ['Thriller', 'Drama'],  rating: 8.5, desc: 'Greed and class discrimination threaten the symbiotic relationship between two families.' },
  { id: 20, name: 'The Departed',                          image: '', years: '2006', genres: ['Crime', 'Thriller'],  rating: 8.5, desc: 'An undercover cop and a mole in the police attempt to identify each other in a criminal organization.' },
  { id: 25, name: 'Get Out',                               image: '', years: '2017', genres: ['Horror', 'Thriller'], rating: 7.7, desc: "A Black man visits his white girlfriend's parents for the weekend, where disturbing discoveries unfold." },
  { id: 31, name: 'Knives Out',                            image: '', years: '2019', genres: ['Mystery', 'Comedy'],  rating: 7.9, desc: 'A detective investigates the death of a crime novelist at his estate, uncovering family secrets.' },
  { id: 35, name: 'Gone Girl',                             image: '', years: '2014', genres: ['Thriller', 'Drama'],  rating: 8.1, desc: "With his wife's disappearance making headlines, a man sees the spotlight turned on him." },
  { id: 36, name: 'No Country for Old Men',                image: '', years: '2007', genres: ['Crime', 'Thriller'],  rating: 8.2, desc: 'Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong.' },
  { id: 37, name: 'The Social Network',                    image: '', years: '2010', genres: ['Drama', 'Biography'], rating: 7.7, desc: 'As Mark Zuckerberg creates Facebook, he is sued by the twins who claimed he stole their idea.' },
  { id: 40, name: 'The Prestige',                          image: '', years: '2006', genres: ['Thriller', 'Mystery'],rating: 8.5, desc: 'Two stage magicians engage in a competitive rivalry that leads to destructive consequences.' },
  { id: 41, name: 'Memento',                               image: '', years: '2000', genres: ['Mystery', 'Thriller'],rating: 8.4, desc: "A man with short-term memory loss attempts to track down his wife's murderer." },
  { id: 49, name: 'Oldboy',                                image: '', years: '2003', genres: ['Thriller', 'Mystery'],rating: 8.4, desc: 'After being kidnapped and imprisoned for fifteen years, a man is given five days to find his captor.' },
  { id: 50, name: 'Hereditary',                            image: '', years: '2018', genres: ['Horror', 'Drama'],    rating: 7.3, desc: 'A grieving family is haunted by their ancestry as their mother passes and releases a dark presence.' },
  { id: 54, name: 'Taxi Driver',                           image: '', years: '1976', genres: ['Crime', 'Drama'],     rating: 8.2, desc: 'A mentally unstable veteran works as a night-time taxi driver in New York and dreams of cleaning up the city.' },
  { id: 61, name: 'Se7en',                                 image: '', years: '1995', genres: ['Crime', 'Thriller'],  rating: 8.6, desc: 'Two detectives hunt a serial killer who uses the seven deadly sins as his motives.' },
  { id: 62, name: 'Heat',                                  image: '', years: '1995', genres: ['Crime', 'Thriller'],  rating: 8.3, desc: 'A group of professional bank robbers start to feel the heat from the LAPD.' },
  { id: 63, name: 'The Shining',                           image: '', years: '1980', genres: ['Horror', 'Thriller'], rating: 8.4, desc: 'A family heads to an isolated hotel for the winter where an evil presence influences the father into violence.' },
  { id: 64, name: 'A Clockwork Orange',                    image: '', years: '1971', genres: ['Crime', 'Sci-Fi'],    rating: 8.3, desc: 'In a near-future Britain, a gang leader is jailed and volunteers for an experimental aversion therapy.' },
  { id: 65, name: 'Zodiac',                                image: '', years: '2007', genres: ['Crime', 'Thriller'],  rating: 7.7, desc: 'A political cartoonist, a crime reporter, and a detective become obsessed with tracking down the Zodiac Killer.' },

  // ── Animation (ids: 17,18,45,46,66,67,68,69,70,71,72) ──
  { id: 17, name: 'The Lion King',                         image: '', years: '1994', genres: ['Animation', 'Drama'],  rating: 8.5, desc: 'A young lion prince flees his kingdom after the murder of his father, only to learn the true meaning of responsibility.' },
  { id: 18, name: 'Toy Story',                             image: '', years: '1995', genres: ['Animation', 'Comedy'], rating: 8.3, desc: 'A cowboy doll is threatened when a new spaceman toy becomes the most popular toy in his world.' },
  { id: 45, name: 'Spirited Away',                         image: '', years: '2001', genres: ['Animation', 'Fantasy'],rating: 8.6, desc: 'A 10-year-old girl wanders into a world ruled by gods, spirits, and monsters.' },
  { id: 46, name: 'Princess Mononoke',                     image: '', years: '1997', genres: ['Animation', 'Fantasy'],rating: 8.4, desc: 'Ashitaka encounters a young woman who fights to protect the forest from humanity.' },
  { id: 66, name: 'WALL-E',                                image: '', years: '2008', genres: ['Animation', 'Sci-Fi'], rating: 8.4, desc: 'In the distant future, a small waste-collecting robot inadvertently embarks on a space journey.' },
  { id: 67, name: 'Up',                                    image: '', years: '2009', genres: ['Animation', 'Adventure'],rating: 8.3, desc: 'By tying thousands of balloons to his house, 78-year-old Carl Fredricksen sets out to fulfil a promise.' },
  { id: 68, name: 'Finding Nemo',                          image: '', years: '2003', genres: ['Animation', 'Comedy'], rating: 8.2, desc: 'After his son is captured in the Great Barrier Reef, an overprotective fish goes on a journey to rescue him.' },
  { id: 69, name: 'Inside Out',                            image: '', years: '2015', genres: ['Animation', 'Drama'],  rating: 8.2, desc: 'After young Riley is uprooted from her life, her Emotions — led by Joy — try to guide her through the transition.' },
  { id: 70, name: "Howl's Moving Castle",                  image: '', years: '2004', genres: ['Animation', 'Fantasy'],rating: 8.6, desc: 'A young woman is cursed by a witch and transformed into an old woman, finding refuge in a moving castle.' },
  { id: 71, name: 'Akira',                                 image: '', years: '1988', genres: ['Animation', 'Sci-Fi'], rating: 8.0, desc: 'A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic.' },
  { id: 72, name: 'The Iron Giant',                        image: '', years: '1999', genres: ['Animation', 'Sci-Fi'], rating: 8.1, desc: 'A young boy befriends a giant robot that fell from space during the Cold War era.' },
]

const POOL_TABS = [
  { key: 'drama',     label: 'Drama',         ids: new Set([1,2,5,7,19,21,23,24,32,34,38,39,42,43,44,47,48,51,52,53,55]) },
  { key: 'action',    label: 'Action / Sci-Fi',ids: new Set([3,8,9,12,15,16,22,26,27,28,29,30,33,56,57,58,59,60]) },
  { key: 'crime',     label: 'Crime & Thriller',ids: new Set([4,6,10,11,13,14,20,25,31,35,36,37,40,41,49,50,54,61,62,63,64,65]) },
  { key: 'animation', label: 'Animation',      ids: new Set([17,18,45,46,66,67,68,69,70,71,72]) },
]

interface Props { onHome: () => void }

export default function MovieTierList({ onHome }: Props) {
  const imageMap = useMovieImages(MOVIES)
  return (
    <MediaTierList
      items={MOVIES as any}
      imageMap={imageMap}
      onHome={onHome}
      shareFilename="movie-tierlist"
      poolTabs={POOL_TABS}
    />
  )
}
