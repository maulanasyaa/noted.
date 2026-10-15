import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import ArchiveConfirmModal from '../components/ArchiveConfirmModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Header from '../components/Header';
import LogoutConfirmModal from '../components/LogoutConfirmModal';
import NoteList from '../components/NoteList';
import NotesLoading from '../components/NotesLoading';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';
import useLanguage from '../hooks/useLanguage';
import useNoteAction from '../hooks/useNoteAction';
import useNotes from '../hooks/useNotes';

function Archive() {
  const { deleteNote, unarchiveNote, archivedNotes, isLoading } = useNotes();
  const { t } = useLanguage();
  const { actionError, isSubmitting, executeAction } = useNoteAction();

  // state for search params
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const filteredNotes = archivedNotes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleKeywordChange = (value) => {
    setSearchParams(value ? { keyword: value } : {}, { replace: true });
  };

  // delete note
  const [confirmationDeleteModal, setConfirmationDeleteModal] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);

  const handleDeleteNote = (noteId) => {
    setNoteIdToDelete(noteId);
    setConfirmationDeleteModal(true);
  };

  const confirmDeleteNote = async () => {
    const result = await executeAction(deleteNote, noteIdToDelete);

    if (result.error) {
      return;
    }

    setConfirmationDeleteModal(false);
    setNoteIdToDelete(null);
  };

  // unarchive note
  const [confirmationUnarchiveModal, setConfirmationUnarchiveModal] =
    useState(false);
  const [noteIdToUnarchive, setNoteIdToUnarchive] = useState(null);

  const handleUnarchiveNote = (noteId) => {
    setNoteIdToUnarchive(noteId);
    setConfirmationUnarchiveModal(true);
  };

  const confirmUnarchiveNote = async () => {
    const result = await executeAction(unarchiveNote, noteIdToUnarchive);

    if (result.error) {
      return;
    }

    setConfirmationUnarchiveModal(false);
    setNoteIdToUnarchive(null);
  };

  // logout account
  const [confirmLogout, setConfirmLogout] = useState(false);

  const { handleLogout } = useAuth();

  return (
    <div className="bg-background w-full min-h-screen flex">
      <Sidebar handleLogout={() => setConfirmLogout(true)} />
      <div className="flex-1 min-h-screen p-8">
        <Header
          headerTitle={t('archive_title')}
          totalNotes={filteredNotes.length}
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          showAddButton={false}
        />
        <main>
          {actionError && (
            <p className="mb-4 rounded-lg border border-red-500 p-3 text-sm text-red-500">
              {actionError}
            </p>
          )}
          {isLoading ? (
            <NotesLoading />
          ) : (
            <NoteList
              notes={filteredNotes}
              emptyMessage={t('archive_empty')}
              onDelete={handleDeleteNote}
              onUnarchive={handleUnarchiveNote}
            />
          )}
        </main>
      </div>

      {/* delete confirmation */}
      {confirmationDeleteModal && (
        <DeleteConfirmModal
          onConfirm={confirmDeleteNote}
          isLoading={isSubmitting}
          onCancel={() => setConfirmationDeleteModal(false)}
        />
      )}

      {/* unarchive confirmation */}
      {confirmationUnarchiveModal && (
        <ArchiveConfirmModal
          archived
          description={t('unarchive_description')}
          onConfirm={confirmUnarchiveNote}
          isLoading={isSubmitting}
          onCancel={() => setConfirmationUnarchiveModal(false)}
        />
      )}

      {/* logout confirmation */}
      {confirmLogout && (
        <LogoutConfirmModal
          onConfirm={handleLogout}
          onCancel={() => setConfirmLogout(false)}
        />
      )}
    </div>
  );
}

export default Archive;
