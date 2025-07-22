import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import TopNavBar from "./components/TopNavBar";
import Sidebar from "./components/Sidebar";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import NewNoteModal from "./components/NewNoteModal";

// Helpers to generate IDs
function genId() {
  return Math.random().toString(36).substring(2, 12) + Date.now();
}

/**
 * Demo initial folders/tags
 * Now includes a default "Travel" folder for note organization.
 */
const DEFAULT_FOLDERS = [
  { id: "all", name: "All Notes" },
  { id: "personal", name: "Personal" },
  { id: "work", name: "Work" },
  { id: "travel", name: "Travel" }
];

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [folders, setFolders] = useState(DEFAULT_FOLDERS);
  const [notes, setNotes] = useState([]);
  const [activeFolder, setActiveFolder] = useState("all");
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNoteModalOpen, setNewNoteModalOpen] = useState(false);

  // Apply light theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const savedFolders = JSON.parse(localStorage.getItem("folders") || "[]");
    if (savedNotes.length) setNotes(savedNotes);
    if (savedFolders.length >= DEFAULT_FOLDERS.length)
      setFolders(savedFolders);
  }, []);

  // Persist notes/folders
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  // Filtered notes for sidebar/filter/search
  const shownNotes = useMemo(() => {
    let n = notes;
    if (activeFolder && activeFolder !== "all")
      n = n.filter(note => note.folder === activeFolder);
    if (searchTerm.trim())
      n = n.filter(
        note =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.replace(/<[^>]+>/g, "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    return n;
  }, [notes, activeFolder, searchTerm]);

  // Current note object
  const activeNote = notes.find(n => n.id === activeNoteId);

  // CRUD Handlers
  const handleCreateNote = (title = "") => {
    setNewNoteModalOpen(false);
    const folder = activeFolder === "all" ? DEFAULT_FOLDERS[1].id : activeFolder;
    const newN = {
      id: genId(),
      title: title || "Untitled note",
      content: "",
      folder
    };
    setNotes([newN, ...notes]);
    setActiveNoteId(newN.id);
    setActiveFolder(folder);
  };

  const handleDeleteNote = id => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNoteId === id) setActiveNoteId(null);
  };

  const handleNoteSelect = id => setActiveNoteId(id);

  const handleEditorSave = () => {
    // No action – since we save on edit already for minimalism
  };

  const handleNoteContentChange = html => {
    setNotes(
      notes.map(n =>
        n.id === activeNoteId ? { ...n, content: html } : n
      )
    );
  };

  const handleNoteTitleChange = title => {
    setNotes(
      notes.map(n =>
        n.id === activeNoteId ? { ...n, title } : n
      )
    );
  };

  const handleAddFolder = () => {
    const name = prompt("Enter folder name:");
    if (!name) return;
    const id = genId();
    setFolders([...folders, { id, name }]);
  };

  const handleSelectFolder = id => {
    setActiveFolder(id);
    setActiveNoteId(null);
  };

  const handleToggleTheme = () => {
    // Light theme is default
    setTheme(prev => (prev === "light" ? "light" : "light"));
  };

  return (
    <div className="app-shell">
      <TopNavBar
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        onNewNote={() => setNewNoteModalOpen(true)}
      />
      <div className="main-container">
        <Sidebar
          folders={folders}
          activeFolder={activeFolder}
          onSelectFolder={handleSelectFolder}
          onAddFolder={handleAddFolder}
        />
        <main className="main-content">
          <NotesList
            notes={shownNotes}
            activeNoteId={activeNoteId}
            onSelectNote={handleNoteSelect}
            onDeleteNote={handleDeleteNote}
          />
          <NoteEditor
            note={activeNote}
            onChange={handleNoteContentChange}
            onSave={handleEditorSave}
            onTitleChange={handleNoteTitleChange}
            disabled={!activeNote}
          />
        </main>
      </div>
      <NewNoteModal
        open={newNoteModalOpen}
        onClose={() => setNewNoteModalOpen(false)}
        onCreate={handleCreateNote}
      />
    </div>
  );
}

export default App;
