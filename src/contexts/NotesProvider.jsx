import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);

  // auth
  const { user } = useAuth();
  const userId = user?.id;

  // initial load notes data
  useEffect(() => {
    const loadNotes = async () => {
      if (!userId) {
        setActiveNotes([]);
        setArchivedNotes([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const active = await getActiveNotesData();
      const archived = await getArchivedNotesData();

      if (!active.error) setActiveNotes(active.data);
      if (!archived.error) setArchivedNotes(archived.data);

      setIsLoading(false);
    };

    loadNotes();
  }, [userId]);

  // for refresh notes after actions
  const refreshNotes = useCallback(async () => {
    setIsLoading(true);

    const [active, archived] = await Promise.all([
      getActiveNotesData(),
      getArchivedNotesData(),
    ]);

    if (!active.error) setActiveNotes(active.data);
    if (!archived.error) setArchivedNotes(archived.data);

    setIsLoading(false);
  }, []);

  // add note
  const addNote = useCallback(
    async (data) => {
      const result = await addNoteData(data);
      if (!result.error) {
        await refreshNotes();
      }

      return result;
    },
    [refreshNotes]
  );

  // get note for detail page
  const getNote = useCallback(async (id) => {
    return getNoteData(id);
  }, []);

  // archive note
  const archiveNote = useCallback(
    async (id) => {
      const result = await archiveNoteData(id);
      if (!result.error) {
        await refreshNotes();
      }
      return result;
    },
    [refreshNotes]
  );

  // unarchive note
  const unarchiveNote = useCallback(
    async (id) => {
      const result = await unarchiveNoteData(id);
      if (!result.error) {
        await refreshNotes();
      }
      return result;
    },
    [refreshNotes]
  );

  // delete note
  const deleteNote = useCallback(
    async (id) => {
      const result = await deleteNoteData(id);
      if (!result.error) {
        await refreshNotes();
      }
      return result;
    },
    [refreshNotes]
  );

  const value = useMemo(
    () => ({
      activeNotes,
      archivedNotes,
      isLoading,
      getNote,
      addNote,
      deleteNote,
      archiveNote,
      unarchiveNote,
    }),
    [
      activeNotes,
      archivedNotes,
      isLoading,
      getNote,
      addNote,
      deleteNote,
      archiveNote,
      unarchiveNote,
    ]
  );

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export default NotesProvider;
