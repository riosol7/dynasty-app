import React, { useState, useEffect } from "react";
import MarketUI from "../ui/MarketUI";
import { processWaiverBids } from "../helpers";
import { filterWaiverBidsByPosition, findLogo, getSortedRecords } from "../utils";
import { Position } from "../constants";

export default function MarketContainer({
    league,
    owners,
    players,
    transactions,
}) {
    const [asc, setAsc] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [owner, setOwner] = useState("OWNER");
    const [position, setPosition] = useState("POSITION");
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [sort, setSort] = useState("DATE");

    const currentSeasonWaiverBids = processWaiverBids(transactions, owners, players, true);
    const historicalWaiverBids = processWaiverBids(league.history, owners, players, false);
    const waiverBids = historicalWaiverBids?.concat(currentSeasonWaiverBids).filter(bid => bid.player?.position !== "DEF" && bid.player?.position !== "K").sort((a, b) => a.created - b.created);
    const qbWaiver = filterWaiverBidsByPosition(waiverBids, Position.QB);
    const rbWaiver = filterWaiverBidsByPosition(waiverBids, Position.RB);
    const wrWaiver = filterWaiverBidsByPosition(waiverBids, Position.WR);
    const teWaiver = filterWaiverBidsByPosition(waiverBids, Position.TE);
    const waiverBidsFiltered = waiverBids?.filter(b=>{
        if (position === Position.QB) {
            return b.player.position === Position.QB;
        } else if (position === Position.RB) {
            return b.player.position === Position.RB;
        } else if (position === Position.WR) {
            return b.player.position === Position.WR;
        } else if (position === Position.TE) {
            return b.player.position === Position.TE;
        } else {
            return [];
        };
    }).filter(b => {
        if (owner !== "OWNER") {
            return b.creator === owner
        } else {
            return [];
        };
    });
    const records = getSortedRecords(waiverBidsFiltered, sort, asc, currentPage, recordsPerPage);
    const npage = Math.ceil(waiverBidsFiltered?.length / recordsPerPage);
    const pageNumbers = Array.from({ length: npage }, (_, i) => i + 1);
    
    const handleSort = (s) => {
        if (s === "DATE") {
            setAsc(false)
            setSort(s)
        } else if(s === "BID") {
            setAsc(false)
            setSort(s)
        } else if(s === "AGE") {
            setAsc(false)
            setSort(s)
        } else if(s === "PLAYER") {
            setAsc(false)
            setSort(s)
        };
    };
    const handleShowPage = (e) => {
        setRecordsPerPage(e.target.value)
    };
    const handlePosition = (e) => {
        setPosition(e.target.value)
    };
    const handleOwner = (e) => {
        setOwner(e.target.value)
    };
    const paginate = (e) => {
        setCurrentPage(e.target.value)
    };
    function prevPage () {
        if(currentPage !== 1){
            setCurrentPage(currentPage-1)
        }
    };
    function nextPage () {
        if(currentPage !== npage){
            setCurrentPage(currentPage+1)
        }
    };

    useEffect(() => {
        if(waiverBidsFiltered?.length < recordsPerPage){
            if(waiverBidsFiltered.length > 10){
                setRecordsPerPage(15);
                setCurrentPage(1);
            }else if(waiverBidsFiltered.length > 5){
                setRecordsPerPage(10);
                setCurrentPage(1);
            } else {
                setRecordsPerPage(5);
                setCurrentPage(1);
            }
        }
    },[recordsPerPage, waiverBidsFiltered]);

    return (
        <MarketUI
            asc={asc}
            currentPage={currentPage}
            findLogo={findLogo}
            handleOwner={handleOwner}
            handlePosition={handlePosition}
            handleShowPage={handleShowPage}
            handleSort={handleSort}
            league={league}
            nextPage={nextPage}
            owner={owner}
            pageNumbers={pageNumbers}
            paginate={paginate}
            position={position}
            prevPage={prevPage}
            qbWaiver={qbWaiver}
            records={records}
            recordsPerPage={recordsPerPage}
            rbWaiver={rbWaiver}
            setAsc={setAsc}
            sort={sort}
            teWaiver={teWaiver}
            waiverBidsFiltered={waiverBidsFiltered}
            waiverBids={waiverBids}
            wrWaiver={wrWaiver}
        />
    )
}