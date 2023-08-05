import { useState, useEffect } from "react";

const useOwners = () => {
    const [owners, setOwners] = useState([]);
    const [loadOwners, setLoadOwners] = useState(true);

    useEffect(() => {
        getOwners();
        // eslint-disable-next-line 
    }, [])
    
    const getOwners = async () => {
        try{
            const call = await fetch(`http://localhost:5000/owners`);
            const parsedOwners = await call.json();
            setOwners(parsedOwners);
            setLoadOwners(false);
            console.log("getOwners:",parsedOwners);
        } catch (err) {
            console.log(err);
        }
    };

    return { owners, loadOwners, getOwners }
}

export default useOwners;