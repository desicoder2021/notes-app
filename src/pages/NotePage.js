import React, { useState, useEffect } from "react";
// import notes from "../assets/data";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  let noteId = useParams();

  useEffect(() => {
    getNote();
  }, [noteId.id]);

  const getNote = async () => {
    if (noteId.id === "new") return;
    let response = await fetch(`http://127.0.0.1:5000/notes/${noteId.id}`);
    let data = await response.json();
    setNote(data);
  };

  const updateNote = async () => {
    await fetch(`http://127.0.0.1:5000/notes/${noteId.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const deleteNote = async () => {
    await fetch(`http://127.0.0.1:5000/notes/${noteId.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate("/");
  };
  const createNote = async () => {
    await fetch(`http://127.0.0.1:5000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const handleSubmit = () => {
    if (noteId.id !== "new" && !note.body) {
      deleteNote();
    } else if (noteId.id !== "new") {
      updateNote();
    } else if (noteId.id === "new" && note !== null) {
      createNote();
    }
    navigate("/");
    navigate(0);
  };

  // let note = notes.find((note) => note.id == noteId.id);
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to='/'>
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId.id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
