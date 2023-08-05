import React from "react";

import Overview from "../components/Home/Overview";
// import Analytics from "../components/Analytics";
// import Tabs from "../components/Tabs";

// import { Icon } from '@iconify/react';

export default function Home (props) {
    // const [dashboard, setDashboard] = useState("Overview")
    const loadLeague=props.loadLeague
    const league=props.league
    const loadRosters=props.loadRosters
    const rosters=props.rosters
    const loadTransactions=props.loadTransactions
    const transactions=props.transactions
    const activityBar=props.activityBar
    const setActivityBar=props.setActivityBar
    const findLogo=props.findLogo
    const findPlayer=props.findPlayer
    const players=props.players
    const getTotalPts=props.getTotalPts
    const findRosterByName=props.findRosterByName
    const findRosterByID=props.findRosterByID
    const handleRostersBySzn=props.handleRostersBySzn
    const foundHistory=props.foundHistory
    const roundToHundredth=props.roundToHundredth
    const winPCT=props.winPCT
    const lineupEfficiency=props.lineupEfficiency
    const toDateTime=props.toDateTime
    return (
        <>
            { 
                loadRosters && loadLeague ? 
                    <div style={{height:"100vh"}}></div>
                :
                    <div className="" style={{paddingLeft:"5.7em",width:"100%",background:"#0f0f0f",height:"100%"}}>
                        <div className="" style={{background:"black",minHeight:"100%",}}>
                            {/* { dashboard === "Overview" ? */}
                                <Overview
                                    loadRosters={loadRosters}
                                    rosters={rosters}
                                    loadTransactions={loadTransactions}
                                    transactions={transactions}
                                    loadLeague={loadLeague}
                                    league={league}
                                    activityBar={activityBar}
                                    setActivityBar={setActivityBar}
                                    findLogo={findLogo}
                                    findPlayer={findPlayer}
                                    players={players}
                                    getTotalPts={getTotalPts}
                                    findRosterByName={findRosterByName}
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