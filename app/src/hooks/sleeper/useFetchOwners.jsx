import { useState, useEffect } from "react";

const useFetchOwners = () => {
    const [owners, setOwners] = useState([]);
    const [loadOwners, setLoadOwners] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const call = await fetch(`${process.env.REACT_APP_DEV_URL}owners`);
                const parsedData = await call.json();
                setOwners(parsedData);
                setLoadOwners(false);
                console.log("fetchOwners:",parsedData);
            } catch (err) {
                console.log("Error fetching owners:", err);
            };
        })();
    }, []);
    
    return { owners, loadOwners };
}

export default useFetchOwners;