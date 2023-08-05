import React from "react";

import Overview from "../components/Home/Overview";
// import Analytics from "../components/Analytics";
// import Tabs from "../components/Tabs";

// import { Icon } from '@iconify/react';

export default function Home (props) {
    // const [dashboard, setDashboard] = useState("Overview")
    const activityBar=props.activityBar
    const findRosterByID=props.findRosterByID
    const findLogo=props.findLogo
    const findPlayer=props.findPlayer
    const foundHistory=props.foundHistory
    const getTotalPts=props.getTotalPts
    const handleRostersBySzn=props.handleRostersBySzn
    const league=props.league
    const lineupEfficiency=props.lineupEfficiency
    const loadLeague=props.loadLeague
    const loadOwners=props.loadOwners
    const loadRosters=props.loadRosters
    const loadTransactions=props.loadTransactions
    const matches=props.matches
    const owners=props.owners
    const players=props.players
    const rosters=props.rosters
    const roundToHundredth=props.roundToHundredth
    const setActivityBar=props.setActivityBar
    const toDateTime=props.toDateTime
    const transactions=props.transactions
    const winPCT=props.winPCT
    return (
        <>
            { 
                loadOwners && loadRosters && loadLeague ? 
                    <div style={{height:"100vh"}}></div>
                :
                    <div className="" style={{paddingLeft:"5.7em",width:"100%",background:"#0f0f0f",height:"100%"}}>
                        <div className="" style={{background:"black",minHeight:"100%",}}>
                            {/* { dashboard === "Overview" ? */}
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
                            {/* :
                                <Analytics
                                    // loadLeague={loadLeague}
                                    // league={league}
                                    rosters={rosters}
                                    loadRosters={loadRosters}
                                />
                            } */}
                        </div>
                    </div>
            }
        </>
    );
}