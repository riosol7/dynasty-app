import React from "react";
import LeagueNavigation from "../components/navigation/LeagueNavigation";

const DashboardLayout = ({ children, league }) => {
    return (
        <div className="dashboard">
            <div className="py-3 px-5">
                <LeagueNavigation league={league}/>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout