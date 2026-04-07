import { createContext, useContext } from 'react'
import type { Pokemon } from '../types/pokemon'

export const ModalContext = createContext<(pokemon: Pokemon) => void>(() => {})

export function useModal() {
  return useContext(ModalContext)
}
