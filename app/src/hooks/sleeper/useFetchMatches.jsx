import { useState, useEffect } from "react";

const useFetchMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loadMatches, setLoadMatches] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const call = await fetch(`${process.env.REACT_APP_DEV_URL}league/matches`);
                const parsedData = await call.json();
                setMatches(parsedData);
                setLoadMatches(false);
                console.log("fetchMatches:", parsedData);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return { matches, loadMatches };
}

export default useFetchMatches;