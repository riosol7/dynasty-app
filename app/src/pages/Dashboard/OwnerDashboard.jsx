import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoadDashboard from "../../components/loading/LoadDashboard";
import DashboardLayout from "../../layouts/DashboardLayout";
import OwnerLayout from "../../layouts/OwnerLayout";
import Summary from "../../components/dashboard/Summary";
import Dynasty from "../../components/dashboard/Dynasty";
import Power from "../../components/dashboard/Power";
import { processRosters } from "../../helpers";
import { roundToHundredth } from "../../utils";

function OwnerDashboard({
    foundHistory,
    league,
    loadLeague,
    loadMatches,
    loadOwners,
    loadPlayers,
    loadRosters,
    matches,
    // matchups,
    owners,
    players,
    rosters,
}) {
    const {id} = useParams();
    const [tab, setTab] = useState("Summary");

    const processedRosters = processRosters(rosters, players, owners);
    const roster = processedRosters?.totalRoster?.find(roster => roster.roster_id === Number(id));
    const loading = (roster === undefined || loadLeague || loadMatches || loadOwners || loadPlayers || loadRosters) ? true : false;
    const topDraftPick = league?.draft?.picks?.filter(p => p.roster_id === Number(id))[0];
    const foundMyMatchups = foundHistory(id)?.foundMyMatchups;

    const findRecord = (matches, week) => {
        let w = 0;
        let l = 0;
        let record;

        matches?.filter((_, idx) => idx <= week).forEach(team => {
            if (team[0].matchup_id === null || (team[0].points === 0 && team[1].points === 0)){
                return record;
            
            } else if (team[0].roster_id === Number(id)) {
                w++;
                record = w + " - " + l;
                return record;
            }
                l ++;
                record = w + " - " + l;
                return record;
        });

        return {
            record: record,
            w: w,
            l: l
        }
    };

    const totalPtsPerGame = (pts ,season) => {
        if (season === "All Time") {
            return roundToHundredth(Number(pts/(foundHistory(id).allTime.w + foundHistory(id).allTime.l)));
        } else if(Number(season) <= 2020){
            return roundToHundredth(Number(pts/13));
        } else if(Number(season) > 2020){
            return roundToHundredth(Number(pts/14));
        } else if(season === league.season){
            return roundToHundredth(Number(pts/(roster.settings.losses + roster.settings.wins + roster.settings.ties)));
        };
    };
    
    return (
        loading ? <LoadDashboard/> :
        <DashboardLayout league={league}>
            <OwnerLayout 
                league={league} 
                players={players} 
                roster={roster}
                setTab={setTab}
                tab={tab}
                topDraftPick={topDraftPick}
            >
                {tab === "Summary" ?
                    <Summary
                        findRecord={findRecord}
                        foundHistory={foundHistory}
                        foundMyMatchups={foundMyMatchups}
                        id={id}
                        league={league}
                        matches={matches}
                        players={players}
                        processedRosters={processedRosters}
                        roster={roster}
                        tab={tab}
                        totalPtsPerGame={totalPtsPerGame}
                    />
                : tab === "Dynasty" ?
                    <Dynasty
                        id={id}
                        league={league}
                        matches={matches}
                        processedRosters={processedRosters}
                        roster={roster}
                        tab={tab}
                    />
                : tab === "Power" ?
                    <Power
                        findRecord={findRecord}
                        foundHistory={foundHistory}
                        foundMyMatchups={foundMyMatchups}
                        id={id}
                        league={league}
                        matches={matches}
                        players={players}
                        processedRosters={processedRosters}
                        roster={roster}
                        tab={tab}
                        totalPtsPerGame={totalPtsPerGame}
                    />
                :<></>
                }
            </OwnerLayout>
        </DashboardLayout>
    )
}

export default OwnerDashboard