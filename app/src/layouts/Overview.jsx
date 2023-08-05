import React from 'react';

import MVP from "../components/MVP";
import Rankings from "../components/Rankings";
import Market from '../components/Market';
import LeagueWidget from "../components/LeagueWidget";
import { Icon } from '@iconify/react';

export default function Overview(props) {
    const loadLeague=props.loadLeague
    const loadOwners=props.loadOwners
    const loadRosters=props.loadRosters 
    const loadTransactions=props.loadTransactions
    const transactions = props.transactions
    const rosters=props.rosters
    const league=props.league
    const activityBar=props.activityBar
    const setActivityBar=props.setActivityBar
    const findLogo=props.findLogo
    const findPlayer=props.findPlayer
    const matches=props.matches
    const owners=props.owners
    const players=props.players
    const getTotalPts=props.getTotalPts
    const findRosterByID=props.findRosterByID
    const handleRostersBySzn=props.handleRostersBySzn
    const foundHistory=props.foundHistory
    const roundToHundredth=props.roundToHundredth
    const winPCT=props.winPCT
    const lineupEfficiency=props.lineupEfficiency
    const toDateTime=props.toDateTime
    return (
        <>
            <div className="d-flex">
                <div className="py-3 px-5" style={{width:"100%"}}>  
                {/* <div className="col-sm-10 px-5 pt-3">   */}

                    <div className="my-2" style={{}}>
                        <LeagueWidget
                            league={league}
                            loadLeague={loadLeague}
                            activityBar={activityBar}
                            setActivityBar={setActivityBar}
                        />
                    </div>
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
       </>
    )
}