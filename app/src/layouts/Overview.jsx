import React from 'react';
import LeagueNavigation from '../components/LeagueNavigation';
import Rankings from "../components/Rankings";
import Market from '../components/Market';
import MVPContainer from '../containers/MVPContainer';

export default function Overview({
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
        <div className="py-3 px-5">
            <LeagueNavigation
                activityBar={activityBar}
                league={league}
                loadLeague={loadLeague}
                setActivityBar={setActivityBar}
            />
            <MVPContainer
                findLogo={findLogo}
                getTotalPts={getTotalPts}
                league={league}
                loadLeague={loadLeague}
                loadRosters={loadRosters}
                matches={matches}
                owners={owners}
                players={players}
                rosters={rosters}
            />
            <div className="my-5">
                <Market
                    findLogo={findLogo}
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
            </div>
            <div className="">
                <Rankings
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
        </div>
    )
}
