import React from "react";
import { Routes ,Route } from "react-router-dom";

import Home from "../pages/Home";
import Owner from "../pages/Owner";

const AppRouter = ({ 
    activityBar, findLogo, findPlayer, findRosterByID, 
    findRosterByName, foundHistory, getTotalPts, handleRostersBySzn,
    league, lineupEfficiency, loadLeague, loadMatches, 
    loadPlayers, loadRosters, loadTransactions, matches, 
    players, roundToHundredth, rosters, setActivityBar, toDateTime, 
    transactions, winPCT,

}) => {
    return (
        <Routes>
            <Route 
                exact path={`/Home`} 
                element={ 
                    <Home 
                        activityBar={activityBar}
                        findLogo={findLogo}
                        findPlayer={findPlayer}
                        findRosterByID={findRosterByID}
                        findRosterByName={findRosterByName}
                        foundHistory={foundHistory}
                        getTotalPts={getTotalPts}
                        handleRostersBySzn={handleRostersBySzn}
                        league={league}
                        lineupEfficiency={lineupEfficiency}
                        loadLeague={loadLeague}
                        loadMatches={loadMatches}
                        loadPlayers={loadPlayers}
                        loadRosters={loadRosters}
                        loadTransactions={loadTransactions}
                        matches={matches}
                        players={players}
                        rosters={rosters}
                        roundToHundredth={roundToHundredth}
                        setActivityBar={setActivityBar}
                        toDateTime={toDateTime}
                        transactions={transactions}
                        winPCT={winPCT}
                    />  
                }>
            </Route>
            <Route 
                exact path={`/Owner/:id`} 
                element={ 
                    <Owner 
                        activityBar={activityBar}
                        findLogo={findLogo}
                        findPlayer={findPlayer}
                        findRosterByID={findRosterByID}
                        findRosterByName={findRosterByName}
                        foundHistory={foundHistory}
                        getTotalPts={getTotalPts}
                        handleRostersBySzn={handleRostersBySzn}
                        league={league}
                        lineupEfficiency={lineupEfficiency}
                        loadLeague={loadLeague}
                        loadMatches={loadMatches}
                        loadPlayers={loadPlayers}
                        loadRosters={loadRosters}
                        loadTransactions={loadTransactions}
                        matches={matches}
                        players={players}
                        rosters={rosters}
                        roundToHundredth={roundToHundredth}
                        setActivityBar={setActivityBar}
                        toDateTime={toDateTime}
                        transactions={transactions}
                        winPCT={winPCT}
                    />  
                }>
            </Route>
        </Routes>
    );
}

export default AppRouter;
