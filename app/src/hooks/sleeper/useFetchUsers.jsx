import { useState, useEffect } from "react";

const useFetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [loadUsers, setLoadUsers] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const call = await fetch(`${process.env.REACT_APP_SLEEPER_BASE_API}league/${process.env.REACT_APP_LEAGUE_ID}/users`);
                const parsedData = await call.json();
                setUsers(parsedData);
                setLoadUsers(false);
                console.log("fetchUsers:", parsedData);
            } catch (err) {
                console.log(err);
            };
        })();
    }, []);

    return { users, loadUsers };
};

export default useFetchUsers;