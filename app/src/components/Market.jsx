import React, {useState,useEffect} from 'react';
import { Icon } from '@iconify/react';
import MarketTable from '../components/tables/MarketTable'

const SELECT_TAG_M={border:"none", background:"inherit",color:"#7d91a6",fontSize:".7rem",fontWeight:"bold"}
const SHOW_TAG_M={
    borderBottom:"none", 
    background:"inherit",
    color:"#e4e1e0",
    fontSize:"13.5px",
    fontWeight:"normal",
    paddingBlock:"3px",
}

export default function Market(props) {
    const league=props.league
    const findPlayer=props.findPlayer
    const players=props.players
    // const loadTransactions=props.loadTransactions
    const transactions=props.transactions
    const findLogo=props.findLogo
    const toDateTime=props.toDateTime
    const roundToHundredth=props.roundToHundredth

    const [position,setPosition]=useState("POSITION")
    const [owner,setOwner]=useState("OWNER")

    const findRosterByUID = (uID) => {
        return league && league.owners.find(o => o.user_id === uID)
    }  
    const waiverBidsC=transactions && transactions.filter(t=>t.settings && t.settings.waiver_bid && t.settings.waiver_bid!==null && t.status==="complete")
    const waiverBidsH=league.history && league.history.map(l=>l.transactions.filter(t=>t.settings && t.settings.waiver_bid && t.settings.waiver_bid!==null && t.status==="complete")).flat().map(t=>{return{...t, creator:findRosterByUID(t.creator).display_name}})
    const waiverBidsDefault=waiverBidsH && waiverBidsH.concat(waiverBidsC).map(b=>{ 
        return{
            ...b,
            player:findPlayer(Object.keys(b.adds)[0], players)
        }    
    }).filter(b=>b.player.position!=="DEF")
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
    
    // const highestBid=waiverBids&&waiverBids.sort((a,b) => b.settings.waiver_bid - a.settings.waiver_bid)
    // const lowestBid=waiverBids&&waiverBids.sort((a,b) => a.settings.waiver_bid - b.settings.waiver_bid)

    const [asc,setAsc]=useState(false)
    const [sort,setSort]=useState("DATE")

    const handleSort=(s)=>{
        if(s==="DATE"){
            setAsc(false)
            setSort(s)
        // } else if(s==="OWNER"){
        //     setSort(s)
        // } else if(s==="POSITION"){
        //     setSort(s)
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
    // console.log(pageNumbers)  
    // const handleQBMarket = () => {
    //     // 1. map every transaction and find the player's position by using the KEY value (playerID). DONE
    //     // 2. if conditional / filter ? the transactions by position
    //     // 3. Determine the highest / lowest cost of player acquired and who bid on said player.
    //     // 4. Showcase a graph of the previous QBs, RBs, WRs, TEs that were bought at what price & by who
    //     // 5. And Trades per position; draft picks EX: Joe Burrow trade for 2 1st round picks...
    //     // 6. Available players FA

    // }
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
        <div>
            <div className="d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center">
                    <Icon icon="ant-design:stock-outlined" style={{color:"#a9dfd8", fontSize:"1.1rem"}}/>
                    <p className="m-0 bold mx-1">Market</p>
                </div>
                <div id="LA" className="p-2">
                    <Icon icon="material-symbols:arrow-right-alt-rounded" style={{fontSize:"1.5rem",color:"#cbcbcb"}}/>
                </div>
            </div>
            <div className="py-3">
                <MarketTable
                    waiverBidsDefault={waiverBidsDefault}
                    roundToHundredth={roundToHundredth}
                    qbWaiver={qbWaiver}
                    rbWaiver={rbWaiver}
                    wrWaiver={wrWaiver}
                    teWaiver={teWaiver}
                />
            </div>
            <div className="pt-4">
                <div className="d-flex align-items-center justify-content-between pb-1">
                    <div className="d-flex align-items-center" style={{border:"none", borderRadius:"10px"}}>
                        <div className="" onClick={() => prevPage()} style={{}}>
                            <Icon icon="material-symbols:chevron-left-rounded" style={{fontSize:"1.5em", color:currentPage===1?"#232227":"#a9dfd8"}}/>
                        </div>
                        <div className="mx-2 d-flex align-items-center" style={{fontSize:"12.5px"}}>
                            <select className="bold" onChange={paginate} value={currentPage} style={{background:"none", color:"white", border:"none",}}>
                                {
                                    pageNumbers.map((n,i) =>
                                        <option key={i} value={n}>{n}</option>
                                    )
                                } 
                            </select>
                        </div>
                        <div className="" onClick={() => nextPage()} style={{}}>
                            <Icon icon="material-symbols:chevron-right-rounded" style={{fontSize:"1.5em", color:waiverBids&&waiverBids.length>recordsPerPage?"#a9dfd8":"#232227"}}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center" style={SHOW_TAG_M}>
                            <p className="m-0" style={{}}>Show</p>
                            <select onChange={handleShowPage} value={recordsPerPage} style={{background:"inherit",color:"white",border:"none"}}>
                                <option value={5}>5</option>
                                {
                                    waiverBids&&waiverBids.length>5?
                                        <option value={10}>10</option>
                                    :<></>
                                }
                                {
                                    waiverBids&&waiverBids.length>10?
                                        <option value={15}>15</option>
                                    :<></>
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="">
                    <table className="table">
                        <thead>
                            <tr className="py-2" style={{fontSize:".7rem", color:"#7d91a6"}}>
                                <th>
                                    {
                                        sort==="PLAYER"?
                                            asc?
                                                <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                    <p className="m-0 StandingCell">PLAYER</p>
                                                    <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                                </div>  
                                            :
                                                <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                    <p className="m-0 StandingCell">PLAYER</p>
                                                    <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                                </div>
                                        :   <p className="m-0 StandingCell" onClick={() => handleSort("PLAYER")}>PLAYER</p>
                                    }
                                </th>
                                <th>
                                    {
                                        sort==="AGE"?
                                            asc?
                                                <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                    <p className="m-0 StandingCell">AGE</p>
                                                    <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                                </div>  
                                            :
                                                <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                    <p className="m-0 StandingCell">AGE</p>
                                                    <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                                </div>
                                        :   <p className="m-0 StandingCell" onClick={() => handleSort("AGE")}>AGE</p>
                                    }
                                </th>
                                <th>
                                    <select style={SELECT_TAG_M} onChange={handlePosition} value={position}>
                                        <option value={"POSITION"}>POSITION</option>
                                        <option value={"QB"}>QB</option>
                                        <option value={"RB"}>RB</option>
                                        <option value={"WR"}>WR</option>
                                        <option value={"TE"}>TE</option>
                                    </select>
                                    {/* {
                                        sort==="POSITION"?
                                            asc?
                                                <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                    <p className="m-0 StandingCell">POSITION</p>
                                                    <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                                </div>  
                                            :
                                                <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                    <p className="m-0 StandingCell">POSITION</p>
                                                    <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                                </div>
                                        :   <p className="m-0 StandingCell" onClick={() => handleSort("POSITION")}>POSITION</p>
                                    } */}
                                </th>
                                <th>
                                    <select style={SELECT_TAG_M} onChange={handleOwner} value={owner}>
                                        <option value={"OWNER"}>OWNER</option>
                                        {
                                            league.owners&&league.owners.map((o,i)=>
                                                <option key={i} value={o.display_name}>{o.display_name}</option>
                                            )
                                        }
                                    </select>
                                    {/* {
                                        sort==="OWNER"?
                                            asc?
                                                <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                    <p className="m-0 StandingCell">OWNER</p>
                                                    <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                                </div>  
                                            :
                                                <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                    <p className="m-0 StandingCell">OWNER</p>
                                                    <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                                </div>
                                        :   <p className="m-0 StandingCell" onClick={() => handleSort("OWNER")}>OWNER</p>
                                    } */}
                                </th>
                                <th>
                                    {
                                        sort==="BID"?
                                            asc?
                                                <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                    <p className="m-0 StandingCell">BID</p>
                                                    <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                                </div>  
                                            :
                                                <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                    <p className="m-0 StandingCell">BID</p>
                                                    <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                                </div>
                                        :
                                            <p className="m-0 StandingCell" onClick={() => handleSort("BID")}>BID</p>
                                    }
                                </th>
                                <th>
                                    {
                                        sort==="DATE"?
                                            asc?
                                                <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                    <p className="m-0 StandingCell">DATE</p>
                                                    <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                                </div>
                                                :
                                                <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                    <p className="m-0 StandingCell">DATE</p>
                                                    <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                                </div>
                                        : <p className="m-0 StandingCell" onClick={() => handleSort("DATE")}>DATE</p>
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                records&&records.map((r,i)=>
                                    <tr key={i} className="py-2" style={{border:"#2a2c3e", fontSize:"14px",color:"white"}}>
                                        <td className="d-flex align-items-top">
                                            <div className="">
                                                <div className="smallHeadShot"
                                                    style={{borderRadius:"5%",width:"40px",height:"55px",backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        r.player.player_id}.jpg)`,
                                                    }}>
                                                        {
                                                            findLogo(r.player.team).l !==""?
                                                                <div className="displayOwnerLogoSM">
                                                                    <img style={{width:"2.8em",left:"15px"}} alt="" src={findLogo(r.player.team).l}/>
                                                                </div>
                                                            :<></>
                                                        }
                                                </div> 
                                            </div>
                                            <div className="mx-2" style={{paddingLeft:".5em", }}>
                                                <p className="m-0" style={{color:sort==="PLAYER"?"#a9dfd8":""}}>{r.player.first_name} {r.player.last_name}</p>
                                                <p className="m-0 bold" style={{fontSize:"10px", color:"grey"}}>EXP {r.player.years_exp}</p>
                                            </div>
                                        </td>
                                        <td style={{color:sort==="AGE"?"#a9dfd8":""}}>{r.player.age}</td>
                                        <td style={{color:sort==="POSITION"?"#a9dfd8":""}}>{r.player.position}</td>
                                        <td style={{color:sort==="OWNER"?"#a9dfd8":""}}>{r.creator}</td>
                                        <td style={{color:sort==="BID"?"#a9dfd8":""}}>${r.settings.waiver_bid}</td>
                                        <td><p className="m-0" style={{color:sort==="DATE"?"#a9dfd8":""}}>{toDateTime(r.created)}</p></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}
