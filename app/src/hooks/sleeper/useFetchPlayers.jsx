import { useState, useEffect } from "react";

const useFetchPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [loadPlayers, setLoadPlayers] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const call = await fetch(`${process.env.REACT_APP_DEV_URL}players`);
                const parsedData = await call.json();
                setPlayers(parsedData);
                setLoadPlayers(false);
                console.log("fetchPlayers:", parsedData);
            }catch (err) {
                console.log(err);
            };
        })();
    }, []);
    
    return { players, loadPlayers };
};

export default useFetchPlayers;