import React from "react";
import LeagueNavigation from "./LeagueNavigation";
import MarketContainer from "../containers/MarketContainer";
import MVPContainer from "../containers/MVPContainer";
import RankingsContainer from "../containers/RankingsContainer";
import { processRosters } from "../helpers";

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
    const processedRosters = processRosters(rosters, players, owners);

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
                matches={matches}
                processedRosters={processedRosters}
            />
            <MarketContainer
                league={league}
                owners={owners}
                players={players}
                transactions={transactions}
            />
            <RankingsContainer
                foundHistory={foundHistory}
                league={league}
                loadLeague={loadLeague}
                loadRosters={loadRosters}
                processedRosters={processedRosters}
            />
        </div>
    )
}