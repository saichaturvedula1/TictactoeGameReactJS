import { useState } from "react";

export default function Player(props){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(props.name);

    function handleEditClick(){
        setIsEditing((editing)=> !editing);
        if(isEditing){
            props.onnameChange(props.symbol,playerName);
        }
    }

    function handleChange(event){
    setPlayerName(event.target.value);
    }

    let playername = <span className="player-name">{playerName}</span>;

    if(isEditing){
        playername = <input type="text" required value={playerName} onChange={handleChange} />;
    }

    return (
        <li className={props.isActive ? 'active' : undefined}>
        {playername}
        <span className="player-symbol">{props.symbol}</span>
        <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
        </li>
    )
}