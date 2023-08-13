import React from "react";
import MatchupSlider from "../components/sliders/MatchupSlider";
import WeeklyStatsChart from "../components/charts/WeeklyStatsChart";

export default function MatchupUI({
    findLogo,
    findRecord,
    findRosterByID,
    findWeeklyMatchups,
    foundHistory,
    handleWeeklyMatch,
    id,
    league,
    loadLeague,
    openModal,
    players,
    processedRosters,
    weeklyMatch
}) {
    return (
        <div className="my-4">
            <div className="d-flex justify-content-between bold" style={{marginBottom:"8px"}}>
                <p className="m-0" style={{color:"lightgrey"}}>WEEKLY BREAKDOWN</p>
                <select className="" onChange={handleWeeklyMatch} value={weeklyMatch} style={{color:"#fff", background:"inherit", border:"none"}}>
                    <option value={league.season}>{league.season}</option>
                    {league.history.map((l,i) =>
                        <option key={i} value={l.year}>{l.year}</option>
                    )}
                </select>
            </div>
            <MatchupSlider
                findLogo={findLogo}
                findRecord={findRecord}
                findRosterByID={findRosterByID}
                findWeeklyMatchups={findWeeklyMatchups}
                foundHistory={foundHistory}
                id={id}
                league={league}
                loadLeague={loadLeague}
                openModal={openModal}
                players={players}
                processedRosters={processedRosters}
                weeklyMatch={weeklyMatch}
            />
            <div className="my-4">
                <WeeklyStatsChart
                    findRosterByID={findRosterByID}
                    foundHistory={foundHistory}
                    id={id}
                    processedRosters={processedRosters}
                    weeklyMatch={weeklyMatch}
                />
            </div>
        </div>
    )
}