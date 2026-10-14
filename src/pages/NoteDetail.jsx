import { useEffect, useState } from 'react';

import { Archive, Calendar, MoveLeft, Trash } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import ArchiveConfirmModal from '../components/ArchiveConfirmModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import LogoutConfirmModal from '../components/LogoutConfirmModal';
import NoteDetailLoader from '../components/NoteDetailLoader';
import Sidebar from '../components/Sidebar';
import useAuth from '../hooks/useAuth';
import useLanguage from '../hooks/useLanguage';
import useNotes from '../hooks/useNotes';
import { showFormattedDate } from '../utils';
import NotFound from './NotFound';

function NoteDetailHeader({
  handleDelete,
  handleArchive,
  handleUnarchive,
  archived,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="w-full min-h-10">
      <div className="p-2 flex items-center justify-between">
        <button
          onClick={handleBackClick}
          className="text-text-muted flex text-sm gap-2 items-center w-50 border border-transparent hover:border-border hover:shadow-sm p-2 rounded transition-all cursor-pointer"
        >
          <MoveLeft size={18} />
          <span>{t('detail_back_home')}</span>
        </button>
        <div className="flex gap-2">
          <button
            onClick={archived ? handleUnarchive : handleArchive}
            className="text-text-muted flex text-sm gap-2 items-center border border-border active:translate-y-0.5 hover:shadow-sm p-2 rounded transition-all cursor-pointer"
          >
            <Archive size={18} className="text-text-muted" />
            <span className="text-text-muted text-sm ml-2">
              {archived ? t('note_unarchive') : t('note_archive')}
            </span>
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white flex text-sm gap-2 items-center hover:shadow-sm active:translate-y-0.5 p-2 rounded transition-all cursor-pointer"
          >
            <Trash size={18} />
            <span className="text-sm ml-2">{t('note_delete')}</span>
          </button>
        </div>
      </div>
      <hr className="h-px bg-primary-soft border-0" />
    </div>
  );
}

function NoteDetailContent({ note }) {
  const navigate = useNavigate();
  const { deleteNote, archiveNote, unarchiveNote } = useNotes();
  const { handleLogout } = useAuth();
  const { language } = useLanguage();

  const [activeModal, setActiveModal] = useState(null);
  const [actionError, setActionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeModal = () => setActiveModal(null);

  const confirmDeleteNote = async () => {
    setActionError('');
    setIsSubmitting(true);
    const result = await deleteNote(note.id);

    if (result.error) {
      setActionError(result.message);
      setIsSubmitting(false);
      return;
    }

    closeModal();
    navigate('/');
    setIsSubmitting(false);
  };

  const confirmArchiveNote = async () => {
    setActionError('');
    setIsSubmitting(true);
    const result = await archiveNote(note.id);

    if (result.error) {
      setActionError(result.message);
      setIsSubmitting(false);
      return;
    }

    closeModal();
    navigate('/archive');
    setIsSubmitting(false);
  };

  const confirmUnarchiveNote = async () => {
    setActionError('');
    setIsSubmitting(true);
    const result = await unarchiveNote(note.id);

    if (result.error) {
      setActionError(result.message);
      setIsSubmitting(false);
      return;
    }

    closeModal();
    navigate('/');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-background w-full h-screen flex">
      <Sidebar handleLogout={() => setActiveModal('logout')} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <NoteDetailHeader
          handleDelete={() => setActiveModal('delete')}
          handleArchive={() => setActiveModal('archive')}
          handleUnarchive={() => setActiveModal('archive')}
          archived={note.archived}
        />
        {actionError && (
          <p className="mx-8 mt-4 rounded-lg border border-red-500 p-3 text-sm text-red-500">
            {actionError}
          </p>
        )}
        <div className="flex-1 p-8 flex flex-col overflow-hidden">
          <h3 className="text-text-primary font-bold mb-4 text-5xl wrap-break-word">
            {note.title}
          </h3>
          <div className="flex items-center text-xs gap-2 text-text-muted justify-start mb-2">
            <Calendar size={15} />
            <p>{showFormattedDate(note.createdAt, language)}</p>
          </div>
          <hr className="h-px mb-6 bg-primary-soft border-0" />
          <p className="text-text-muted border border-border rounded-xl p-2 bg-surface min-h-60 max-h-[60vh] overflow-y-auto whitespace-pre-wrap">
            {note.body}
          </p>
        </div>
      </div>

      {/* delete confirmation */}
      {activeModal === 'delete' && (
        <DeleteConfirmModal
          onConfirm={confirmDeleteNote}
          isLoading={isSubmitting}
          onCancel={closeModal}
        />
      )}

      {/* archive confirmation */}
      {activeModal === 'archive' && (
        <ArchiveConfirmModal
          archived={note.archived}
          onConfirm={note.archived ? confirmUnarchiveNote : confirmArchiveNote}
          isLoading={isSubmitting}
          onCancel={closeModal}
        />
      )}

      {activeModal === 'logout' && (
        <LogoutConfirmModal onConfirm={handleLogout} onCancel={closeModal} />
      )}
    </div>
  );
}

function NoteDetail() {
  const { id } = useParams();
  const { getNote } = useNotes();
  const { t } = useLanguage();
  const [note, setNote] = useState(null);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [loadErrorMessage, setLoadErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      const result = await getNote(id);
      setNote(result.error ? null : result.data);
      setHasLoadError(result.error);
      setLoadErrorMessage(result.message || t('note_load_error'));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fetchNote();
  }, [id, getNote, t]);

  if (isLoading) {
    return <NoteDetailLoader />;
  }

  if (hasLoadError) {
    return (
      <div className="bg-background min-h-screen p-8 text-center text-red-500">
        {loadErrorMessage}
      </div>
    );
  }

  if (!note) {
    return <NotFound />;
  }

  return <NoteDetailContent note={note} />;
}

export default NoteDetail;
