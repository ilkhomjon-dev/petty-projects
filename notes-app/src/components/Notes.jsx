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
  const [count, setCount] = useState(3);

  function remove(id) {
    setNotes((prev) => prev.filter((e) => e.key !== id));
  }

  function handleSubmit() {
    if (!title || !description) {
      window.alert("Incomplete input");
      return;
    }

    setNotes((prevNotes) => [...prevNotes, { key: count, title, description }]);

    setCount(count + 1);
    setTitle("");
    setDescription("");
    console.log(notes);
  }

  const sorted_notes = useMemo(() => {
    return [...notes].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    );
  }, [notes]);

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
          <div className="note" key={e.key}>
            <h4>{e.title}</h4>
            <p>{e.description}</p>
            <button onClick={() => remove(e.key)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
