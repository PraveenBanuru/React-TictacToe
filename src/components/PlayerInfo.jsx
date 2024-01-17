import { useState } from "react";

export default function PlayerInfo({name, symbol, isActive}){

    const [isEditing, setIsEditing]= useState(false);
    const [playerName, setPlayerName]= useState(name);

    let editPlayerName= <span className="player-name"> {playerName}</span>
    let btnCaption ="Edit";

function handleEditClick(){
    setIsEditing(editing=>!editing);
   
    
}
function handleChange(event){
   setPlayerName(event.target.value) ;
}



if(isEditing) {
    editPlayerName = < input type='text' required value={playerName} onChange={handleChange}/>
 btnCaption='Save';
}
    
    return (
        <li className={isActive ? 'active': undefined}> 
            <span className="player">
                {editPlayerName}
                <span className="player-sysmbol">{symbol} </span>
            </span>
            <button onClick={()=>handleEditClick()}>{btnCaption}</button>
        </li>
    );
}