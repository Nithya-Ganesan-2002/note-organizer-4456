import React from "react";

// PUBLIC_INTERFACE
function Sidebar({ folders, activeFolder, onSelectFolder, onAddFolder }) {
  /** Sidebar to show folders/tags for organizing notes */
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span>Folders</span>
        <button className="btn-side" onClick={onAddFolder} aria-label="Add Folder">
          +
        </button>
      </div>
      <ul className="folder-list">
        {folders.map(folder => (
          <li
            key={folder.id}
            className={folder.id === activeFolder ? "folder active" : "folder"}
            onClick={() => onSelectFolder(folder.id)}
          >
            <span>{folder.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
