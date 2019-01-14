import React from 'react'

const { useState, useContext } = React as any  

const translations: Record<string, Record<string, string>> = {
  en: {
    salutation: 'Hello, ladies and gentlemen!'
  },
  de: {
    salutation: 'Hallo, meine Damen und Herren!'
  },
  fr: {
    salutation: 'Salut, Mesdames, Messieurs!'
  }
}

const LocaleCtx = React.createContext('en')

type AppProps = {
  defaultLocale: string
}

function App(props: AppProps) {
  const [locale, setLocale] = useState(() => props.defaultLocale || 'en')

  return (
    <LocaleCtx.Provider value={locale}>
      <div>
        <label htmlFor="lang-selector">Select language: </label>
        <select id="lang-selector" value={locale} onChange={(ev: any) => setLocale(ev.target.value)}>
          <option value="en">en</option>
          <option value="fr">fr</option>
          <option value="de">de</option>
        </select>
        <LocaleText id="salutation"/>
      </div>
    </LocaleCtx.Provider>
  )
}

interface LocaleTextProps {
  id: string
}

function LocaleText(props: LocaleTextProps) {
  const locale = useContext(LocaleCtx)

  return (
    <p>
      { translations[locale][props.id] }
    </p>
  )
}

export default <App defaultLocale="en"/>
