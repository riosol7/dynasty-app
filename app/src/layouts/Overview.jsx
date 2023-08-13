import React from "react";
import LeagueNavigation from "./LeagueNavigation";
import MarketContainer from "../containers/MarketContainer";
import MVPContainer from "../containers/MVPContainer";
import RankingsContainer from "../containers/RankingsContainer";

export default function Overview({
    activityBar,
    foundHistory,
    league,
    loadLeague,
    loadOwners,
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
        <div className="py-3 px-5">
            <LeagueNavigation
                activityBar={activityBar}
                league={league}
                loadLeague={loadLeague}
                setActivityBar={setActivityBar}
            />
            <MVPContainer
                league={league}
                loadLeague={loadLeague}
                loadRosters={loadRosters}
                matches={matches}
                owners={owners}
                players={players}
                rosters={rosters}
            />
            <MarketContainer
                league={league}
                loadOwners={loadOwners}
                loadTransactions={loadTransactions}
                owners={owners}
                players={players}
                transactions={transactions}
            />
            <RankingsContainer
                foundHistory={foundHistory}
                league={league}
                loadLeague={loadLeague}
                loadRosters={loadRosters}
                owners={owners}
                players={players}
                rosters={rosters}
            />
        </div>
    )
}