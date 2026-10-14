import { useState } from 'react';

import { Calendar, Ellipsis } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { showFormattedDate } from '../utils';

function NoteItem({
  noteId,
  title,
  body,
  createdAt,
  handleDelete,
  handleArchive,
  handleUnarchive,
  archived,
}) {
  const [isEllipsisClicked, setIsEllipsisClicked] = useState(false);
  const navigate = useNavigate();
  const handleCardClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <div
      onClick={() => handleCardClick(noteId)}
      className="bg-surface border border-border p-5 rounded-xl flex flex-col gap-6 justify-between shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all ease-out duration-200 cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-text-primary font-bold mb-2 text-lg">{title}</h3>
          <button
            onMouseEnter={() => setIsEllipsisClicked(true)}
            onMouseLeave={() => setIsEllipsisClicked(false)}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1 rounded-full hover:bg-primary-soft transition-all cursor-pointer"
          >
            <Ellipsis size={18} className="text-text-muted" />
          </button>
        </div>
        <p className="text-text-muted line-clamp-3">{body}</p>
      </div>
      <div className="flex items-center text-xs gap-2 text-text-muted justify-end">
        <Calendar size={15} />
        <p>{showFormattedDate(createdAt)}</p>
      </div>

      {/* Ellipsis menu */}
      {isEllipsisClicked && (
        <div
          onMouseEnter={() => setIsEllipsisClicked(true)}
          onMouseLeave={() => setIsEllipsisClicked(false)}
          className="absolute top-0 right-0 mt-10 mr-5 bg-surface border border-border rounded-lg shadow-lg p-2 z-50"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              {
                archived ? handleUnarchive() : handleArchive();
              }
            }}
            className="rounded-md block w-full text-left px-4 py-2 text-sm text-text-muted hover:bg-primary-soft transition-all"
          >
            {archived ? 'Batal Arsip' : 'Arsipkan'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="rounded-md block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-primary-soft transition-all"
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteItem;
