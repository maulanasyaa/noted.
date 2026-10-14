import { useCallback, useEffect, useMemo, useState } from 'react';

import translations from '../utils/translations';
import LanguageContext from './LanguageContext';

const LANGUAGE_KEY = 'language';

function readSavedLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return saved === 'id' || saved === 'en' ? saved : null;
  } catch {
    return null;
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch {
    // do nothing
  }
}

// Fungsi terjemahan: mengganti placeholder [key] dengan nilai dari vars.
function translate(language, key, vars) {
  const entry = translations[key];
  if (!entry) return key;

  const text = entry[language];

  if (!vars) return text;

  return text.replace(/\[(\w+)\]/g, (match, name) =>
    name in vars ? String(vars[name]) : match
  );
}

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readSavedLanguage);

  useEffect(() => {
    const activeLanguage = language ?? 'id';
    saveLanguage(activeLanguage);
    document.documentElement.lang = activeLanguage;
    document.title = translate(activeLanguage, 'document_title');
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
  }, []);

  // Bahasa default 'id' bila localStorage belum berisi nilai valid.
  const t = useCallback(
    (key, vars) => translate(language ?? 'id', key, vars),
    [language]
  );

  const value = useMemo(
    () => ({ language: language ?? 'id', toggleLanguage, t }),
    [language, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
