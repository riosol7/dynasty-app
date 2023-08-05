import { useState, useEffect } from "react";

const usePlayers = () => {
    const [players, setPlayers] = useState([]);
    const [loadPlayers, setLoadPlayers] = useState(true);

    useEffect(() => {
        getPlayers();
        // eslint-disable-next-line 
    }, []);
    
    const getPlayers = async () => {
        try{
            const call = await fetch(`http://localhost:5000/players`);
            const parsedPlayers = await call.json();
            setPlayers(parsedPlayers);
            setLoadPlayers(false);
            console.log("getPlayers:", parsedPlayers);
        }catch (err) {
            console.log(err);
        }
    };

    return { players, loadPlayers, getPlayers }
};

export default usePlayers;