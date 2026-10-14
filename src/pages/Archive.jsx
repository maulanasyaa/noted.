import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import ArchiveConfirmModal from '../components/ArchiveConfirmModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Header from '../components/Header';
import LogoutConfirmModal from '../components/LogoutConfirmModal';
import NoteList from '../components/NoteList';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';
import useNotes from '../hooks/useNotes';

function Archive() {
  const { deleteNote, unarchiveNote, archivedNotes } = useNotes();

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

  const confirmDeleteNote = () => {
    deleteNote(noteIdToDelete);
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

  const confirmUnarchiveNote = () => {
    unarchiveNote(noteIdToUnarchive);
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
          headerTitle="Catatan Arsip"
          totalNotes={filteredNotes.length}
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          showAddButton={false}
        />
        <main>
          <NoteList
            notes={filteredNotes}
            emptyMessage="Arsip Kosong"
            onDelete={handleDeleteNote}
            onUnarchive={handleUnarchiveNote}
          />
        </main>
      </div>

      {/* delete confirmation */}
      {confirmationDeleteModal && (
        <DeleteConfirmModal
          onConfirm={confirmDeleteNote}
          onCancel={() => setConfirmationDeleteModal(false)}
        />
      )}

      {/* unarchive confirmation */}
      {confirmationUnarchiveModal && (
        <ArchiveConfirmModal
          archived
          description="Apakah Anda yakin ingin mengeluarkan catatan ini dari arsip? Anda dapat menemukannya di bagian catatan utama."
          onConfirm={confirmUnarchiveNote}
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
