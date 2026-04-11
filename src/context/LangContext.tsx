import { createContext, useContext, useState } from 'react'
import type { Lang } from '../i18n'

interface LangCtx { lang: Lang; toggle: () => void }

const LangContext = createContext<LangCtx>({ lang: 'en', toggle: () => {} })

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LangContext.Provider value={{ lang, toggle: () => setLang(l => l === 'en' ? 'he' : 'en') }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() { return useContext(LangContext) }
