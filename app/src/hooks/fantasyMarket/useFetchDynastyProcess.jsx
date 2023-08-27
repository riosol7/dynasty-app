import { useEffect, useState } from "react";
import Papa from "papaparse";

const useFetchDynastyProcess = () => {
    const [dpData, setDPData] = useState([]);
    const [dpLoading, setDPLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(process.env.REACT_APP_DYNASTY_PROCESS_CSV);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const csvText = await response.text();
                Papa.parse(csvText, {
                    header: true, // Treat the first row as headers
                    skipEmptyLines: true,
                    complete: (result) => {
                    setDPData(result.data);
                    setDPLoading(false);
                    },
                    error: (error) => {
                    console.error('Error parsing CSV:', error.message);
                    setDPLoading(false);
                    },
                });
            } catch (error) {
                console.error('Error fetching CSV:', error);
                setDPLoading(false);
            };
        })();
    }, []);

    return { dpData, dpLoading };
};

export default useFetchDynastyProcess;