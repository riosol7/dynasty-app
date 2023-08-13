import React from "react";
import { Routes ,Route } from "react-router-dom";

import Home from "../pages/Home";
import Owner from "../pages/Owner";

const AppRouter = ({ 
    activityBar, 
    foundHistory,
    league, 
    loadLeague, 
    loadMatches, 
    loadOwners, 
    loadPlayers, 
    loadRosters, 
    loadTransactions, 
    matches, 
    matchups,
    owners, 
    players, 
    rosters, 
    setActivityBar, 
    transactions,
}) => {
    return (
        <Routes>
            <Route
                exact path={`/Home`}
                element={<Home {...{
                    activityBar,
                    foundHistory,
                    league,
                    loadLeague,
                    loadMatches,
                    loadOwners,
                    loadPlayers,
                    loadRosters,
                    loadTransactions,
                    matches,
                    owners,
                    players,
                    rosters,
                    setActivityBar,
                    transactions,
                }} />}
            />
            <Route
                exact path={`/Owner/:id`}
                element={<Owner {...{
                    activityBar,
                    foundHistory,
                    league,
                    loadLeague,
                    loadMatches,
                    loadPlayers,
                    loadRosters,
                    matches,
                    matchups,
                    owners,
                    players,
                    rosters,
                    setActivityBar,
                }} />}
            />
        </Routes>
    );
}

export default AppRouter;