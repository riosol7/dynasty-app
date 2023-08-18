import React from "react";
import { Routes, Route } from "react-router-dom";

import MainDashboard from "../pages/Dashboard/MainDashboard";
import OwnerDashboard from "../pages/Dashboard/OwnerDashboard";

const AppRouter = ({ 
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
    transactions,
}) => {
    return (
        <Routes>
            <Route
                exact path={`/`}
                element={<MainDashboard {...{
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
                    transactions,
                }} />}
            />
            <Route
                exact path={`/Owner/:id`}
                element={<OwnerDashboard {...{
                    foundHistory,
                    league,
                    loadLeague,
                    loadMatches,
                    loadOwners,
                    loadPlayers,
                    loadRosters,
                    matches,
                    matchups,
                    owners,
                    players,
                    rosters,
                }} />}
            />
        </Routes>
    );
}

export default AppRouter;