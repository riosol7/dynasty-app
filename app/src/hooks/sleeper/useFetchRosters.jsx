import { useState, useEffect } from "react";

const useFetchRosters = () => {
    const [rosters, setRosters] = useState([]);
    const [loadRosters, setLoadRosters] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const call = await fetch(`${process.env.REACT_APP_DEV_URL}players/rosters`);
                const parsedData = await call.json();
                setRosters(parsedData);
                setLoadRosters(false);
                console.log("fetchRosters:", parsedData);
            } catch (err) {
                console.log(err);
            };
        })();
    }, []);

    return { rosters, loadRosters };
};

export default useFetchRosters;