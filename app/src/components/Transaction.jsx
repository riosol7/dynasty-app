import React, { useState } from "react";
import TradeModal from "./modals/TradeModal";
import { Icon } from "@iconify/react";

import Sleeper from "../assets/images/sleeper.png";
import { logos } from "../constants/logos";
import { processTransactions } from "../helpers";
import { getInitials } from "../utils";

export default function Transaction({
    loadTransactions,
    owners,
    players,
    toDateTime,
    transactions,
}) {
    const processedTransactions = processTransactions(transactions, players, owners);
 
    const [isOpen, setIsOpen] = useState(false)
    const [transaction, setTransaction] = useState({})

    let findLogo = (activity, players) => {
        if(activity === "adds"){
            let foundTeam = players.adds[0].team
            let foundLogo = logos.filter(logo => logo[foundTeam])
            return Object.values(foundLogo[0])[0]
        } else if (activity === "drops") {
            let foundTeam = players.drops[0].team
            let foundLogo = logos.filter(logo => logo[foundTeam])
            return Object.values(foundLogo[0])[0]
        }
    }
    let findPlayer = (activity, players, playerID) => {
        if((players && playerID) !== undefined || null){
            if(activity === "adds") {
                let foundPlayer = players.adds.filter(player => player.player_id === playerID)
                return foundPlayer[0]
            
            } else if(activity === "drops") {
                let foundPlayer = players.drops.filter(player => player.player_id === playerID)
                return foundPlayer[0]
            }
        }
    }
    let findOwner = (ownerID, owners) => {
        let foundOwner = owners.filter(owner => owner.roster_id === ownerID)
        return foundOwner[0]
    }
    const transactionModal = (data) => {
        setTransaction(data)
        setIsOpen(true)
    }
    const closeModal = () => {
        setTransaction({})
        setIsOpen(false)
    }
    function getKeyByValue(object, value, players) {
        let playerID = Object.keys(object).find(key => object[key] === value);
        let foundPlayer = players?.adds?.filter(player => player.player_id === playerID)
        if((foundPlayer === undefined)){
            return {position:"null"}
        } else {
            return foundPlayer[0]
        }
    }
    return (
        <>
            {   loadTransactions ? <p>Loading </p> :
                    processedTransactions?.map((transaction, i) => 
                        <div key={i} className="my-2">
                            { 
                                transaction.type === "trade" ?
                                    <div className="">
                                        <div className="container">
                                            <div className="d-flex align-items-center">
                                                <Icon icon="ri:exchange-line" style={{color:"#a9dfd8", fontSize:"1.25em"}}/>
                                                <p className="m-0 mx-1" style={{fontSize:"12px"}}>Trade completed</p>
                                            </div>
                                            <p className="m-0 mx-4" style={{fontSize:"11px", color:"#b0b0b2"}}>{toDateTime(transaction.created)}</p>
                                        </div>
                                        <div className="d-flex align-items-center container">
                                            {   //ONLY TWO WAY TRADE W/ PICKS & PLAYERS & $$$
                                                transaction.draft_picks !== [] && transaction.owners.length === 2 ?
                                                    transaction.owners.map((roster, index) => 
                                                        <div key={index}>
                                                            {transaction.adds === null && transaction.drops === null && transaction.draft_picks?.length > 0 ? // Trade only picks
                                                                <></>
                                                            :
                                                                // DETERMINEs whether the owner acquired player(s)
                                                                Object.values(transaction.adds)?.filter(id => id === roster.roster_id)?.length === 1 || Object.values(transaction.adds)?.filter(id => id === roster.roster_id)?.length > 1 ?
                                                                    <div className={index === 1 ? "mx-4 py-3" : "py-3"}>
                                                                        <div className="container">
                                                                            <div className={
                                                                                getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).position === "null" || null || undefined ?  "smallHeadShot" :
                                                                                getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).position === "QB" ? "smallHeadShotQB" :
                                                                                getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).position === "RB" ? "smallHeadShotRB" :
                                                                                getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).position === "WR" ? "smallHeadShotWR" :
                                                                                getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).position === "TE" ? "smallHeadShotTE" : 
                                                                                getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                                                            /* if the trade only contains draft picks || $$$ */
                                                                            } style={ getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).position === "null" || null || undefined ? 
                                                                                {  backgroundImage:`url(${Sleeper})`, backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundSize:"59px"} : { backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                                getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).player_id}.jpg)`,   
                                                                            }}>
                                                                                <div className="displayOwnerLogoSM">
                                                                                    <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                                        roster.avatar}`
                                                                                    }/>
                                                                                </div>    
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-1">
                                                                            {
                                                                                /* if the trade only contains draft picks || $$$ */
                                                                                (transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).length > 0) && (getInitials(getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).player) === undefined || null) && (getInitials(getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).full_name) === undefined || null)? 
                                                                                    <div className="">
                                                                                        {
                                                                                            transaction.draft_picks !== [] ? 
                                                                                                transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).map((pick, idx) => 
                                                                                                    <div key={idx}>
                                                                                                        {
                                                                                                            idx===0?  
                                                                                                                <p className="m-0 text-center" style={{fontSize:"10px", color:"#cbcbcb"}}>{pick.season} {pick.round}{
                                                                                                                    pick.round === 1 ? "st" : 
                                                                                                                    pick.round === 2 ? "nd" : 
                                                                                                                    pick.round === 3 ? "rd" : "th"
                                                                                                                }</p>   
                                                                                                            :<></> 
                                                                                                        }
                                                                                                </div>
                                                                                                )
                                                                                            :<></>
                                                                                        }
                                                                                        <p className="m-0 d-flex align-items-center justify-content-center" style={{fontSize:"12px"}}>
                                                                                            <Icon icon="fluent:tag-32-regular" style={{marginRight:"2px", color:"#a9dfd8", fontSize:"1.25em"}}/>
                                                                                            0
                                                                                        </p> 
                                                                                        <p style ={{fontSize:".8rem"}} className="m-0 text-center">+{transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).length - 1} picks</p>                     
                                                                                    </div>
                                                                                :
                                                                                    <div>    
                                                                                        <p className="bold m-0 text-center truncate" style={{fontSize:"13.5px"}}>{getInitials(getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).player) || getInitials(getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).full_name)}</p>
                                                                                        <p className="m-0 text-center" style={{fontSize:"10px", color:"#cbcbcb"}}>{getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).position} - {getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).team}</p>      
                                                                                        <p className="m-0 d-flex align-items-center justify-content-center" style={{fontSize:"12px"}}>
                                                                                            <Icon icon="fluent:tag-32-regular" style={{marginRight:"2px", color:"#a9dfd8", fontSize:"1.25em"}}/>
                                                                                            {getKeyByValue(transaction.adds ,roster.roster_id, transaction.players).rating || 0}
                                                                                        </p>   
                                                                                        {
                                                                                            Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).length === 1 && transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).length === 1?
                                                                                                <p style ={{fontSize:".8rem"}} className="m-0 text-center">
                                                                                                    +{
                                                                                                        Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).length + transaction.draft_picks.filter(picks => picks.owner_id === roster.roster_id).length - 1
                                                                                                    } asset
                                                                                                </p>  
                                                                                            :
                                                                                                (Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).length > 1 && transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).length > 1) || 
                                                                                                (Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).length > 1 && transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).length >= 0) || 
                                                                                                (Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).length >= 1 && transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).length > 0) ?
                                                                                                    <p style ={{fontSize:".8rem"}} className="m-0 text-center">
                                                                                                        +{
                                                                                                            Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).length + transaction.draft_picks.filter(picks => picks.owner_id === roster.roster_id).length - 1
                                                                                                        } assets
                                                                                                    </p>    
                                                                                            :<div className="my-3"></div>
                                                                                        } 
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                : 
                                                                    // ONLY receive waiver $$$ || Draft picks
                                                                    <div className={index === 1 ? "mx-4":""}>
                                                                        <div className="container">
                                                                            <div className={"smallHeadShot"} style={{backgroundImage:`url(${Sleeper})`, backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundSize:"59px"}}>
                                                                                <div className="displayOwnerLogoSM">
                                                                                    <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                                        roster.avatar}`
                                                                                    }/>
                                                                                </div>    
                                                                            </div>
                                                                        </div>
                                                                        <div className="mt-1">
                                                                            {
                                                                                // ONLY $$$ no draft pick trade
                                                                                transaction.draft_picks.length === 0 && transaction.waiver_budget.length >=1 ?
                                                                                    <div>
                                                                                        <div className="d-flex align-items-center justify-content-center">
                                                                                            <p className="bold m-0 text-center" style={{fontSize:"13.5px"}}>Waiver </p>
                                                                                            <Icon icon="noto:heavy-dollar-sign"/>
                                                                                        </div>
                                                                                        <p className="m-0 text-center" style={{fontSize:"10px", color:"#cbcbcb"}}>amount</p>
                                                                                        <p className="m-0 d-flex align-items-center justify-content-center" style={{fontSize:"12px"}}>
                                                                                            <Icon icon="fluent:tag-32-regular" style={{marginRight:"2px", color:"#a9dfd8", fontSize:"1.25em"}}/>
                                                                                            {transaction.waiver_budget.filter(cash => cash.receiver === roster.roster_id).reduce((sum,owner) => sum + owner.amount, 0)}
                                                                                        </p> 
                                                                                    </div>
                                                                                : // Draft Pick(s) trade w/ $$$
                                                                                    <div>
                                                                                        {
                                                                                            transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).length === 1?
                                                                                            <p className="bold m-0 text-center" style={{fontSize:"13.5px"}}>Draft Pick</p>
                                                                                            :<p className="bold m-0 text-center" style={{fontSize:"13.5px"}}>Draft Picks</p>
                                                                                        }
                                                                                        <div>
                                                                                            {       
                                                                                                transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).map((pick, j) => 
                                                                                                    <div key={j}> 
                                                                                                        {
                                                                                                            j===0?
                                                                                                                <p className="m-0 text-center" style={{fontSize:"10px", color:"#cbcbcb"}}>{pick.season} {pick.round}{
                                                                                                                    pick.round === 1 ? "st" : 
                                                                                                                    pick.round === 2 ? "nd" : 
                                                                                                                    pick.round === 3 ? "rd" : "th"
                                                                                                                }</p>  
                                                                                                            : <></>
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                            }
                                                                                            <div>
                                                                                                <p className="m-0 d-flex align-items-center justify-content-center" style={{fontSize:"12px"}}>
                                                                                                    <Icon icon="fluent:tag-32-regular" style={{marginRight:"2px", color:"#a9dfd8", fontSize:"1.25em"}}/>
                                                                                                    0
                                                                                                </p> 
                                                                                                {
                                                                                                    transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).length > 1 ?
                                                                                                        <p style ={{fontSize:".8rem"}} className="m-0 text-center">+{transaction.draft_picks.filter(pick => pick.owner_id === roster.roster_id).length - 1} picks</p>
                                                                                                    : <div className="my-2"></div>
                                                                                                }
                                                                                            </div>
                                                                                        </div> 
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                    </div> 
                                                            }
                                                        </div>
                                                    )    
                                                // THREE WAY TRADES    
                                                :<></>
                                            }
                                        </div> 
                                        <div className="d-flex justify-content-start container">
                                            <button id="tradeBtn" onClick={() => transactionModal(transaction)}>
                                                <p className="m-0">view trade</p>
                                            </button>
                                        </div>
                                        <div className="tradeIcon">
                                            <Icon style={{fontSize:"1.5rem", marginRight:"2rem"}} icon="gg:arrows-exchange"/>
                                        </div>
                                    </div>
                                // adds && drops via waiver/commissioner/free agent
                                : transaction.adds !== null && transaction.drops !== null && transaction.type !== "trade" && transaction.status !== "failed"?
                                    <div className="container">
                                        { 
                                            transaction.type === "commissioner" ?
                                                <>
                                                    <p className="m-0" style={{fontSize:"14px"}}>Commissioner made a move</p> 
                                                    <p className="m-0" style={{fontSize:"11px", color:"#b0b0b2"}}>{toDateTime(transaction.created)}</p>
                                                </>
                                            :
                                                <>
                                                    <div className="d-flex align-items-center">
                                                        <div className="">
                                                            <img style={{width:"22px"}}className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                findOwner(transaction.owners[0].roster_id, transaction.owners).avatar}`
                                                            }/>
                                                        </div>
                                                        <p className="m-0 mx-1 text-truncate" style={{fontSize:"14px"}}>{transaction.creator}<span style={{color:"whitesmoke"}}> made a move</span></p> 
                                                    </div>
                                                    <p className="m-0 mx-4" style={{fontSize:"11px", color:"#b0b0b2"}}>{toDateTime(transaction.created)}</p>
                                                </>
                                        }
                                        <div className="d-flex align-items-center py-3">
                                            { 
                                                Object.keys(transaction.adds).map((transactionID, k) => 
                                                    <div key={k} className="">
                                                        {
                                                            findPlayer("adds", transaction.players, transactionID) !== undefined || null ? 
                                                                <>
                                                                    <div className="d-flex justify-content-center">
                                                                        <div className={
                                                                            findPlayer("adds", transaction.players, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                                            findPlayer("adds", transaction.players, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                                            findPlayer("adds", transaction.players, transactionID).position === "WR" ? "smallHeadShotWR" :
                                                                            findPlayer("adds", transaction.players, transactionID).position === "TE" ? "smallHeadShotTE" : 
                                                                            findPlayer("adds", transaction.players, transactionID).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                                                        } style={ 
                                                                            transaction.players.adds[0].position === "DEF" ? 
                                                                                {backgroundImage: `url(${findLogo("adds", transaction.players).l})`, backgroundSize:"100%"}
                                                                            :
                                                                                {backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${findPlayer("adds", transaction.players, transactionID).player_id}.jpg)`}
                                                                        }>
                                                                            {
                                                                                transaction.type === "commissioner" ?
                                                                                    <div className="displayOwnerLogoSM">
                                                                                        <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                                            findOwner(transaction.adds[transactionID], transaction.owners).avatar}`
                                                                                        }/>
                                                                                    </div> 
                                                                                :
                                                                                    <div className="displayOwnerLogoSM">
                                                                                        <Icon icon="ph:user-circle-plus-duotone" style={
                                                                                            findPlayer("adds", transaction.players, transactionID).position === "QB" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#f8296d"} :
                                                                                            findPlayer("adds", transaction.players, transactionID).position === "RB" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#36ceb8"} :
                                                                                            findPlayer("adds", transaction.players, transactionID).position === "WR" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#58a7ff"} :
                                                                                            findPlayer("adds", transaction.players, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#faae58"} :
                                                                                            findPlayer("adds", transaction.players, transactionID).position === "K" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#bd66ff"} : {
                                                                                            fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#dbdbde"
                                                                                        }}/>
                                                                                    </div>
                                                                            }   
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-1">
                                                                        <div className="bold truncate text-center" style={{fontSize:"13.5px"}}> 
                                                                            { 
                                                                                findPlayer("adds", transaction.players, transactionID).position === "DEF" ?
                                                                                    <p className="m-0">{findPlayer("adds", transaction.players, transactionID).last_name}</p>
                                                                                :
                                                                                    <p className="m-0">{getInitials(findPlayer("adds", transaction.players, transactionID).player || findPlayer("adds", transaction.players, transactionID).full_name)}</p>
                                                                            }
                                                                        </div>
                                                                        <p className="m-0 text-center" style={{fontSize:"10px",color:"#cbcbcb"}}>{findPlayer("adds", transaction.players, transactionID).position} - {findPlayer("adds", transaction.players, transactionID).team || "FA"}</p>
                                                                        <div className="d-flex align-items-center justify-content-center">
                                                                            <p className="m-0 d-flex align-items-center justify-content-center" style={{fontSize:"12px"}}>
                                                                                <Icon icon="mdi:tag-plus-outline" style={{marginRight:"2px", color:"#a9dfd8", fontSize:"1.25em"}}/>
                                                                                {findPlayer("adds", transaction.players, transactionID).rating || 0}
                                                                            </p>  
                                                                            {
                                                                                transaction.settings !== null || undefined ?
                                                                                    <div className="d-flex align-items-center mx-1" style={{fontSize:"12px"}}>
                                                                                        <Icon icon="noto:heavy-dollar-sign"/>
                                                                                        <p className="m-0" style={{color:"white"}}>{transaction.settings.waiver_bid}</p>
                                                                                    </div>   
                                                                                :<></>
                                                                            }
                                                                        </div>
                                                                    </div> 
                                                                </>
                                                            :<></>
                                                        }
                                                    </div>
                                                )
                                            }
                                            { 
                                                Object.keys(transaction.drops).map((transactionID, l) => 
                                                    <div key={l} className="mx-4">
                                                        {
                                                            findPlayer("drops", transaction.players, transactionID) !== undefined || null ? 
                                                                <>
                                                                    <div className="d-flex justify-content-center">
                                                                        <div
                                                                            className={
                                                                                findPlayer("drops", transaction.players, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                                                findPlayer("drops", transaction.players, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                                                findPlayer("drops", transaction.players, transactionID).position === "WR" ? "smallHeadShotWR" :
                                                                                findPlayer("drops", transaction.players, transactionID).position === "TE" ? "smallHeadShotTE" :
                                                                                findPlayer("drops", transaction.players, transactionID).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                                                            }
                                                                            style={ transaction.players.drops[0].position === "DEF" ? 
                                                                                {backgroundImage: `url(${findLogo("drops", transaction.players).l})`, backgroundSize:"100%"}:
                                                                                {backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${findPlayer("drops", transaction.players, transactionID).player_id}.jpg)`}
                                                                        }>
                                                                            <div className="displayOwnerLogoSM">
                                                                                <Icon icon="ph:user-circle-minus-duotone" style={
                                                                                findPlayer("drops", transaction.players, transactionID).position === "QB" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#f8296d"} :
                                                                                findPlayer("drops", transaction.players, transactionID).position === "RB" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#36ceb8"} :
                                                                                findPlayer("drops", transaction.players, transactionID).position === "WR" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#58a7ff"} :
                                                                                findPlayer("drops", transaction.players, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#faae58"} :
                                                                                findPlayer("drops", transaction.players, transactionID).position === "K" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#bd66ff"} : {
                                                                                    fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#dbdbde"
                                                                                }}/>
                                                                            </div>    
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-1">
                                                                        <div className="bold text-center" style={{fontSize:"13.5px"}}> 
                                                                        { 
                                                                            findPlayer("drops", transaction.players, transactionID).position === "DEF" ?
                                                                            <p className="m-0">{findPlayer("drops", transaction.players, transactionID).last_name}</p>
                                                                            :
                                                                            <p className="m-0">{getInitials(findPlayer("drops", transaction.players, transactionID).player || findPlayer("drops", transaction.players, transactionID).full_name)}</p>
                                                                        }
                                                                        </div>
                                                                        <p className="m-0 text-center" style={{fontSize:"10px",color:"#cbcbcb"}}>{findPlayer("drops", transaction.players, transactionID).position} - {findPlayer("drops", transaction.players, transactionID).team || "FA"}</p>
                                                                        <p className="m-0 text-center" style={{fontSize:"12px"}}>
                                                                        <Icon icon="mdi:tag-minus-outline" style={{marginRight:"2px", color:"#a9dfd8", fontSize:"1.25em"}}/>
                                                                        {findPlayer("drops", transaction.players, transactionID).rating || 0}</p>  
                                                                    </div>
                                                                </>
                                                            :<></>
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                // only drops - FA / commissioner 
                                : transaction.adds === null && transaction.drops !== null && transaction.status !== "failed" ?   
                                    Object.keys(transaction.drops).map((transactionID, m) =>
                                        <div key={m} className="container">
                                            { 
                                                transaction.type === "commissioner" ?
                                                    <>
                                                        <p className="m-0" style={{fontSize:"14px"}}>Commissioner released FA</p> 
                                                        <p className="m-0" style={{fontSize:"11px", color:"#b0b0b2"}}>{toDateTime(transaction.created)}</p>
                                                    </>
                                                :
                                                    <>
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <img style={{width:"22px"}}className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                    findOwner(transaction.drops[transactionID], transaction.owners).avatar}`
                                                                }/>
                                                            </div>
                                                            <p className="m-0 mx-1 text-truncate" style={{fontSize:"14px"}}>{transaction.creator}<span style={{color:"whitesmoke"}}> released FA</span></p> 
                                                        </div>
                                                        <p className="m-0 mx-4" style={{fontSize:"11px", color:"#b0b0b2"}}>{toDateTime(transaction.created)}</p> 
                                                    </>
                                            }
                                            {
                                                findPlayer("drops", transaction.players, transactionID) !== undefined || null ? 
                                                    <>
                                                        <div className="container d-flex p-2 py-3">
                                                            <div className={
                                                                findPlayer("drops", transaction.players, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                                findPlayer("drops", transaction.players, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                                findPlayer("drops", transaction.players, transactionID).position === "WR" ? "smallHeadShotWR" :
                                                                findPlayer("drops", transaction.players, transactionID).position === "TE" ? "smallHeadShotTE" :
                                                                findPlayer("drops", transaction.players, transactionID).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                                            } 
                                                            style={ transaction.players.drops[0].position === "DEF" ? 
                                                                {backgroundImage: `url(${findLogo("drops", transaction.players).l})`, backgroundSize:"100%"}:
                                                                {backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${findPlayer("drops", transaction.players, transactionID).player_id}.jpg)`}
                                                            }>
                                                                <div className="displayOwnerLogoSM">
                                                                    <Icon icon="ph:user-circle-minus-duotone" style={
                                                                    findPlayer("drops", transaction.players, transactionID).position === "QB" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#f8296d"} :
                                                                    findPlayer("drops", transaction.players, transactionID).position === "RB" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#36ceb8"} :
                                                                    findPlayer("drops", transaction.players, transactionID).position === "WR" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#58a7ff"} :
                                                                    findPlayer("drops", transaction.players, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#faae58"} :
                                                                    findPlayer("drops", transaction.players, transactionID).position === "K" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#bd66ff"} : {
                                                                        fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#dbdbde"
                                                                    }}/>
                                                                </div>  
                                                            </div>
                                                            <div className="px-4">
                                                                <div className="bold" style={{fontSize:"13.5px"}}> 
                                                                    { 
                                                                        findPlayer("drops", transaction.players, transactionID).position === "DEF" ?
                                                                            <p className="m-0">{findPlayer("drops", transaction.players, transactionID).last_name}</p>
                                                                        :
                                                                            <p className="m-0">{getInitials(findPlayer("drops", transaction.players, transactionID).player || findPlayer("drops", transaction.players, transactionID).full_name)}</p>
                                                                    }
                                                                </div>
                                                                <p className="m-0" style={{fontSize:"10px",color:"#cbcbcb"}}>{findPlayer("drops", transaction.players, transactionID).position} - {findPlayer("drops", transaction.players, transactionID).team}</p>
                                                                <p className="m-0 d-flex align-items-center" style={{fontSize:"12px"}}>
                                                                    <Icon icon="mdi:tag-minus-outline" style={{marginRight:"2px", color:"#a9dfd8", fontSize:"1.25em"}}/>
                                                                    {findPlayer("drops", transaction.players, transactionID).rating || 0}
                                                                </p>
                                                            </div>  
                                                        </div>
                                                    </>
                                                :<></>
                                            }
                                        </div>
                                    )
                                // only adds FA / commissioner 
                                : transaction.drops === null && transaction.adds !== null && transaction.status !== "failed" ?
                                    Object.keys(transaction.adds).map((transactionID, n) =>
                                        <div key={n} className="container">
                                            { 
                                                transaction.type === "commissioner" ?
                                                    <>
                                                        <p className="m-0" style={{fontSize:"14px"}}>Commissioner signed</p> 
                                                        <p className="m-0" style={{fontSize:"11px", color:"#b0b0b2"}}>{toDateTime(transaction.created)}</p>
                                                    </>
                                                :
                                                    <>  
                                                        <div className="d-flex align-items-center">
                                                            <div className="">
                                                                <img style={{width:"22px"}}className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                    findOwner(transaction.adds[transactionID], transaction.owners).avatar}`
                                                                }/>
                                                            </div>
                                                            <p className="m-0 mx-1 text-truncate" style={{fontSize:"14px"}}>{transaction.creator} <span style={{color:"whitesmoke"}}>signed</span></p> 
                                                        </div>
                                                        <p className="m-0 mx-4" style={{fontSize:"11px", color:"#b0b0b2"}}>{toDateTime(transaction.created)}</p>
                                                    </>
                                            }
                                            {
                                                findPlayer("adds", transaction.players, transactionID) !== undefined || null ? 
                                                    <>
                                                        <div className="container d-flex px-2 py-3">
                                                            <div className={
                                                                findPlayer("adds", transaction.players, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                                findPlayer("adds", transaction.players, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                                findPlayer("adds", transaction.players, transactionID).position === "WR" ? "smallHeadShotWR" :
                                                                findPlayer("adds", transaction.players, transactionID).position === "TE" ? "smallHeadShotTE" : 
                                                                findPlayer("adds", transaction.players, transactionID).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                                            } 
                                                            style={ 
                                                                transaction.players.adds[0].position === "DEF" ? 
                                                                {backgroundImage: `url(${findLogo("adds", transaction.players).l})`, backgroundSize:"100%"}:
                                                                {backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${findPlayer("adds", transaction.players, transactionID).player_id}.jpg)`}
                                                            }>
                                                                { 
                                                                    transaction.type === "commissioner" ?
                                                                        <div className="displayOwnerLogoSM">
                                                                            <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                                findOwner(transaction.adds[transactionID], transaction.owners).avatar}`
                                                                            }/>
                                                                        </div>  
                                                                    :
                                                                        <div className="displayOwnerLogoSM">
                                                                            <Icon icon="ph:user-circle-plus-duotone" style={
                                                                            findPlayer("adds", transaction.players, transactionID).position === "QB" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#f8296d"} :
                                                                            findPlayer("adds", transaction.players, transactionID).position === "RB" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#36ceb8"} :
                                                                            findPlayer("adds", transaction.players, transactionID).position === "WR" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#58a7ff"} :
                                                                            findPlayer("adds", transaction.players, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#faae58"} :
                                                                            findPlayer("adds", transaction.players, transactionID).position === "K" ?  {fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#bd66ff"} : {
                                                                                fontSize:"1.7rem", backgroundColor:"black", borderRadius:"50%", color:"#dbdbde"
                                                                            }}/>
                                                                        </div>
                                                                }  
                                                            </div>
                                                            <div className="px-4">
                                                                <div className="bold" style={{fontSize:"13.5px"}}> 
                                                                { 
                                                                    findPlayer("adds", transaction.players, transactionID).position === "DEF" ?
                                                                        <p className="m-0">{findPlayer("adds", transaction.players, transactionID).last_name}</p>
                                                                    :
                                                                        <p className="m-0">{getInitials(findPlayer("adds", transaction.players, transactionID).player || findPlayer("adds", transaction.players, transactionID).full_name)}</p>
                                                                }
                                                                </div>
                                                                <p className="m-0" style={{fontSize:"10px",color:"#cbcbcb"}}>{findPlayer("adds", transaction.players, transactionID).position} - {findPlayer("adds", transaction.players, transactionID).team}</p>
                                                                <div className="d-flex align-items-center">
                                                                    <p className="m-0 d-flex align-items-center" style={{fontSize:"12px"}}>
                                                                        <Icon icon="mdi:tag-plus-outline" style={{marginRight:"2px", color:"#a9dfd8", fontSize:"1.25em"}}/>
                                                                        {findPlayer("adds", transaction.players, transactionID).rating || 0}
                                                                    </p>
                                                                    {
                                                                        transaction.settings !== null || undefined ?
                                                                            <div className="d-flex align-items-center mx-1" style={{fontSize:"12px"}}>
                                                                                <Icon icon="noto:heavy-dollar-sign"/>
                                                                                <p className="m-0" style={{color:"white"}}>{transaction.settings.waiver_bid}</p>
                                                                            </div>   
                                                                        :<></>
                                                                    }
                                                                </div>
                                                            </div>  
                                                        </div>
                                                    </>
                                                :<></>

                                            }
                                        </div>
                                    ): <></>
                            }
                        </div>
                    )
            }
            <TradeModal
                open={isOpen}
                onClose={() => closeModal()}
                transaction={transaction}
            />
        </>
    )
}