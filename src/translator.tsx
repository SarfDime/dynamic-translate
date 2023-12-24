import React, {createContext} from 'react'
import { TranslationHandler, TranslatorProps } from './types/types'
import { defaultHandler, useCachedTranslation, useGoogleTranslation, useHandleTranslationAsync, useSetCachedTranslation } from './helpers/helpers'

export const TranslateContext = createContext<TranslationHandler>(defaultHandler)

export const LanguageContext = createContext<string>('en')

export default function Translator({to, from, cacheProvider, children, googleApiKey}: TranslatorProps): JSX.Element {
  const getCachedTranslation = useCachedTranslation(to, cacheProvider)
  const setCachedTranslation = useSetCachedTranslation(to, cacheProvider)
  const getGoogleTranslation = useGoogleTranslation(from, to, googleApiKey)
  const handleTranslationAsync = useHandleTranslationAsync(to, from, getCachedTranslation, getGoogleTranslation, setCachedTranslation)

  return (
    <TranslateContext.Provider value={handleTranslationAsync}>
      <LanguageContext.Provider value={to}>{children}</LanguageContext.Provider>
    </TranslateContext.Provider>
  )
}
