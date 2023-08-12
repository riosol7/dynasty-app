import React from "react";
import { Routes ,Route } from "react-router-dom";

import Home from "../pages/Home";
import Owner from "../pages/Owner";

const AppRouter = ({ 
    activityBar, findPlayer, findRosterByID, 
    findRosterByName, foundHistory, getTotalPts, handleRostersBySzn,
    league, lineupEfficiency, loadLeague, loadMatches, 
    loadOwners, loadPlayers, loadRosters, loadTransactions, matches, matchups,
    owners, players, roundToHundredth, rosters, setActivityBar, toDateTime, 
    transactions, winPCT,

}) => {
    return (
        <Routes>
            <Route
                exact path={`/Home`}
                element={<Home {...{
                    activityBar,
                    findPlayer,
                    findRosterByID,
                    findRosterByName,
                    foundHistory,
                    getTotalPts,
                    handleRostersBySzn,
                    league,
                    lineupEfficiency,
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
                    roundToHundredth,
                    setActivityBar,
                    toDateTime,
                    transactions,
                    winPCT,
                }} />}
            />
            <Route
                exact path={`/Owner/:id`}
                element={<Owner {...{
                    activityBar,
                    findPlayer,
                    findRosterByID,
                    findRosterByName,
                    foundHistory,
                    getTotalPts,
                    handleRostersBySzn,
                    league,
                    lineupEfficiency,
                    loadLeague,
                    loadMatches,
                    loadPlayers,
                    loadRosters,
                    loadTransactions,
                    matches,
                    matchups,
                    owners,
                    players,
                    rosters,
                    roundToHundredth,
                    setActivityBar,
                    toDateTime,
                    transactions,
                    winPCT,
                }} />}
            />
        </Routes>
    );
}

export default AppRouter;
