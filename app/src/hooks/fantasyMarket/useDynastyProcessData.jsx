import { useEffect, useState } from "react";
import Papa from "papaparse";

const useDynastyProcessData = () => {
    const [dpData, setDPData] = useState([]);
    const [dpLoading, setDPLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await fetch(
            'https://raw.githubusercontent.com/dynastyprocess/data/master/files/values.csv'
        );

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
        }
    };

    return { dpData, dpLoading };
};

export default useDynastyProcessData;