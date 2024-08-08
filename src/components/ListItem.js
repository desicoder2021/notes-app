import React from "react";

const ListItem = ({ note }) => {
  return (
    <div className='notes-list-item'>
      <h3>{note.body}</h3>
    </div>
  );
};

export default ListItem;
