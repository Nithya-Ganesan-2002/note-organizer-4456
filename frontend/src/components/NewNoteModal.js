import React, { useState } from "react";

// PUBLIC_INTERFACE
function NewNoteModal({ open, onClose, onCreate }) {
  /** Modal for creating a new note quickly */
  const [title, setTitle] = useState("");
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>New Note</h3>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          autoFocus
          onChange={e => setTitle(e.target.value)}
        />
        <div className="modal-actions">
          <button
            className="btn-primary"
            onClick={() => { onCreate(title); setTitle(""); }}
            disabled={!title.trim()}
          >
            Create
          </button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
export default NewNoteModal;
