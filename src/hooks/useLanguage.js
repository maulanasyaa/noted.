import { useContext } from 'react';

import LanguageContext from '../contexts/LanguageContext';

function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage harus dipakai di dalam LanguageProvider');
  }

  return context;
}

export default useLanguage;
