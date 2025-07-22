import React from "react";

// PUBLIC_INTERFACE
function TopNavBar({ onSearch, searchTerm, onNewNote }) {
  /** Top navigation bar with app logo/title and search */
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <span className="logo">Note Organizer</span>
      </div>
      <div className="nav-center">
        <input
          className="search-input"
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={e => onSearch(e.target.value)}
        />
      </div>
      <div className="nav-right">
        <button className="btn-accent" onClick={onNewNote} aria-label="Create New Note">
          + New Note
        </button>
      </div>
    </nav>
  );
}

export default TopNavBar;
