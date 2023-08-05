import { useState, useEffect } from "react";

const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loadTransactions, setLoadTransactions] = useState(true);

    useEffect(() => {
        getTransactions();
        // eslint-disable-next-line
    }, []);

    const getTransactions = async () => {
        try{
            const call = await fetch(`http://localhost:5000/league/transactions`);
            const parsedTransactions = await call.json();
            setTransactions(parsedTransactions);
            setLoadTransactions(false);
            console.log("getTransactions:",parsedTransactions);
        } catch (err) {
            console.log(err);
        }
    };

    return { transactions, loadTransactions, getTransactions };
};

export default useTransactions;