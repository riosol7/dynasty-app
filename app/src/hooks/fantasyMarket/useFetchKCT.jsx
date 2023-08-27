import { useEffect, useState } from "react";

const useFetchKCT = () => {
    const [kctData, setKCTData] = useState([]);
    const [kctLoading, setKCTLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_DEV_URL}scripts/kct`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const parsedData = await response.json();
                setKCTData(parsedData);
                setKCTLoading(false);
                console.log("fetchKCT:", parsedData);
            } catch (err) {
                console.err("Error fetching KCT:", err)
                setKCTLoading(false);
            }
        })();
    }, []);

    return { kctData, kctLoading }
}

export default useFetchKCT;