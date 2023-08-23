import { useState, useEffect } from "react";

const useFetchPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [loadPlayers, setLoadPlayers] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const call = await fetch(`http://localhost:5000/players`);
                const parsedPlayers = await call.json();
                setPlayers(parsedPlayers);
                setLoadPlayers(false);
                console.log("fetchPlayers:", parsedPlayers);
            }catch (err) {
                console.log(err);
            };
        })();
    }, []);
    
    return { players, loadPlayers };
};

export default useFetchPlayers;