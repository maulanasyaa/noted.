import { useContext } from 'react';
import NotesContext from '../contexts/NotesContext';

function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes harus dipakai di dalam NotesProvider');
  }
  return context;
}

export default useNotes;
