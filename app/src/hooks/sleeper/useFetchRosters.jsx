import { useState, useEffect } from "react";

const useFetchRosters = () => {
    const [rosters, setRosters] = useState([]);
    const [loadRosters, setLoadRosters] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const call = await fetch("http://localhost:5000/players/rosters");
                const parsedRosters = await call.json();
                setRosters(parsedRosters);
                setLoadRosters(false);
                console.log("fetchRosters:", parsedRosters);
            } catch (err) {
                console.log(err);
            };
        })();
    }, []);

    return { rosters, loadRosters };
};

export default useFetchRosters;