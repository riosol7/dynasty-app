import React from "react";
import LoadDashboard from "../../components/loading/LoadDashboard";
import DashboardLayout from "../../layouts/DashboardLayout";
import MarketContainer from "../../containers/MarketContainer";
import MVPContainer from "../../containers/MVPContainer";
import RankingsContainer from "../../containers/RankingsContainer";
import { processRosters } from "../../helpers";

function MainDashboard({
    foundHistory,
    league,
    loadLeague,
    loadOwners,
    loadPlayers,
    loadRosters,
    loadTransactions,
    matches,
    owners,
    players,
    rosters,
    transactions,
}) {
    const processedRosters = processRosters(rosters, players, owners);
    const loading = loadPlayers && loadOwners && loadRosters && loadLeague && loadTransactions;

    return (
        loading ? <LoadDashboard/> :
        <DashboardLayout league={league}>
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
                owners={owners}
                processedRosters={processedRosters}
            />
        </DashboardLayout>
    )
}

export default MainDashboard;