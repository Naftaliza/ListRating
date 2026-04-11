import MediaTierList from './MediaTierList'

const STEAM = (id: number) => `https://cdn.akamai.steamstatic.com/steam/apps/${id}/library_600x900.jpg`

const GAMES = [
  { id: 1,  name: 'Elden Ring',                      image: STEAM(1245620),  years: '2022', genres: ['RPG', 'Action'],           rating: 9.5, desc: 'An open world dark fantasy RPG featuring massive dungeons and boss encounters across the Lands Between.' },
  { id: 2,  name: 'Red Dead Redemption 2',           image: STEAM(1174180),  years: '2018', genres: ['Action', 'Adventure'],     rating: 9.7, desc: 'An epic tale of life in America\'s unforgiving heartland, following outlaw Arthur Morgan in 1899.' },
  { id: 3,  name: 'The Witcher 3: Wild Hunt',        image: STEAM(292030),   years: '2015', genres: ['RPG', 'Adventure'],        rating: 9.3, desc: 'Geralt of Rivia hunts for his adopted daughter across a vast open world ravaged by war.' },
  { id: 4,  name: 'Cyberpunk 2077',                  image: STEAM(1091500),  years: '2020', genres: ['RPG', 'Action'],           rating: 8.5, desc: 'In Night City, a mercenary becomes embroiled in a conspiracy for an immortality implant.' },
  { id: 5,  name: 'Grand Theft Auto V',              image: STEAM(271590),   years: '2013', genres: ['Action', 'Open World'],   rating: 9.3, desc: 'Three very different criminals team up for a series of heists across Los Santos.' },
  { id: 6,  name: 'Dark Souls III',                  image: STEAM(374320),   years: '2016', genres: ['Action', 'RPG'],          rating: 9.0, desc: 'In the world of Lothric, you must link the flame or let the Age of Dark begin, facing terrifying undead enemies.' },
  { id: 7,  name: 'God of War',                      image: STEAM(1593500),  years: '2018', genres: ['Action', 'Adventure'],    rating: 9.4, desc: 'Kratos and his son Atreus journey through the brutal Norse mythological world of the dead.' },
  { id: 8,  name: 'Hollow Knight',                   image: STEAM(367520),   years: '2017', genres: ['Platformer', 'Action'],   rating: 9.1, desc: 'Forge your own path in a vast underground kingdom of insects and heroes in this challenging Metroidvania.' },
  { id: 9,  name: 'Portal 2',                        image: STEAM(620),      years: '2011', genres: ['Puzzle', 'Comedy'],       rating: 9.7, desc: 'Waking up in a mysterious laboratory, your only companion is GLaDOS as you solve physics-bending portal puzzles.' },
  { id: 10, name: 'Hades',                           image: STEAM(1145360),  years: '2020', genres: ['Roguelike', 'Action'],    rating: 9.3, desc: 'Battle out of the Underworld in this rogue-like dungeon crawler with a rich mythological story.' },
  { id: 11, name: 'Stardew Valley',                  image: STEAM(413150),   years: '2016', genres: ['Simulation', 'RPG'],      rating: 9.5, desc: 'You\'ve inherited a run-down farm in a charming valley. Time to grow crops, meet locals, and explore mysterious caves.' },
  { id: 12, name: 'Terraria',                        image: STEAM(105600),   years: '2011', genres: ['Sandbox', 'Adventure'],   rating: 9.5, desc: 'Dig, fight, explore, build in a 2D world with limitless crafting possibilities and over 300 bosses and events.' },
  { id: 13, name: 'Baldur\'s Gate 3',                image: STEAM(1086940),  years: '2023', genres: ['RPG', 'Strategy'],        rating: 9.6, desc: 'Gather your party and embark on a journey in this award-winning D&D-based RPG set in the Forgotten Realms.' },
  { id: 14, name: 'Sekiro: Shadows Die Twice',       image: STEAM(814380),   years: '2019', genres: ['Action', 'RPG'],          rating: 9.1, desc: 'In Sengoku Japan, a shinobi seeks to rescue his lord and seek revenge on a samurai clan who took his arm.' },
  { id: 15, name: 'Celeste',                         image: STEAM(504230),   years: '2018', genres: ['Platformer'],             rating: 9.3, desc: 'Help Madeline survive her inner demons on her journey to the top of Celeste Mountain in this love letter to classic platformers.' },
  { id: 16, name: 'Persona 5 Royal',                 image: STEAM(1687950),  years: '2019', genres: ['RPG', 'JRPG'],           rating: 9.5, desc: 'Forced to transfer to a new school, Joker and the Phantom Thieves steal the hearts of corrupt adults.' },
  { id: 17, name: 'Resident Evil 4 Remake',          image: STEAM(2050650),  years: '2023', genres: ['Horror', 'Action'],       rating: 9.2, desc: 'US agent Leon S. Kennedy travels to rural Spain on a mission to rescue the President\'s kidnapped daughter.' },
  { id: 18, name: 'The Last of Us Part I',           image: STEAM(1888930),  years: '2013', genres: ['Action', 'Drama'],        rating: 9.5, desc: 'Joel escorts Ellie across a post-apocalyptic United States in a world ravaged by a mutant fungal infection.' },
  { id: 19, name: 'Horizon Zero Dawn',               image: STEAM(1151640),  years: '2017', genres: ['Action', 'RPG'],          rating: 8.7, desc: 'A hunter explores a lush post-apocalyptic open world overrun by robotic creatures of unknown origin.' },
  { id: 20, name: 'Marvel\'s Spider-Man Remastered', image: STEAM(1817070),  years: '2018', genres: ['Action', 'Adventure'],    rating: 9.0, desc: 'Be the experienced Peter Parker as you fight crime in a sprawling open-world New York City.' },
  { id: 21, name: 'Half-Life 2',                     image: STEAM(220),      years: '2004', genres: ['FPS', 'Sci-Fi'],          rating: 9.7, desc: 'Gordon Freeman wakes up 20 years after the resonance cascade to find Earth conquered by the Combine empire.' },
  { id: 22, name: 'Undertale',                       image: STEAM(391540),   years: '2015', genres: ['RPG', 'Comedy'],          rating: 9.3, desc: 'A child falls into the Underground and must navigate a world of monsters, where your choices determine the fate of all.' },
  { id: 23, name: 'Cuphead',                         image: STEAM(268910),   years: '2017', genres: ['Platformer', 'Action'],   rating: 8.7, desc: 'Inspired by 1930s cartoons, Cuphead must battle bizarre bosses to repay his debt to the Devil.' },
  { id: 24, name: 'Death Stranding',                 image: STEAM(1190460),  years: '2019', genres: ['Action', 'Sci-Fi'],       rating: 8.2, desc: 'In a disconnected post-apocalyptic America, Sam Porter Bridges must reconnect isolated cities.' },
  { id: 25, name: 'Disco Elysium',                   image: STEAM(632470),   years: '2019', genres: ['RPG', 'Adventure'],       rating: 9.0, desc: 'A detective with no memory must solve a murder while reconciling his fractured psyche and past.' },
  { id: 26, name: 'Monster Hunter: World',           image: STEAM(582010),   years: '2018', genres: ['Action', 'RPG'],          rating: 9.1, desc: 'As a hunter, you\'ll play a major role in an ecological research mission to a lush and living new world.' },
  { id: 27, name: 'Doom Eternal',                    image: STEAM(782330),   years: '2020', genres: ['FPS', 'Action'],          rating: 9.0, desc: 'The Doom Slayer returns to Hell with a power-fantasy barrage of weapons and demonic enemies.' },
  { id: 28, name: 'Divinity: Original Sin 2',        image: STEAM(435150),   years: '2017', genres: ['RPG', 'Strategy'],        rating: 9.4, desc: 'A power struggle is brewing in Rivellon. The Divine is dead, and with the void threatening to swallow the world, you must become the Divine.' },
  { id: 29, name: 'NieR: Automata',                  image: STEAM(524220),   years: '2017', genres: ['Action', 'RPG'],          rating: 9.0, desc: 'The distant future — proxy wars between machine lifeforms and android soldiers rage on a desolate Earth.' },
  { id: 30, name: 'Mass Effect Legendary Edition',   image: STEAM(1328670),  years: '2007', genres: ['RPG', 'Sci-Fi'],          rating: 9.6, desc: 'Commander Shepard leads the fight against a galactic threat across three legendary RPG adventures.' },
  { id: 31, name: 'The Elder Scrolls V: Skyrim',     image: STEAM(489830),   years: '2011', genres: ['RPG', 'Open World'],      rating: 9.2, desc: 'A legendary dragonborn hero must prevent the apocalypse by defeating Alduin the World Eater in ancient Skyrim.' },
  { id: 32, name: 'Ori and the Will of the Wisps',   image: STEAM(1057090),  years: '2020', genres: ['Platformer', 'Action'],   rating: 9.4, desc: 'Embark on an emotional journey into a world of dazzling wonder and constant danger in this visually stunning sequel.' },
  { id: 33, name: 'It Takes Two',                    image: STEAM(1426210),  years: '2021', genres: ['Co-op', 'Adventure'],     rating: 9.0, desc: 'A couple on the verge of divorce are transformed into dolls and must work together to get back to their human bodies.' },
  { id: 34, name: 'Fallout 4',                       image: STEAM(377160),   years: '2015', genres: ['RPG', 'Open World'],      rating: 8.7, desc: 'The sole survivor of Vault 111 emerges to find a post-apocalyptic Commonwealth in ruins 200 years after nuclear war.' },
  { id: 35, name: 'Control',                         image: STEAM(870780),   years: '2019', genres: ['Action', 'Sci-Fi'],       rating: 8.7, desc: 'A corruptive presence has invaded the Federal Bureau of Control — only Jesse Faden can reclaim what has been lost.' },
]

interface Props { onHome: () => void }

export default function GameTierList({ onHome }: Props) {
  return <MediaTierList items={GAMES} imageMap={{}} onHome={onHome} shareFilename="games-tierlist" />
}
