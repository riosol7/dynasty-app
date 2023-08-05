import { useState, useEffect } from "react";

const useLeagueData = () => {
    const [league, setLeague] = useState({});
    const [loadLeague, setLoadLeague] = useState(true);

    useEffect(() => {
        getLeague();
        // eslint-disable-next-line 
    }, []);
    
    const getLeague = async () => {
        try {
            const call = await fetch(`http://localhost:5000/league`);
            const parsedLeague = await call.json();
            setLeague(parsedLeague);
            setLoadLeague(false);
            console.log("getLeague:", parsedLeague);
        } catch(err) {
            console.log(err);
        }
    };

    return { league, loadLeague, getLeague };
};

export default useLeagueData;