export type Lang = 'en' | 'he'

export interface Translations {
  home: string
  edit: string
  present: string
  share: string
  capturing: string
  copied: string
  reset: string
  unranked: string
  langToggle: string
  tierListMaker: string
  chooseTopic: string
  shuffle: string
  blindMode: string
  blindModeOff: string
  skip: string
  allRanked: string
  remaining: string
  topics: Record<string, { label: string; tagline: string }>
  tiers: { goat: string; elite: string; solid: string; decent: string; meh: string; weak: string; trash: string }
  tabs: Record<string, string>
}

const EN: Translations = {
  home: '⌂ Home',
  edit: '✎ Edit',
  present: '✦ Present',
  share: '📸 Share',
  capturing: '⏳ Capturing…',
  copied: '✓ Copied!',
  reset: '↺ Reset',
  unranked: 'Unranked',
  langToggle: 'עברית',
  tierListMaker: 'RankForge',
  chooseTopic: 'Choose a topic to start ranking',
  shuffle: '⇄ Shuffle',
  blindMode: '🙈 Blind',
  blindModeOff: '👁 Reveal',
  skip: 'Skip →',
  allRanked: 'All ranked!',
  remaining: 'remaining',
  topics: {
    pokemon:    { label: 'Pokémon',     tagline: 'Rank every Pokémon by generation' },
    tvseries:   { label: 'TV Series',   tagline: 'Rank your favourite shows' },
    movies:     { label: 'Movies',      tagline: 'Rate films from all eras' },
    videogames: { label: 'Video Games', tagline: 'Rank the greatest games ever made' },
    anime:      { label: 'Anime',       tagline: 'Rank your favourite series' },
  },
  tiers: {
    goat:   '🏆 GOAT',
    elite:  '⚡ Elite',
    solid:  '💪 Solid Pick',
    decent: '👍 Decent',
    meh:    '😐 Meh',
    weak:   '💀 Weak',
    trash:  "🗑️ Who Approved This",
  },
  tabs: {
    'Action':             'Action',
    'Action / Sci-Fi':    'Action / Sci-Fi',
    'Action / Adventure': 'Action / Adventure',
    'Crime & Thriller':   'Crime & Thriller',
    'Animation':          'Animation',
    'Drama':              'Drama',
    'Thriller / Sci-Fi':  'Thriller / Sci-Fi',
    'Comedy':             'Comedy',
    'Fantasy / Action':   'Fantasy / Action',
    'RPG':                'RPG',
    'Indie / Platformer': 'Indie / Platformer',
    'FPS / Multiplayer':  'FPS / Multiplayer',
    'Isekai':             'Isekai',
    'Psychological':      'Psychological',
    'Romance':            'Romance',
    'Classics':           'Classics',
  },
}

const HE: Translations = {
  home: '⌂ בית',
  edit: '✎ עריכה',
  present: '✦ תצוגה',
  share: '📸 שתף',
  capturing: '⏳ מצלם…',
  copied: '✓ הועתק!',
  reset: '↺ איפוס',
  unranked: 'לא מדורגים',
  langToggle: 'English',
  tierListMaker: 'RankForge',
  chooseTopic: 'בחר נושא כדי להתחיל לדרג',
  shuffle: '⇄ ערבב',
  blindMode: '🙈 עיוור',
  blindModeOff: '👁 חשוף',
  skip: '← דלג',
  allRanked: '!הכל דורג',
  remaining: 'נותרו',
  topics: {
    pokemon:    { label: 'פוקימון',      tagline: 'דרג כל פוקימון לפי דור' },
    tvseries:   { label: 'סדרות',        tagline: 'דרג את הסדרות האהובות עליך' },
    movies:     { label: 'סרטים',        tagline: 'דרג סרטים מכל התקופות' },
    videogames: { label: 'משחקי וידאו', tagline: 'דרג את משחקי הווידאו הגדולים' },
    anime:      { label: 'אנימה',        tagline: 'דרג את סדרות האנימה האהובות' },
  },
  tiers: {
    goat:   '🏆 הכי טוב',
    elite:  '⚡ עלית',
    solid:  '💪 סולידי',
    decent: '👍 סביר',
    meh:    '😐 ממוצע',
    weak:   '💀 חלש',
    trash:  "🗑️ מי אישר את זה",
  },
  tabs: {
    'Action':             'אקשן',
    'Action / Sci-Fi':    'אקשן / מד"ב',
    'Action / Adventure': 'אקשן / הרפתקה',
    'Crime & Thriller':   'פשע ומתח',
    'Animation':          'אנימציה',
    'Drama':              'דרמה',
    'Thriller / Sci-Fi':  'מתח / מד"ב',
    'Comedy':             'קומדיה',
    'Fantasy / Action':   'פנטזיה / אקשן',
    'RPG':                'תפקידים',
    'Indie / Platformer': 'אינדי / פלטפורמה',
    'FPS / Multiplayer':  'FPS / רב משתתפים',
    'Isekai':             'איסקאי',
    'Psychological':      'פסיכולוגי',
    'Romance':            'רומנטיקה',
    'Classics':           'קלאסיקות',
  },
}

export const translations: Record<Lang, Translations> = { en: EN, he: HE }
export function tr(lang: Lang): Translations { return translations[lang] }
