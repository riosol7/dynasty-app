import React from 'react';
import LeagueNavigation from '../components/LeagueNavigation';
import MVP from "../components/MVP";
import Rankings from "../components/Rankings";
import Market from '../components/Market';
import { Icon } from '@iconify/react';

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
        <div className="d-flex">
            <div className="py-3 px-5" style={{minWidth:"100%"}}>
                <LeagueNavigation
                    league={league}
                    loadLeague={loadLeague}
                    activityBar={activityBar}
                    setActivityBar={setActivityBar}
                />
                <div className="my-5"> 
                    <div className="d-flex align-items-center justify-content-between mb-3"> 
                        <div className="d-flex align-items-center">
                            <Icon icon="fluent:star-line-horizontal-3-24-regular" style={{color:"#a9dfd8", fontSize:"1.1rem"}}/>
                            <p className="m-0 mx-1 bold">MVPs</p>
                        </div>
                        <div id="LA" className="p-2">
                            <Icon icon="material-symbols:arrow-right-alt-rounded" style={{fontSize:"1.5rem",color:"#cbcbcb"}}/>
                        </div>
                    </div>
                    <MVP
                        findLogo={findLogo}
                        getTotalPts={getTotalPts}
                        league={league}
                        loadRosters={loadRosters}
                        matches={matches}
                        owners={owners}
                        players={players}
                        rosters={rosters}
                    />
                </div>
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
        </div>
      
    )
}
