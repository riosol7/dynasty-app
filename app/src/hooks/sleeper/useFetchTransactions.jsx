import { useState, useEffect } from "react";

const useFetchTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loadTransactions, setLoadTransactions] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const call = await fetch(`${process.env.REACT_APP_DEV_URL}league/transactions`);
                const parsedData = await call.json();
                setTransactions(parsedData);
                setLoadTransactions(false);
                console.log("fetchTransactions:", parsedData);
            } catch (err) {
                console.log(err);
            };
        })();
    }, []);

    return { transactions, loadTransactions };
};

export default useFetchTransactions;