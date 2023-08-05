import { useState, useEffect } from "react";

const useRosters = () => {
    const [rosters, setRosters] = useState([]);
    const [loadRosters, setLoadRosters] = useState(true);

    useEffect(() => {
        getRosters();
       // eslint-disable-next-line 
    }, []);

    const getRosters = async () => {
        try{
            const call = await fetch("http://localhost:5000/players/rosters");
            const parsedRosters = await call.json();
            setRosters(parsedRosters);
            setLoadRosters(false);
            console.log("getRosters:", parsedRosters);
        } catch (err) {
            console.log(err);
        }
    };

    return { rosters, loadRosters, getRosters };
};

export default useRosters;