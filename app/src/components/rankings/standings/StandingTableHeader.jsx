import React from "react";
import { Icon } from "@iconify/react";

function SortIcon({ asc, onClick }) {
    return (
        <div className="d-flex align-items-center" onClick={onClick}>
            <Icon icon={`bi:caret-${asc ? "up" : "down"}-fill`} style={{ color: "#a9dfd8" }}/>
        </div>
    );
}
  
function SortableHeader({ title, sortKey, asc, handleSort, setAsc, sort }) {
    const isSorted = sort === sortKey;
    const handleSortClick = () => {
        if (isSorted) {
            setAsc(!asc);
        } else {
            handleSort(sortKey);
        }
    };
    return (
        <div className={title === "RECORD" ? "col-sm-2 d-flex align-items-center" : "col-sm-1 d-flex align-items-center"}>
            <p className="m-0 StandingCell" onClick={handleSortClick}>{title}</p>
            {isSorted && <SortIcon asc={asc} onClick={handleSortClick} />}
      </div>
    );
}

export default function StandingTableHeader({asc, handleSort, setAsc, sort, division}) {
    return (
        <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
            <div className="col-sm-7 d-flex align-items-center"> 
                <div className="col-sm-1">
                    <SortableHeader
                        title="RANK"
                        sortKey="RANK"
                        asc={asc}
                        handleSort={handleSort}
                        setAsc={setAsc}
                        sort={sort}
                    />
                </div>
                <p className="m-0 StandingCell">{division === 1 ? "DIVISION 1" : division === 2 ? "DIVISION 2" : "TEAM"}</p>
            </div>
            <SortableHeader
                title="RECORD"
                sortKey="RECORD"
                asc={asc}
                handleSort={handleSort}
                setAsc={setAsc}
                sort={sort}
            />
            <SortableHeader
                title="PF"
                sortKey="PF"
                asc={asc}
                handleSort={handleSort}
                setAsc={setAsc}
                sort={sort}
            />
            <SortableHeader
                title="MAX PF"
                sortKey="MAX PF"
                asc={asc}
                handleSort={handleSort}
                setAsc={setAsc}
                sort={sort}
            />
            <SortableHeader
                title="PA"
                sortKey="PA"
                asc={asc}
                handleSort={handleSort}
                setAsc={setAsc}
                sort={sort}
            />
        </div>
    )
}