import React, { useRef } from "react";

// Basic Rich Text Buttons
const FORMAT_ACTIONS = [
  { cmd: "bold", label: "B", icon: <b>B</b> },
  { cmd: "italic", label: "I", icon: <i>I</i> },
  { cmd: "underline", label: "U", icon: <u>U</u> },
  { cmd: "insertUnorderedList", label: "•", icon: <span>&#8226;</span> },
  { cmd: "insertOrderedList", label: "1.", icon: <span>1.</span> }
];

// PUBLIC_INTERFACE
function NoteEditor({ note, onChange, onSave, onTitleChange, disabled }) {
  /** Rich text note editor for editing note content */
  const editorRef = useRef(null);

  const handleInput = () => {
    if (typeof onChange === "function") {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleFormat = cmd => {
    document.execCommand(cmd, false, null);
    handleInput();
    editorRef.current.focus();
  };

  if (!note) {
    return (
      <div className="editor-placeholder">Select a note to view or edit.</div>
    );
  }

  return (
    <div className="note-editor">
      <input
        className="note-title"
        type="text"
        placeholder="Note title"
        value={note.title}
        disabled={disabled}
        onChange={e => onTitleChange(e.target.value)}
      />
      <div className="editor-toolbar">
        {FORMAT_ACTIONS.map(f => (
          <button
            key={f.cmd}
            className="editor-btn"
            type="button"
            title={f.label}
            disabled={disabled}
            onClick={() => handleFormat(f.cmd)}
            tabIndex={0}
          >
            {f.icon}
          </button>
        ))}
      </div>
      <div
        className="note-content"
        ref={editorRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        spellCheck={true}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: note.content }}
        aria-label="Edit note content"
        tabIndex={0}
        style={{ minHeight: '180px' }}
      />
      <div className="editor-actions">
        <button className="btn-primary" onClick={onSave} disabled={disabled}>
          Save
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;
