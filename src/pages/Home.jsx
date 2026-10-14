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
import useNotes from '../hooks/useNotes';

function Home() {
  // notes data
  const { addNote, deleteNote, archiveNote, activeNotes, isLoading } = useNotes();
  const [modalAddNote, setModalAddNote] = useState(false);

  // state for search params
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const filteredNotes = activeNotes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleKeywordChange = (value) => {
    setSearchParams(value ? { keyword: value } : {}, { replace: true });
  };

  // state add note modal
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');

  const handleAddButtonClick = () => {
    setModalAddNote(true);
  };

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();

    addNote({ title: noteTitle, body: noteBody });

    setModalAddNote(false);
    setNoteTitle('');
    setNoteBody('');
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

  // archive note
  const [confirmationArchiveModal, setConfirmationArchiveModal] =
    useState(false);
  const [noteIdToArchive, setNoteIdToArchive] = useState(null);

  const handleArchiveNote = (noteId) => {
    setNoteIdToArchive(noteId);
    setConfirmationArchiveModal(true);
  };

  const confirmArchiveNote = () => {
    archiveNote(noteIdToArchive);
    setConfirmationArchiveModal(false);
    setNoteIdToArchive(null);
  };

  // logout account
  const [confirmLogout, setConfirmLogout] = useState(false);

  const { handleLogout } = useAuth();

  return (
    <div className="bg-background w-full min-h-screen flex">
      <Sidebar handleLogout={() => setConfirmLogout(true)} />
      <div className="flex-1 min-h-screen p-8">
        <Header
          headerTitle="Semua Catatan"
          totalNotes={filteredNotes.length}
          handleClick={handleAddButtonClick}
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          showAddButton={true}
        />
        <main>
          {isLoading ? (
            <NotesLoading />
          ) : (
            <NoteList
              notes={filteredNotes}
              emptyMessage="Tidak ada catatan"
              onDelete={handleDeleteNote}
              onArchive={handleArchiveNote}
            />
          )}
        </main>
      </div>

      {/* modal add note */}
      {modalAddNote && (
        <div
          onClick={() => setModalAddNote(false)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl text-text-primary font-bold">
              Tambah Catatan Baru
            </h2>
            <p className="text-text-muted text-sm">
              Isi detail catatan barumu.
            </p>
            <form
              onSubmit={handleAddNoteSubmit}
              className="mt-4 flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Judul"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                placeholder="Isi catatan"
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                className="border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-all"
              >
                Tambah Catatan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* delete confirmation */}
      {confirmationDeleteModal && (
        <DeleteConfirmModal
          onConfirm={confirmDeleteNote}
          onCancel={() => setConfirmationDeleteModal(false)}
        />
      )}

      {/* archive confirmation */}
      {confirmationArchiveModal && (
        <ArchiveConfirmModal
          archived={false}
          onConfirm={confirmArchiveNote}
          onCancel={() => setConfirmationArchiveModal(false)}
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

export default Home;
