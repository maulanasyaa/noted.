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

function Home() {
  // notes data
  const { addNote, deleteNote, archiveNote, activeNotes, isLoading } =
    useNotes();
  const { t } = useLanguage();
  const { actionError, isSubmitting, executeAction } = useNoteAction();
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

  const handleAddNoteSubmit = async (e) => {
    e.preventDefault();

    const result = await executeAction(addNote, {
      title: noteTitle,
      body: noteBody,
    });

    if (result.error) {
      return;
    }

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

  const confirmDeleteNote = async () => {
    const result = await executeAction(deleteNote, noteIdToDelete);

    if (result.error) {
      return;
    }

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

  const confirmArchiveNote = async () => {
    const result = await executeAction(archiveNote, noteIdToArchive);

    if (result.error) {
      return;
    }

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
          headerTitle={t('home_title')}
          totalNotes={filteredNotes.length}
          handleClick={handleAddButtonClick}
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          showAddButton={true}
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
              emptyMessage={t('notes_empty')}
              onDelete={handleDeleteNote}
              onArchive={handleArchiveNote}
            />
          )}
        </main>
      </div>

      {/* modal add note */}
      {modalAddNote && (
        <div
          onClick={() => {
            if (!isSubmitting) setModalAddNote(false);
          }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl text-text-primary font-bold">
              {t('add_note_title')}
            </h2>
            <p className="text-text-muted text-sm">
              {t('add_note_description')}
            </p>
            <form
              onSubmit={handleAddNoteSubmit}
              className="mt-4 flex flex-col gap-4"
            >
              <label
                htmlFor="note-title"
                className="text-sm font-medium text-text-secondary"
              >
                {t('add_note_field_title')}
              </label>
              <input
                id="note-title"
                name="title"
                type="text"
                placeholder={t('add_note_field_title')}
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <label
                htmlFor="note-body"
                className="text-sm font-medium text-text-secondary"
              >
                {t('add_note_field_body')}
              </label>
              <textarea
                id="note-body"
                name="body"
                placeholder={t('add_note_field_body')}
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                className="border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-text-on-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition-all disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? t('button_processing') : t('add_note_submit')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* delete confirmation */}
      {confirmationDeleteModal && (
        <DeleteConfirmModal
          onConfirm={confirmDeleteNote}
          isLoading={isSubmitting}
          onCancel={() => setConfirmationDeleteModal(false)}
        />
      )}

      {/* archive confirmation */}
      {confirmationArchiveModal && (
        <ArchiveConfirmModal
          archived={false}
          onConfirm={confirmArchiveNote}
          isLoading={isSubmitting}
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
