import { useState, useEffect } from "react";

const useMatches = () => {
    const [matches, setMatches] = useState([]);
    const [loadMatches, setLoadMatches] = useState(true);

    useEffect(() => {
        getMatches();
        // eslint-disable-next-line 
    }, [])
    
    const getMatches = async () => {
        try{
            const call = await fetch(`http://localhost:5000/league/matches`);
            const parsedMatches = await call.json();
            setMatches(parsedMatches);
            setLoadMatches(false);
            console.log("getMatches:",parsedMatches);
        } catch (err) {
            console.log(err);
        }
    };

    return { matches, loadMatches, getMatches }
}

export default useMatches;