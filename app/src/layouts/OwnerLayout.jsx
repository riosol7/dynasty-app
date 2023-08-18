import React from "react";
import OwnerHeader from "../components/dashboard/OwnerHeader";

const OwnerLayout = ({ children, league, players, roster, setTab, tab, topDraftPick }) => {
    return (
        <div>
            <OwnerHeader 
                league={league}
                players={players}
                roster={roster}
                topDraftPick={topDraftPick}
            />
            <div className="d-flex align-items-center">
                {tab === "Summary" ?
                    <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                        <p className="m-0">Summary</p>
                    </div>
                :
                    <div className="pb-2 px-3" onClick={() => setTab("Summary")}>
                        <p className="m-0">Summary</p>
                    </div>
                }
                {tab === "Dynasty" ?
                    <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                        <p className="m-0">Dynasty</p>
                    </div>
                :
                    <div className="pb-2 px-3" onClick={() => setTab("Dynasty")}>
                        <p className="m-0">Dynasty</p>
                    </div>
                }
                {tab === "Power" ?
                    <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                        <p className="m-0">Power</p>
                    </div>
                :
                    <div className="pb-2 px-3" onClick={() => setTab("Power")}>
                        <p className="m-0">Power</p>
                    </div>
                }
            </div>
            {children}
        </div>
    );
};

export default OwnerLayout;