import { useEffect, useState } from "react";
import Papa from "papaparse";

const useFetchFantasyPro = () => {
    const [fpData, setFPData] = useState([]);
    const [fpLoading, setFPLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/dynastyprocess/data/master/files/fp_latest_weekly.csv');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const csvText = await response.text();
    
                Papa.parse(csvText, {
                    header: true, // Treat the first row as headers
                    skipEmptyLines: true,
                    complete: (result) => {
                    setFPData(result.data);
                    setFPLoading(false);
                    },
                    error: (error) => {
                    console.error('Error parsing CSV:', error.message);
                    setFPLoading(false);
                    },
                });
            } catch (error) {
                console.error('Error fetching CSV:', error);
                setFPLoading(false);
            };
        })();
    }, []);

    return { fpData, fpLoading };
};

export default useFetchFantasyPro;