import React, { useState, useEffect } from "react";
// import notes from "../assets/data";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const [note, setNote] = useState(null);
  console.log("note", note);

  let noteId = useParams();

  useEffect(() => {
    getNote();
  }, [noteId]);

  const getNote = async () => {
    let response = await fetch(`http://127.0.0.1:5000/notes/${noteId.id}`);
    let data = await response.json();
    setNote(data);
  };

  // let note = notes.find((note) => note.id == noteId.id);
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to='/'>
            <ArrowLeft />
          </Link>
        </h3>
      </div>
      <textarea value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
