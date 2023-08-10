import React, { useState } from "react";

import Summary from "./Summary";
import Dynasty from "./Dynasty";
import Power from "./Power";
import { 
    getTotalPts,
    lineupEfficiency,
    roundToHundredth,
    winPCT 
} from "../utils";

export default function OwnerBody({
    findLogo,
    findPlayer,
    findRecord,
    findRosterByID,
    foundHistory,
    id,
    isOdd,
    league,
    loadLeague,
    loadRosters,
    matchups,
    openModal,
    owner,
    players,
    processedRosters,
    rosters,
}) {

    const [tab, setTab] = useState("Summary")

    let foundMyMatchups = matchups && matchups.map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
        if(team.filter(owner => owner.roster_id === Number(id)).length > 0){
            return team
        }  
        return acc
    })).map(match => match.sort((a,b) => b.points - a.points))

    let foundStats = processedRosters?.totalRoster?.find(roster => roster.roster_id === Number(id)).settings

    const handleSzn = (yr) => {
        let foundSzn = league.history.filter(l => l.year === yr).map((l,) => 
          l.rosters.sort((a,b) => {
            if(a.settings.wins === b.settings.wins) {
              return Number(b.settings.fpts + "." + b.settings.fpts_decimal) - Number(a.settings.fpts + "." + a.settings.fpts_decimal);
            } else {
              return b.settings.wins - a.settings.wins
            }
          }).map((roster, idx) => ({...roster, rank:idx+1}))
        )
        return foundSzn[0].filter(team => team.roster_id === Number(id))
    }

    let totalPtsPerGame = (p ,s) => {
        if(s === "All Time"){
            return roundToHundredth(Number(p/(foundHistory(id).allTime.w + foundHistory(id).allTime.l))) 
        } else if(Number(s) <= 2020){
            return roundToHundredth(Number(p/13))
        } else if(Number(s) > 2020){
            return roundToHundredth(Number(p/14))
        } else if(s === league.season){
            return roundToHundredth(Number(p/(foundStats.losses + foundStats.wins + foundStats.ties)))
        }
    }    

    return (
        <div>
            <div className="d-flex align-items-center">
                {
                    tab === "Summary" ?
                        <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                            <p className="m-0">Summary</p>
                        </div>
                    :
                        <div className="pb-2 px-3" onClick={() => setTab("Summary")}>
                            <p className="m-0">Summary</p>
                        </div>
                }
                {
                    tab === "Dynasty" ?
                        <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                            <p className="m-0">Dynasty</p>
                        </div>
                    :
                        <div className="pb-2 px-3" onClick={() => setTab("Dynasty")}>
                            <p className="m-0">Dynasty</p>
                        </div>
                }
                {
                    tab === "Power" ?
                        <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                            <p className="m-0">Power</p>
                        </div>
                    :
                        <div className="pb-2 px-3" onClick={() => setTab("Power")}>
                            <p className="m-0">Power</p>
                        </div>
                }
            </div>
            <div className="">
                {
                    tab === "Summary" ?
                        <Summary
                            findLogo={findLogo}
                            findPlayer={findPlayer}
                            findRecord={findRecord}
                            findRosterByID={findRosterByID}
                            foundHistory={foundHistory}
                            foundMyMatchups={foundMyMatchups}
                            getTotalPts={getTotalPts}
                            handleSzn={handleSzn}
                            id={id}
                            isOdd={isOdd}
                            league={league}
                            lineupEfficiency={lineupEfficiency}
                            loadLeague={loadLeague}
                            loadRosters={loadRosters}
                            openModal={openModal}
                            owner={owner}
                            players={players}
                            processedRosters={processedRosters}
                            rosters={rosters}
                            roundToHundredth={roundToHundredth}
                            tab={tab}
                            totalPtsPerGame={totalPtsPerGame}
                            winPCT={winPCT}
                        />
                    : tab === "Dynasty" ?
                        <Dynasty
                            findLogo={findLogo}
                            findPlayer={findPlayer}
                            foundHistory={foundHistory}
                            getTotalPts={getTotalPts}
                            id={id}
                            isOdd={isOdd}
                            league={league}
                            loadLeague={loadLeague}
                            loadRosters={loadRosters}
                            owner={owner}
                            players={players}
                            processedRosters={processedRosters}
                            roundToHundredth={roundToHundredth}
                            tab={tab}
                            winPCT={winPCT}
                        />
                    : tab === "Power" ?
                        <Power
                            findLogo={findLogo}
                            findPlayer={findPlayer}
                            findRecord={findRecord}
                            findRosterByID={findRosterByID}
                            foundHistory={foundHistory}
                            foundMyMatchups={foundMyMatchups}
                            getTotalPts={getTotalPts}
                            handleSzn={handleSzn}
                            id={id}
                            isOdd={isOdd}
                            league={league}
                            lineupEfficiency={lineupEfficiency}
                            loadLeague={loadLeague}
                            loadRosters={loadRosters}
                            openModal={openModal}
                            owner={owner}
                            players={players}
                            processedRosters={processedRosters}
                            roundToHundredth={roundToHundredth}
                            tab={tab}
                            totalPtsPerGame={totalPtsPerGame}
                            winPCT={winPCT}
                            // findRosterByName={findRosterByName} -- NEED TO CHECK
                            // weeklyMatch={weeklyMatch}
                            // findWeeklyMatchups={findWeeklyMatchups}
                            // handleWeeklyMatch={handleWeeklyMatch}  
                            // vs={vs}
                            // handleAllPlay={handleAllPlay}
                            // handleVS={handleVS}
                            // selectAllPlay={selectAllPlay}
                        />
                    :<></>
                }
            </div>
        </div>
    )
}