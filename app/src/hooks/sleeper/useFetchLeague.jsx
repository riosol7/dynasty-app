import { useState, useEffect } from "react";

const useFetchLeague = () => {
    const [league, setLeague] = useState({});
    const [loadLeague, setLoadLeague] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const call = await fetch(`${process.env.REACT_APP_DEV_URL}league`);
                const parsedData = await call.json();
                setLeague(parsedData);
                setLoadLeague(false);
                console.log("fetchLeague:", parsedData);
            } catch(err) {
                console.log(err);
            }
        })();
    }, []);

    return { league, loadLeague };
};

export default useFetchLeague;