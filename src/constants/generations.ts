export interface Generation {
  id: number
  label: string
  offset: number
  limit: number
}

export const GENERATIONS: Generation[] = [
  { id: 1, label: 'Gen I',   offset: 0,   limit: 151 },
  { id: 2, label: 'Gen II',  offset: 151, limit: 100 },
  { id: 3, label: 'Gen III', offset: 251, limit: 135 },
  { id: 4, label: 'Gen IV',  offset: 386, limit: 107 },
  { id: 5, label: 'Gen V',   offset: 493, limit: 156 },
  { id: 6, label: 'Gen VI',  offset: 649, limit: 72  },
  { id: 7, label: 'Gen VII', offset: 721, limit: 88  },
  { id: 8, label: 'Gen VIII',offset: 809, limit: 96  },
  { id: 9, label: 'Gen IX',  offset: 905, limit: 120 },
]
