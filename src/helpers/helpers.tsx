import { useCallback } from 'react'
import { CacheProvider, TranslationHandler } from '../types/types'

export const defaultHandler: TranslationHandler = () => { }

export const useCachedTranslation = (to: string, cacheProvider?: CacheProvider) => {
    return useCallback((value: string): string | undefined => {
        return cacheProvider?.get(to, value)
    }, [to, cacheProvider])
}

export const useSetCachedTranslation = (to: string, cacheProvider?: CacheProvider) => {
    return useCallback((value: string, translation: string): void => {
        cacheProvider?.set(to, value, translation)
    }, [to, cacheProvider])
}

// export const useGoogleTranslation = (from: string, to: string, googleApiKey: string) => {
//     return useCallback(async (value: string): Promise<string | undefined> => {
//         try {
//             const response = await fetch(
//                 `https://translation.googleapis.com/language/translate/v2?source=${from}&target=${to}&key=${googleApiKey}&q=${value}&format=text`
//             )

//             const jsonResponse = await response.json()

//             return jsonResponse.data.translations[0].translatedText
//         } catch (e) {
//             return undefined
//         }
//     }, [from, to, googleApiKey])
// }

export const useGoogleTranslation = (from: string, to: string, googleApiKey: string) => {
    return useCallback(async (value: string): Promise<string | undefined> => {
        try {
            const response = await fetch('https://translation.googleapis.com/language/translate/v2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${googleApiKey}`,
                },
                body: JSON.stringify({
                    q: value,
                    source: from,
                    target: to,
                    format: 'text',
                }),
            })

            const jsonResponse = await response.json()

            return jsonResponse.data.translations[0].translatedText
        } catch (e) {
            return undefined
        }
    }, [from, to, googleApiKey])
}

export const useHandleTranslationAsync = (to: string, from: string, getCachedTranslation: any, getGoogleTranslation: any, setCachedTranslation: any) => {
    return useCallback(async (value: string, setTranslation: (translation: string) => void) => {
        if (to === from) {
            setTranslation(value)
            return
        }

        const cachedTranslation = getCachedTranslation(value)
        if (cachedTranslation) {
            setTranslation(cachedTranslation)
            return
        }

        const translatedText = await getGoogleTranslation(value)
        if (translatedText) {
            setCachedTranslation(value, translatedText)
            setTranslation(translatedText)
            return
        }

        setTranslation(value)
    }, [to, from, getCachedTranslation, getGoogleTranslation, setCachedTranslation])
}