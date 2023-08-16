import React from "react";
import PlayoffBracket from "./PlayoffBracket";
import ToiletBracket from "./ToiletBracket";
import { findRosterByID } from "../../helpers";

function WeekLabel({ selectSzn, weekNumber }) {
    const adjustedWeek = Number(selectSzn) <= 2020 ? weekNumber : weekNumber + 1;
    return <p className="m-0 text-center">{`Week ${adjustedWeek}`}</p>;
}
  
function BracketSection({ sectionTitle, selectSzn, children }) {
    return (
        <div>
            <p className="m-0 my-5" style={{ fontSize: "13.5px", color: "lightgrey" }}>{sectionTitle}</p>
            <div className="d-flex align-items-center" style={{ fontSize: "12.5px", color: "#7d91a6" }}>
                <div style={{ width: "250px" }}>
                    <WeekLabel selectSzn={selectSzn} weekNumber={14} />
                </div>
                <div className="mx-4" style={{ width: "250px" }}>
                    <WeekLabel selectSzn={selectSzn} weekNumber={15} />
                </div>
                <div style={{ width: "250px" }}>
                    <WeekLabel selectSzn={selectSzn} weekNumber={16} />
                </div>
            </div>
            <div className="">{children}</div>
        </div>
    );
}

export default function PostSeasonBracket({
    foundHistory,
    handleRostersBySzn,
    league,
    processedRosters,
    selectSzn,
}) {
    return (
        <div className="d-flex justify-content-center">
            <div className="">
                <BracketSection sectionTitle="PLAYOFFS" selectSzn={selectSzn}>
                    <PlayoffBracket
                        foundHistory={foundHistory}
                        handleRostersBySzn={handleRostersBySzn}
                        league={league}
                        processedRosters={processedRosters}
                        selectSzn={selectSzn} 
                    />
                </BracketSection>
                <BracketSection sectionTitle="TOILET BOWL" selectSzn={selectSzn}>
                    <ToiletBracket
                        findRosterByID={findRosterByID}
                        foundHistory={foundHistory}
                        handleRostersBySzn={handleRostersBySzn}
                        league={league}
                        processedRosters={processedRosters}
                        selectSzn={selectSzn} 
                    />
                </BracketSection>
            </div>
        </div>
    )
}