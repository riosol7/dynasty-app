import { useEffect, useState } from "react";

const useFetchFantasyCalc = () => {
    const [fcData, setFCData] = useState([]);
    const [fcLoading, setFCLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_DEV_URL}scripts/fantasy_calc`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const parsedData = await response.json();
                setFCData(parsedData);
                setFCLoading(false);
                console.log("fetch fantasyCalc:", parsedData);
            } catch (err) {
                console.err("Error fetching fantasyCalc:", err)
                setFCLoading(false);
            }
        })();
    }, []);

    return { fcData, fcLoading }
}

export default useFetchFantasyCalc;