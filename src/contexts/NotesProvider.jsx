import { useCallback, useEffect, useState } from 'react';

import useAuth from '../hooks/useAuth';
import {
  addNote as addNoteData,
  archiveNote as archiveNoteData,
  deleteNote as deleteNoteData,
  getActiveNotes as getActiveNotesData,
  getArchivedNotes as getArchivedNotesData,
  getNote as getNoteData,
  unarchiveNote as unarchiveNoteData,
} from '../utils/network-data';
import NotesContext from './NotesContext';

function NotesProvider({ children }) {
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);

  // auth
  const { user } = useAuth();
  const userId = user?.id;

  // initial load notes data
  useEffect(() => {
    const loadNotes = async () => {
      if (!userId) {
        setActiveNotes([]);
        setArchivedNotes([]);
        return;
      }

      const active = await getActiveNotesData();
      const archived = await getArchivedNotesData();

      if (!active.error) setActiveNotes(active.data);
      if (!archived.error) setArchivedNotes(archived.data);
    };

    loadNotes();
  }, [userId]);

  // for refresh notes after actions
  const refreshNotes = useCallback(async () => {
    const [active, archived] = await Promise.all([
      getActiveNotesData(),
      getArchivedNotesData(),
    ]);

    if (!active.error) setActiveNotes(active.data);
    if (!archived.error) setArchivedNotes(archived.data);
  }, []);

  // add note
  const addNote = async (data) => {
    const result = await addNoteData(data);
    if (!result.error) {
      await refreshNotes();
    }

    return result;
  };

  // get note for detail page
  const getNote = async (id) => {
    const note = await getNoteData(id);
    if (!note.error) {
      return note.data;
    }
  };

  // archive note
  const archiveNote = async (id) => {
    const result = await archiveNoteData(id);
    if (!result.error) {
      await refreshNotes();
    }
    return result;
  };

  // unarchive note
  const unarchiveNote = async (id) => {
    const result = await unarchiveNoteData(id);
    if (!result.error) {
      await refreshNotes();
    }
    return result;
  };

  // delete note
  const deleteNote = async (id) => {
    const result = await deleteNoteData(id);
    if (!result.error) {
      await refreshNotes();
    }
    return result;
  };

  const value = {
    activeNotes,
    archivedNotes,
    getNote,
    addNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export default NotesProvider;
