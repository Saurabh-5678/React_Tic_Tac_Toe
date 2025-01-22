// import React,{useState} from 'react'

// export default function Player({initialName,symbol}) {
//     const[playerName,setPlayerName] = useState(initialName);
//     const [isEditing,setIsEditing] = useState(false);

//     const  handleEdit = () => {
//       setIsEditing(true);

//     }

//     const handleChange = (event) => {
//         console.log(event);
//         setPlayerName(event.target.value);
//     }
//   let editablePlayerName =   <span className="player-name">{playerName}</span>;
//     // let btnCaption = "Edit";
//     if(isEditing){
//         editablePlayerName = (
//             <input
//               type="text"
//               value={playerName}
//               onChange={handleChange}
//               className="player-name-input"
//             />
//           );
//         // btnCaption = "Save";
//     }
//   return (
//     <li>
//     <span className="player">
//      {playerName}
//     <span className="player-symbol">{symbol}</span>
//     <button onClick={()=>{handleEdit()}}>{isEditing?'Save':'Edit'}</button>
//     </span>
    
//     </li>
//   )
// }

import React, { useState } from 'react';

export default function Player({ initialName, symbol,isActive,onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((editing) => !editing);
    if(isEditing){
      onChangeName(symbol,playerName)
    }
   
  };

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleChange}
      />
    );
  }

  return (
    <li className={isActive ? 'active':undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEdit}>{isEditing ? 'Save':'Edit'}</button>
      </span>
    </li>
  );
}

