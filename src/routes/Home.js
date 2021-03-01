import Twt from "components/Twt";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [twt, setTwt] = useState("");
    const [twts, setTwts] = useState([]);

    useEffect(() => {
        dbService.collection('twt').onSnapshot(snapshot => {
            const twtArray = snapshot.docs.map(doc => ({
                id:doc.id, 
                ...doc.data(),
            }));
            setTwts(twtArray);
        })
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("twt").add({
            text: twt,
            createAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTwt("");
    }
    const onChange = (event) => {
        const { target: {value}} = event;
        setTwt(value);
    }
    
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={twt} onChange={onChange} type="text" placeholder="twt any text" maxLength={120} />
                <input type="submit" value="제출" />
            </form>
            <div>
                {twts.map(twt => (
                    <Twt 
                        key={twt.id}
                        twtObj={twt} 
                        isOwner={twt.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
}
export default Home;