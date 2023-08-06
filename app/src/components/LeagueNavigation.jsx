import React from "react";
import { Icon } from "@iconify/react";

function LeagueStatus({ league }) {
    if (league.status === "pre_draft") {
        return (
            <p className="m-0">Pre Draft <span style={{ color: "whitesmoke", marginLeft: "2px" }}>{league.season}</span></p>
        );
    } else if (league.status === "complete") {
        return (
            <p className="m-0">Post Season <span style={{ color: "whitesmoke", marginLeft: "2px" }}>{league.season}</span></p>
        );
    }
    return null;
}

function LeagueSettings({ league }) {
    if (league && league.settings) {
        return (
            <div className="d-flex align-items-center">
                <p className="m-0 mx-4">Division <span style={{ color: "whitesmoke", marginLeft: "2px" }}>{league.settings.divisions}</span></p>
                <p className="m-0">Roster <span style={{ color: "whitesmoke", marginLeft: "2px" }}>{league.total_rosters}</span></p>
            </div>
        );
    }
    return null;
}

export default function LeagueNavigation({
    activityBar,
    league,
    loadLeague,
    setActivityBar,
}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";

    return (
        <div className="my-2">
            {loadLeague ? (
                <p>Loading </p>
            ) : (
                <div className="d-flex align-items-top justify-content-between">
                    <div className="d-flex align-items-center flex-wrap">
                        <a href={`/Home`} className="cellLink" style={{ width: "270px" }}>
                            <div className="d-flex align-items-center">
                                <div className="d-flex justify-content-center" style={{ marginRight: "1em" }}>
                                    <img className="leagueLogo rounded" style={{ width: "36px" }} alt="avatar" src={`${avatarBaseURL}${league.avatar}`} />
                                </div>
                                <p className="bold m-0" style={{ fontSize: "1.2rem" }}>{league.name}</p>
                                {/* <p className="m-0 mx-2 bold" style={{ color: "#b0b0b2" }}>{league.season} {league.status === "pre_draft" ? "Pre-Draft" : ""}</p> */}
                            </div>
                        </a>
                        <div className="d-flex align-items-center" style={{ fontSize: "12.5px", color: "grey", marginLeft: "4.2em" }}>
                            <LeagueStatus league={league} />
                            <LeagueSettings league={league} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center p-2" style={{ background: "#0f0f0f", borderRadius: "25%", width: "42px", height: "42px" }}>
                        <Icon icon="ion:search-outline" className="" style={{ fontSize: "18px" }} />
                    </div>
                    <div id="LA" className="p-2">
                        <Icon onClick={() => setActivityBar(!activityBar)} icon="fe:activity" style={{ color: "#a9dfd8", fontSize: "1.5em" }} />
                    </div>
                </div>
            )}
        </div>
    );
}