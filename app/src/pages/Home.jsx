import React from "react";
import Overview from "../components/Home/Overview";

export default function Home ({
    activityBar,
    findLogo,
    findPlayer,
    findRosterByID,
    foundHistory,
    getTotalPts,
    handleRostersBySzn,
    league,
    lineupEfficiency,
    loadLeague,
    loadOwners,
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
}) {
    
    return (
        <div className="overview">
            { 
                loadOwners && loadRosters && loadLeague ? 
                    <div style={{height:"100vh"}}></div>
                :
                    
                    <Overview
                        loadRosters={loadRosters}
                        rosters={rosters}
                        loadOwners={loadOwners}
                        loadTransactions={loadTransactions}
                        transactions={transactions}
                        loadLeague={loadLeague}
                        league={league}
                        activityBar={activityBar}
                        setActivityBar={setActivityBar}
                        findLogo={findLogo}
                        findPlayer={findPlayer}
                        matches={matches}
                        owners={owners}
                        players={players}
                        getTotalPts={getTotalPts}
                        findRosterByID={findRosterByID}
                        handleRostersBySzn={handleRostersBySzn}
                        foundHistory={foundHistory}
                        roundToHundredth={roundToHundredth}
                        winPCT={winPCT}
                        lineupEfficiency={lineupEfficiency}
                        toDateTime={toDateTime}
                    />
            }
        </div>
    );
}