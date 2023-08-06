import React, {useState,useEffect} from 'react';
import { processWaiverBids } from "../helpers";
import MarketUI from '../ui/MarketUI';

// IDEAS
//  Showcase a graph of the previous QBs, RBs, WRs, TEs that were bought at what price & by who
//  And Trades per position; draft picks EX: Joe Burrow trade for 2 1st round picks...
//  Available players FA

export default function MarketContainer({
    findLogo,
    // findPlayer,
    league,
    // loadOwners,
    // loadTransactions,
    owners,
    players,
    toDateTime,
    transactions,
    roundToHundredth,
}) {
    const [position,setPosition]=useState("POSITION")
    const [owner,setOwner]=useState("OWNER")

    const waiverBidsC = processWaiverBids(transactions, owners, players, true);
    const waiverBidsH = processWaiverBids(league.history, owners, players, false);
    const waiverBidsDefault=waiverBidsH && waiverBidsH.concat(waiverBidsC).filter(bid => bid.player?.position!=="DEF")
    const waiverBids=waiverBidsDefault&&waiverBidsDefault.filter(b=>{
        if(position==="QB"){
            return b.player.position==="QB"
        } else if(position==="RB"){
            return b.player.position==="RB"
        } else if(position==="WR"){
            return b.player.position==="WR"
        } else if(position==="TE"){
        return b.player.position==="TE"
        } else {
            return []
        }
    }).filter(b=>{
        if(owner!=="OWNER"){
            return b.creator===owner
        } else {
            return []
        }
    })
    const qbWaiver=waiverBidsDefault&&waiverBidsDefault.filter(b=>b.player.position==="QB")
    const rbWaiver=waiverBidsDefault&&waiverBidsDefault.filter(b=>b.player.position==="RB")
    const wrWaiver=waiverBidsDefault&&waiverBidsDefault.filter(b=>b.player.position==="WR")
    const teWaiver=waiverBidsDefault&&waiverBidsDefault.filter(b=>b.player.position==="TE")
    
    const [asc,setAsc]=useState(false)
    const [sort,setSort]=useState("DATE")

    const handleSort=(s)=>{
        if(s==="DATE"){
            setAsc(false)
            setSort(s)
        } else if(s==="BID"){
            setAsc(false)
            setSort(s)
        } else if(s==="AGE"){
            setAsc(false)
            setSort(s)
        } else if(s==="PLAYER"){
            setAsc(false)
            setSort(s)
        }
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage,setRecordsPerPage]=useState(5);
    const lastIdx=currentPage*recordsPerPage;
    const firstIdx=lastIdx-recordsPerPage;
    const records=
        sort==="DATE"&&asc===false?
            waiverBids&&waiverBids.sort((a,b) => b.created-a.created).slice(firstIdx,lastIdx)
        :sort==="DATE"&&asc===true?
            waiverBids.sort((a,b) => a.created-b.created).slice(firstIdx,lastIdx)
        : sort==="BID"&&asc===false?
            waiverBids.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid).slice(firstIdx,lastIdx)
        :sort==="BID"&&asc===true? 
            waiverBids.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid).slice(firstIdx,lastIdx)
        :sort==="AGE"&&!asc?
            waiverBids.sort((a,b)=>b.player.age-a.player.age).slice(firstIdx,lastIdx)
        :sort==="AGE"&&asc?
            waiverBids.sort((a,b)=>a.player.age-b.player.age).slice(firstIdx,lastIdx)
        :sort==="PLAYER"&&asc===false?
            waiverBids.sort((a, b) => {
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
        :sort==="PLAYER"&&asc===true?
            waiverBids.sort((a, b) => {
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
    const npage=Math.ceil(waiverBids&&waiverBids.length/recordsPerPage);
    const pageNumbers=[]
    for(let i=1; i <= Math.ceil(waiverBids&&waiverBids.length/recordsPerPage);i++){
        pageNumbers.push(i)
    }

    const handleShowPage=(e)=>{
        setRecordsPerPage(e.target.value)
    }
    const handlePosition=(e)=>{
        setPosition(e.target.value)
    }
    const handleOwner=(e)=>{
        setOwner(e.target.value)
    }
    const paginate = (e) => {
        setCurrentPage(e.target.value)
    }
    
    function prevPage (){
        if(currentPage !== 1){
            setCurrentPage(currentPage-1)
        }
    }
    function nextPage(){
        if(currentPage !== npage){
            setCurrentPage(currentPage+1)
        }
    }

    useEffect(() => {
        if(waiverBids&&waiverBids.length<recordsPerPage){
            if(waiverBids.length>10){
                setRecordsPerPage(15)
                setCurrentPage(1)
            }else if(waiverBids.length>5){
                setRecordsPerPage(10)
                setCurrentPage(1)
            } else {
                setRecordsPerPage(5)
                setCurrentPage(1)
            }
        }
    },[recordsPerPage, waiverBids])

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
            roundToHundredth={roundToHundredth}
            setAsc={setAsc}
            sort={sort}
            teWaiver={teWaiver}
            toDateTime={toDateTime}
            waiverBids={waiverBids}
            waiverBidsDefault={waiverBidsDefault}
            wrWaiver={wrWaiver}
        />
    )
}