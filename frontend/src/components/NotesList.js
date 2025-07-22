import React from "react";

// PUBLIC_INTERFACE
function NotesList({ notes, activeNoteId, onSelectNote, onDeleteNote }) {
  /** Lists notes titles with selection and delete feature. */
  return (
    <div className="notes-list">
      <ul>
        {notes.map(note => (
          <li
            key={note.id}
            className={activeNoteId === note.id ? "note-item active" : "note-item"}
            onClick={() => onSelectNote(note.id)}
            tabIndex={0}
            aria-label={`Select note: ${note.title}`}
          >
            <span>{note.title || <em>Untitled</em>}</span>
            <button className="btn-delete" onClick={e => {
              e.stopPropagation();
              onDeleteNote(note.id);
            }} aria-label="Delete Note">🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
