import { dbService } from "fbase";
import React, { useState } from "react";

const Twt = ({ twtObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newTwt, setNewTwt] = useState(twtObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("delete confirm");
        if (ok) {
            await dbService.doc(`twt/${twtObj.id}`).delete();
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.doc(`twt/${twtObj.id}`).update({
            text: newTwt
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewTwt(value);
    }
    return(
        <div key={twtObj.id}>
            {
                editing ? <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="edit this" value={newTwt} required onChange={onChange}/> 
                        <input type="submit" value="Update twt"/>
                    </form>
                    <button onClick={toggleEditing}>cancel</button> </>: <><h4>{twtObj.text}</h4>
                {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={toggleEditing}>Edit</button>
                </>)}</>
            }
        </div>
    );
}

export default Twt;