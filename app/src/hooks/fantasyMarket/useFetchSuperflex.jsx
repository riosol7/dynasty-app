import { useEffect, useState } from "react";

const useFetchSuperflex = () => {
    const [sfData, setSFData] = useState([]);
    const [sfLoading, setSFLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_DEV_URL}scripts/superflex`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const parsedData = await response.json();
                setSFData(parsedData);
                setSFLoading(false);
                console.log("fetchSF:", parsedData);
            } catch (err) {
                console.err("Error fetching SF:", err)
                setSFLoading(false);
            }
        })();
    }, []);

    return { sfData, sfLoading }
}

export default useFetchSuperflex;