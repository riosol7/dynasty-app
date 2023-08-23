import { useState, useEffect } from "react";

const useFetchTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loadTransactions, setLoadTransactions] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const call = await fetch(`http://localhost:5000/league/transactions`);
                const parsedTransactions = await call.json();
                setTransactions(parsedTransactions);
                setLoadTransactions(false);
                console.log("fetchTransactions:", parsedTransactions);
            } catch (err) {
                console.log(err);
            };
        })();
    }, []);

    return { transactions, loadTransactions };
};

export default useFetchTransactions;