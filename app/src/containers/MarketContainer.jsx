import React, { useState, useEffect } from "react";
import { processWaiverBids } from "../helpers";
import MarketUI from "../ui/MarketUI";
import { findLogo } from "../utils";
// IDEAS
//  Showcase a graph of the previous QBs, RBs, WRs, TEs that were bought at what price & by who
//  And Trades per position; draft picks EX: Joe Burrow trade for 2 1st round picks...
//  Available players FA

export default function MarketContainer({
    league,
    // loadOwners,
    // loadTransactions,
    owners,
    players,
    transactions,
}) {
    const [position, setPosition] = useState("POSITION");
    const [owner, setOwner] = useState("OWNER");

    const currentSeasonWaiverBids = processWaiverBids(transactions, owners, players, true);
    const historicalWaiverBids = processWaiverBids(league.history, owners, players, false);
    const waiverBids = historicalWaiverBids?.concat(currentSeasonWaiverBids).filter(bid => bid.player?.position !== "DEF" && bid.player?.position !== "K").sort((a, b) => a.created - b.created);
    const waiverBidsFiltered = waiverBids?.filter(b=>{
        if (position === "QB") {
            return b.player.position === "QB"
        } else if (position === "RB") {
            return b.player.position === "RB"
        } else if (position==="WR") {
            return b.player.position === "WR"
        } else if (position==="TE") {
        return b.player.position === "TE"
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
    const qbWaiver = waiverBids?.filter(bid => bid.player.position === "QB");
    const rbWaiver = waiverBids?.filter(bid => bid.player.position === "RB");
    const wrWaiver = waiverBids?.filter(bid => bid.player.position === "WR");
    const teWaiver = waiverBids?.filter(bid => bid.player.position === "TE");
    
    const [asc,setAsc]=useState(false);
    const [sort,setSort]=useState("DATE");

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

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage,setRecordsPerPage]=useState(5);
    const lastIdx=currentPage*recordsPerPage;
    const firstIdx=lastIdx-recordsPerPage;
    const records=
        sort === "DATE" && asc === false ?
            waiverBidsFiltered.sort((a,b) => b.created-a.created).slice(firstIdx,lastIdx)
        : sort === "DATE" && asc === true ?
            waiverBidsFiltered.sort((a,b) => a.created-b.created).slice(firstIdx,lastIdx)
        : sort === "BID" && asc === false ?
            waiverBidsFiltered.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid).slice(firstIdx,lastIdx)
        : sort === "BID" && asc === true ? 
            waiverBidsFiltered.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid).slice(firstIdx,lastIdx)
        : sort === "AGE" && !asc ?
            waiverBidsFiltered.sort((a,b)=>b.player.age-a.player.age).slice(firstIdx,lastIdx)
        : sort === "AGE" && asc ?
            waiverBidsFiltered.sort((a,b)=>a.player.age-b.player.age).slice(firstIdx,lastIdx)
        : sort === "PLAYER" && asc === false ?
            waiverBidsFiltered.sort((a, b) => {
                const nameA = a.player.full_name.toUpperCase();
                const nameB = b.player.full_name.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              }).slice(firstIdx,lastIdx)
        :sort==="PLAYER" && asc === true ?
            waiverBidsFiltered.sort((a, b) => {
                const nameA = a.player.full_name.toUpperCase();
                const nameB = b.player.full_name.toUpperCase();
                if (nameA < nameB) {
                return 1;
                }
                if (nameA > nameB) {
                return -1;
                }
                return 0;
            }).slice(firstIdx,lastIdx)
        :[]
    const npage=Math.ceil(waiverBidsFiltered?.length/recordsPerPage);
    const pageNumbers=[];
    for(let i=1; i <= Math.ceil(waiverBidsFiltered?.length/recordsPerPage);i++){
        pageNumbers.push(i)
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