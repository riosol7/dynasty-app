import React from "react";
import { Icon } from "@iconify/react";
import DynastyRow from "../components/rankings/dynasty/DynastyRow";

function SortHeader({ sort, asc, setAsc, handleSort, label }) {
    return (
        <div className="col-sm-1 d-flex align-items-center">
            {sort === label || (label === "TOTAL" && sort === "TEAM") ? (
                <SortIcon onClick={() => setAsc(!asc)} asc={asc} label={label} />
            ) : (
                <p className="m-0 StandingCell" onClick={() => handleSort(label)}>{label}</p>
            )}
        </div>
    );
};
function SortIcon({ onClick, asc, label }) {
    return (
        <div className="d-flex align-items-center">
            <p className="m-0 StandingCell" onClick={onClick}>{label}</p>
            <Icon icon={`bi:caret-${asc ? "down" : "up"}-fill`} style={{color: "#a9dfd8"}}/>
        </div>
    );
};

export default function DynastyRankingsUI({
  asc,
  handleSort,
  processedRosters,
  setAsc,
  sort,
}) {
    return (
        <div className="">
            <div className="mt-2">
                <div className="d-flex py-3" style={{borderBottom: ".5px solid #2a2c3e", fontSize: ".7rem", color: "#7d91a6"}}>
                <div className="col-sm-7 d-flex align-items-center">
                    <div className="col-sm-1 d-flex align-items-center">
                        <p className="m-0">RANK</p>
                    </div>
                    <p className="m-0 StandingCell">TEAM</p>
                </div>
                <SortHeader
                sort={sort}
                asc={asc}
                setAsc={setAsc}
                handleSort={handleSort}
                label="TOTAL"
                />
                <SortHeader
                sort={sort}
                asc={asc}
                setAsc={setAsc}
                handleSort={handleSort}
                label="QB"
                />
                <SortHeader
                sort={sort}
                asc={asc}
                setAsc={setAsc}
                handleSort={handleSort}
                label="RB"
                />
                <SortHeader
                sort={sort}
                asc={asc}
                setAsc={setAsc}
                handleSort={handleSort}
                label="WR"
                />
                <SortHeader
                sort={sort}
                asc={asc}
                setAsc={setAsc}
                handleSort={handleSort}
                label="TE"
                />
                </div>
            </div>
            <div>
                {processedRosters?.[`${sort.toLowerCase()}Rank`].sort((a, b) => (asc ? a.rank - b.rank : b.rank - a.rank)).map((roster, i) => (
                    <DynastyRow key={i} roster={roster} sort={sort}/>
                ))}
            </div>
        </div>
    );
}