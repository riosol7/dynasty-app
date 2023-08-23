import { useState, useEffect } from "react";

const useFetchMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loadMatches, setLoadMatches] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const call = await fetch(`http://localhost:5000/league/matches`);
                const parsedMatches = await call.json();
                setMatches(parsedMatches);
                setLoadMatches(false);
                console.log("fetchMatches:", parsedMatches);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return { matches, loadMatches };
}

export default useFetchMatches;