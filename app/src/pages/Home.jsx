import React from "react";
import Overview from "../layouts/Overview";

export default function Home ({
    activityBar,
    foundHistory,
    league,
    loadLeague,
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
}) {
    
    return (
        <div className="home">
            {loadPlayers && loadOwners && loadRosters && loadLeague ? <div style={{height:"100vh"}}></div>
            :
                <Overview
                    activityBar={activityBar}
                    foundHistory={foundHistory}
                    league={league}
                    loadLeague={loadLeague}
                    loadOwners={loadOwners}
                    loadRosters={loadRosters}
                    loadTransactions={loadTransactions}
                    matches={matches}
                    owners={owners}
                    players={players}
                    rosters={rosters}
                    setActivityBar={setActivityBar}
                    transactions={transactions}
                />
            }
        </div>
    );
}