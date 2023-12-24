import { useContext, useState, useEffect } from 'react'
import { TranslateContext, LanguageContext } from './translator'

export default function Translate({ children: value }: { children: string }): string {
  const language = useContext(LanguageContext)
  const handleTranslate = useContext(TranslateContext)
  const [translation, setTranslation] = useState(value)

  useEffect(() => {
    handleTranslate(value, setTranslation)
  }, [value, language])

  return translation
}
