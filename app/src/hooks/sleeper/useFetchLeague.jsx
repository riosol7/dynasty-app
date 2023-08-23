import { useState, useEffect } from "react";

const useFetchLeague = () => {
    const [league, setLeague] = useState({});
    const [loadLeague, setLoadLeague] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const call = await fetch(`http://localhost:5000/league`);
                const parsedLeague = await call.json();
                setLeague(parsedLeague);
                setLoadLeague(false);
                console.log("fetchLeague:", parsedLeague);
            } catch(err) {
                console.log(err);
            }
        })();
    }, []);

    return { league, loadLeague };
};

export default useFetchLeague;