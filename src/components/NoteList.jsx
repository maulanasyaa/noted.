import NoteItem from './NoteItem';

function NoteList({ notes, emptyMessage, onDelete, onArchive, onUnarchive }) {
  if (notes.length === 0) {
    return (
      <p className="text-text-muted font-medium text-sm">{emptyMessage}</p>
    );
  }

  return (
    <div className="w-full grid grid-cols-3 gap-3">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          noteId={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
          handleDelete={() => onDelete(note.id)}
          handleArchive={() => onArchive(note.id)}
          handleUnarchive={() => onUnarchive(note.id)}
          archived={note.archived}
        />
      ))}
    </div>
  );
}

export default NoteList;
