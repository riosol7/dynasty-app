import { useState, useEffect } from "react";

const useFetchOwners = () => {
    const [owners, setOwners] = useState([]);
    const [loadOwners, setLoadOwners] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const call = await fetch(`http://localhost:5000/owners`);
                const parsedOwners = await call.json();
                setOwners(parsedOwners);
                setLoadOwners(false);
                console.log("fetchOwners:",parsedOwners);
            } catch (err) {
                console.log(err);
            };
        })();
    }, []);
    
    return { owners, loadOwners };
}

export default useFetchOwners;