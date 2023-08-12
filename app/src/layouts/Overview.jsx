import React from "react";
import LeagueNavigation from "./LeagueNavigation";
import MarketContainer from "../containers/MarketContainer";
import MVPContainer from "../containers/MVPContainer";
import RankingsContainer from "../containers/RankingsContainer";

export default function Overview({
    activityBar,
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
        <div className="py-3 px-5">
            <LeagueNavigation
                activityBar={activityBar}
                league={league}
                loadLeague={loadLeague}
                setActivityBar={setActivityBar}
            />
            <MVPContainer
                getTotalPts={getTotalPts}
                league={league}
                loadLeague={loadLeague}
                loadRosters={loadRosters}
                matches={matches}
                owners={owners}
                players={players}
                rosters={rosters}
            />
            <MarketContainer
                findPlayer={findPlayer}
                league={league}
                loadOwners={loadOwners}
                loadTransactions={loadTransactions}
                owners={owners}
                players={players}
                roundToHundredth={roundToHundredth}
                transactions={transactions}
                toDateTime={toDateTime}
            />
            <RankingsContainer
                findPlayer={findPlayer}
                findRosterByID={findRosterByID}
                foundHistory={foundHistory}
                handleRostersBySzn={handleRostersBySzn}
                league={league}
                lineupEfficiency={lineupEfficiency}
                loadLeague={loadLeague}
                loadRosters={loadRosters}
                owners={owners}
                players={players}
                rosters={rosters}
                roundToHundredth={roundToHundredth}
                winPCT={winPCT}
            />
        </div>
    )
}
