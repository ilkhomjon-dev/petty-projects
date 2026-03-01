import "./notes.css";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
const STORAGE_KEY = "notes";

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) return JSON.parse(saved);

      // default example note (first run only)
      return [
        {
          id: Date.now(),
          title: "Welcome",
          description: "This is your first note",
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function remove(id) {
    setNotes((prev) => prev.filter((e) => e.id !== id));
  }

  function handleSubmit() {
    if (editingId) {
      if (!editTitle || !editDescription) {
        window.alert("Incomplete input");
        return;
      }

      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId
            ? { ...note, title: editTitle, description: editDescription }
            : note,
        ),
      );

      setEditingId(null);
      return;
    }

    if (!title || !description) {
      window.alert("Incomplete input");
      return;
    }

    const newNote = {
      id: Date.now(),
      title,
      description,
    };

    setNotes((prev) => [...prev, newNote]);
    setTitle("");
    setDescription("");
  }

  const sorted_notes = useMemo(() => {
    return [...notes].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    );
  }, [notes]);

  function startEdit(note) {
    setEditTitle(note.title);
    setEditDescription(note.description);
    setEditingId(note.id);
  }

  return (
    <div className="container">
      <h1>Notes App</h1>
      <div className="inputs">
        <input
          id="title"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          id="description"
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>Add</button>
      </div>

      <div className="notes">
        {sorted_notes.map((e) => (
          <div className="note" key={e.id}>
            {editingId === e.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(ev) => setEditTitle(ev.target.value)}
                />

                <input
                  value={editDescription}
                  onChange={(ev) => setEditDescription(ev.target.value)}
                />

                <button onClick={handleSubmit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h4>{e.title}</h4>
                <p>{e.description}</p>

                <button onClick={() => remove(e.id)}>Remove</button>
                <button onClick={() => startEdit(e)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
