import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Calendar, MoveLeft, Archive, Trash } from 'lucide-react';
import { showFormattedDate } from '../utils';
import useNotes from '../hooks/useNotes';
import { useState, useEffect } from 'react';
import NotFound from './NotFound';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import ArchiveConfirmModal from '../components/ArchiveConfirmModal';
import NoteDetailLoader from '../components/NoteDetailLoader';
import useLanguage from '../hooks/useLanguage';

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

  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  const confirmDeleteNote = () => {
    deleteNote(note.id);
    closeModal();
    navigate('/');
  };

  const confirmArchiveNote = () => {
    archiveNote(note.id);
    closeModal();
    navigate('/archive');
  };

  const confirmUnarchiveNote = () => {
    unarchiveNote(note.id);
    closeModal();
    navigate('/');
  };

  return (
    <div className="bg-background w-full h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <NoteDetailHeader
          handleDelete={() => setActiveModal('delete')}
          handleArchive={() => setActiveModal('archive')}
          handleUnarchive={() => setActiveModal('archive')}
          archived={note.archived}
        />
        <div className="flex-1 p-8 flex flex-col overflow-hidden">
          <h3 className="text-text-primary font-bold mb-4 text-5xl wrap-break-word">
            {note.title}
          </h3>
          <div className="flex items-center text-xs gap-2 text-text-muted justify-start mb-2">
            <Calendar size={15} />
            <p>{showFormattedDate(note.createdAt)}</p>
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
          onCancel={closeModal}
        />
      )}

      {/* archive confirmation */}
      {activeModal === 'archive' && (
        <ArchiveConfirmModal
          archived={note.archived}
          onConfirm={note.archived ? confirmUnarchiveNote : confirmArchiveNote}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

function NoteDetail() {
  const { id } = useParams();
  const { getNote } = useNotes();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      const noteData = await getNote(id);
      setNote(noteData);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fetchNote();
  }, [id, getNote]);

  if (isLoading) {
    return <NoteDetailLoader />;
  }

  if (!note) {
    return <NotFound />;
  }

  return <NoteDetailContent note={note} />;
}

export default NoteDetail;
