import "./notes.css";
import data from "./data";
import { useState } from "react";
const Notes = () => {
  const [notes, setNotes] = useState(data);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [count, setCount] = useState(3);

  function remove(id) {
    setNotes(notes.filter((e) => e.key != id));
  }

  function handleSubmit() {
    if (!title || !description) {
      window.alert("Incomplete input");
      return;
    }

    setNotes([
      ...notes,
      { key: count, title: title, description: description },
    ]);

    setCount(count + 1);
    setTitle("");
    setDescription("");
    console.log(notes);
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
        {notes.map((e) => (
          <div className="note">
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
