export type TranslationHandler = (value: string, setTranslation: (translation: string) => void) => void

export type CacheProvider = {
    get: (language: string, key: string) => string | undefined
    set: (language: string, key: string, translation: string) => void
}

export type TranslatorProps = {
    to: string
    from: string
    cacheProvider?: CacheProvider
    children: string
    googleApiKey: string
}