import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom' 
import LeagueWidget from '../components/LeagueWidget'
import Summary from '../components/Owner/Summary';
import Dynasty from '../components/Owner/Dynasty';
import Modal from '../components/modals/Modal';
import DraftWidget from '../components/DraftWidget';
import Power from '../components/Owner/Power';
import { Icon } from '@iconify/react';

export default function Owner(props) {
    const {id} = useParams()
    const loadLeague = props.loadLeague
    const league = props.league
    const loadRosters = props.loadRosters
    const rosters = props.rosters
    // const loadTransactions = props.loadTransactions
    // const transactions = props.transactions
    const loadMatches = props.loadMatches
    const matches = props.matches
    const matchups = props.matchups
    const players = props.players
    const findPlayer = props.findPlayer
    const findLogo = props.findLogo
    const activityBar=props.activityBar
    const setActivityBar=props.setActivityBar
    const roundToHundredth=props.roundToHundredth
    const winPCT=props.winPCT
    const getTotalPts=props.getTotalPts
    const findRosterByID=props.findRosterByID
    const findRosterByName=props.findRosterByName
    const foundHistory=props.foundHistory
    const lineupEfficiency=props.lineupEfficiency

    const [tab, setTab] = useState("Summary")
    const [isOpen, setIsOpen] = useState(false)
    const [match, setMatch] = useState([])
    const [oID, setOID]=useState("")
    const [modalTab, setModalTab] = useState("")
    const [draftClass, setDraftClass] = useState(league.season)
    // const [vs, setVS] = useState("Head")
    // const [selectAllPlay, setSelectAllPlay] = useState("All Time")
    const handleDraftClass = (e) => {
        setDraftClass(e.target.value)
    }
    // const handleAllPlay = (e) => {
    //     setSelectAllPlay(e.target.value)
    // }
    // const handleVS = (e) => {
    //     setVS(e.target.value)
    // }
    const myDraftPicks = (id, yr) => {
        let picks;
        if(league !== undefined && (id !== null || undefined) && yr === league.season){
            picks = league && league.draft && league.draft.picks && league.draft.picks.filter(p => p.roster_id === Number(id))
            return picks
        } else if(league !== undefined && id !== undefined && yr !== undefined) {
            picks = league && league.history && league.history.filter(l => l.year === yr)[0].league.draft.picks.filter(p => p.roster_id === Number(id))
            return picks
        }
    }
    const openModal = (mTab, opID, game) => {
        if(mTab === "Draft"){
            setIsOpen(true)
            setModalTab(mTab)
            setOID(opID)
            setMatch([])
        } else if(mTab === "Matchup" && game !== [] && game !== undefined){
            setIsOpen(true)
            setModalTab(mTab)
            setOID(opID)
            setMatch(game)
        } else if(mTab === "Matchup"){
            setIsOpen(true)
            setModalTab(mTab)
            setOID(opID)
        }
    }
    const closeModal = () => {
        setIsOpen(false)
        setMatch([])
    }
    const handleSzn = (yr) => {
        let foundSzn = league.history.filter(l => l.year === yr).map((l,) => 
          l.rosters.sort((a,b) => {
            if(a.settings.wins === b.settings.wins) {
              return Number(b.settings.fpts + "." + b.settings.fpts_decimal) - Number(a.settings.fpts + "." + a.settings.fpts_decimal);
            } else {
              return b.settings.wins - a.settings.wins
            }
          }).map((roster, idx) => ({...roster, rank:idx+1}))
        )
        return foundSzn[0].filter(team => team.roster_id === Number(id))
    }

    let foundStats = rosters.totalRoster && rosters.totalRoster.find(roster => roster.roster_id === Number(id)).settings
    
    let foundMyMatchups = matchups && matchups.map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
        if(team.filter(owner => owner.roster_id === Number(id)).length > 0){
            return team
        }  
        return acc
    })).map(match => match.sort((a,b) => b.points - a.points))
     
    let rosterRank = rosters.totalRoster && rosters.totalRoster.sort((a,b) => 
    { if(a.settings.wins === b.settings.wins) {
        return (b.settings.fpts) - (a.settings.fpts);
      } else {
        return b.settings.wins - a.settings.wins
      }
    }).map((team, i) => ({...team, rank:i+1}))

    let totalPtsPerGame = (p ,s) => {
        if(s === "All Time"){
            return roundToHundredth(Number(p/(foundHistory(id).allTime.w + foundHistory(id).allTime.l))) 
        } else if(Number(s) <= 2020){
            return roundToHundredth(Number(p/13))
        } else if(Number(s) > 2020){
            return roundToHundredth(Number(p/14))
        } else if(s === league.season){
            return roundToHundredth(Number(p/(foundStats.losses + foundStats.wins + foundStats.ties)))
        }
    }    
    let findRecord = (ms, wk) => {
        let w = 0;
        let l = 0;
        let record;

        ms.filter((m,k) => k <= wk).forEach(mt => {
            if(mt[0].roster_id === Number(id)){
                w++
                record = w + " - " + l   
                return record    
            }
                l ++ 
                record = w + " - " + l   
                return record   
        })
        return {
            record:record,
            w:w,
            l:l
        }
    }
    let topDraftPick = league.draft && league.draft.picks.filter(p => p.roster_id === Number(id))[0]
    function isOdd(num) {
        return num % 2
    }
    const findGameDate = (s1, s2, opID) => {
        let historyArray = []
        let currentArray = []
        if(s1 !== undefined && s2 !== undefined){
            historyArray =  league.history && league.history.map(szn => { return [
                Object.entries(szn.matchups).map(g => g), 
                szn.year
            ]}).map(y => {
                return y[0].map(w => {
                    if(w[1].filter(r => (r.points === s1 || r.points === s2) && (r.roster_id === Number(id) || r.roster_id === opID)).length >0){
                        // console.log(w[1].filter(r => (r.points === 144.25 || r.points === 148.5) && (r.roster_id === Number(id) || r.roster_id === 4)))
                        // console.log(w[0])
                        // console.log(y[1])
                        return {
                            game:w[1].filter(r => (r.points === s1 || r.points === s2) && (r.roster_id === Number(id) || r.roster_id === opID)),
                            week:w[0],
                            year:y[1]
                        }
                    } else {
                        return {
                            game:[],
                            week:[],
                            year:""
                        }
                    }
                })
            }).map(yr => yr.filter(y => y.game.length > 0)[0]).filter(g => g !== undefined)[0]
            currentArray = matches.map((w,wkIdx) => {return {game:w.filter(r => r.points === s1 || r.points === s2),week:`Week ${wkIdx+1}`,year:league.season}}).filter(y => y.game.length > 0)[0]
        }
        return historyArray !== undefined? historyArray : currentArray
    }
    
    // const [weeklyMatch, setWeeklyMatch] = useState(league.season)

    useEffect(() => {
        if(draftClass === undefined || null){
          setDraftClass(league.season)
        }
      }, [draftClass, league.season])
    // const findWeeklyMatchups = () => {
    //     const template = league.history.filter(l => l.year === weeklyMatch).map(szn => Object.entries(szn.matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
    //         acc[team.matchup_id] = acc[team.matchup_id] || [];
    //         acc[team.matchup_id].push(team);
    //         return acc;
    //     }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
    //         if(team.filter(owner => owner.roster_id === Number(id)).length > 0){
    //             return team
    //         }  
    //         return acc
    //     })).map(match => match.sort((a,b) => b.points - a.points)))[0]
    //     if(Number(weeklyMatch) > 2020){
    //         return template
    //     } else {
    //         return template.slice(0,16)
    //     }
    // }
    // const handleWeeklyMatch = (e) => {
    //     setWeeklyMatch(e.target.value)
    // }
    return (
        loadLeague && loadRosters && loadMatches ? <div style={{background:"black", width:"100%", height:"100vh"}}></div>:
            <>
                <div className="" style={{paddingLeft:"5.7em",width:"100%",background:"#0f0f0f",height:"100%"}}>
                    <div className="pt-3" style={{background:"black", height:"100%", minHeight:"100vh"}}>
                        <div className="col my-2 mx-5">
                            <LeagueWidget
                                league={league}
                                loadLeague={loadLeague}
                                activityBar={activityBar}
                                setActivityBar={setActivityBar}
                            />
                        </div>
                        {
                            rosters.totalRoster && league.history && matches ?
                                rosterRank.filter(roster => roster.roster_id === Number(id)).map((owner,i) => 
                                    <div key={i} className="">
                                        <div className="d-flex align-items-center justify-content-between flex-wrap mx-5">
                                            <div className="d-flex align-items-center my-4">
                                                <div>
                                                    <img src={`https://sleepercdn.com/avatars/thumbs/${owner.owner.avatar}`} style={{borderRadius:"50%", border:"4px outset #a9dfd8", padding:"4px", background:"black"}} alt="profile"/>
                                                </div>
                                                <div className="mx-3">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{fontSize:"18px"}}>
                                                            {
                                                                owner.owner.team_name ?
                                                                    owner.owner.team_name
                                                                :
                                                                    owner.owner.display_name
                                                            }
                                                        </p>
                                                        <div>
                                                            <p style={{color:"#cbcbcb", fontWeight:"lighter", paddingLeft:"6px"}} className="m-0">@{owner.owner.display_name}</p>         
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">

                                                    </div>
                            
                                                    <p className="m-0 d-flex align-items-center" style={{fontSize:"14.5px"}}>
                                                        {owner.settings.wins}
                                                        <span className="" style={{color:"whitesmoke"}}>-</span>  
                                                        {owner.settings.losses}
                                                        <Icon icon="ic:round-circle" className="mx-2" style={{fontSize:".35em", color:"#698b87"}}/>
                                                        <span className=""style={{color:"whitesmoke"}}>{owner.rank}</span>
                                                        <span style={{}}>{
                                                            owner.rank === 1?
                                                                "st"
                                                            : owner.rank === 2?
                                                                "nd"
                                                            : owner.rank === 3?
                                                                "rd"
                                                            : "th"
                                                        } </span>
                                                    </p>
                                                    <p className="m-0 bold" style={{fontSize:"11.5px",color:"#7d91a6"}}>
                                                        <span className="">EXP</span> {owner.owner.exp}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <DraftWidget
                                                    league={league}
                                                    topDraftPick={topDraftPick}
                                                    findPlayer={findPlayer}
                                                    findLogo={findLogo}
                                                    openModal={openModal}
                                                />
                                            </div>
                                        </div>
                                        <div className="mx-5">
                                            <div className="d-flex align-items-center">
                                                {
                                                    tab === "Summary" ?
                                                        <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                                                            <p className="m-0">Summary</p>
                                                        </div>
                                                    :
                                                        <div className="pb-2 px-3" onClick={() => setTab("Summary")}>
                                                            <p className="m-0">Summary</p>
                                                        </div>
                                                }
                                                {
                                                    tab === "Dynasty" ?
                                                        <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                                                            <p className="m-0">Dynasty</p>
                                                        </div>
                                                    :
                                                        <div className="pb-2 px-3" onClick={() => setTab("Dynasty")}>
                                                            <p className="m-0">Dynasty</p>
                                                        </div>
                                                }
                                                {
                                                    tab === "Power" ?
                                                        <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                                                            <p className="m-0">Power</p>
                                                        </div>
                                                    :
                                                        <div className="pb-2 px-3" onClick={() => setTab("Power")}>
                                                            <p className="m-0">Power</p>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                        <div style={{}} className="px-5">
                                            {
                                                tab === "Summary" ?
                                                    <Summary
                                                        id={id}
                                                        loadLeague={loadLeague}
                                                        league={league}
                                                        foundMyMatchups={foundMyMatchups}
                                                        findRosterByID={findRosterByID}
                                                        findRecord={findRecord}
                                                        players={players}
                                                        findLogo={findLogo}
                                                        loadRosters={loadRosters}
                                                        rosters={rosters}
                                                        foundHistory={foundHistory}
                                                        owner={owner}
                                                        handleSzn={handleSzn}
                                                        winPCT={winPCT}
                                                        roundToHundredth={roundToHundredth}
                                                        lineupEfficiency={lineupEfficiency}
                                                        totalPtsPerGame={totalPtsPerGame}
                                                        findPlayer={findPlayer}
                                                        isOdd={isOdd}
                                                        openModal={openModal}
                                                        tab={tab}
                                                        getTotalPts={getTotalPts}
                                                        // weeklyMatch={weeklyMatch}
                                                        // findWeeklyMatchups={findWeeklyMatchups}
                                                        // handleWeeklyMatch={handleWeeklyMatch}
                                                        // vs={vs}
                                                        // handleAllPlay={handleAllPlay}
                                                        // handleVS={handleVS}
                                                        // selectAllPlay={selectAllPlay}
                                                    />
                                                : tab === "Dynasty" ?
                                                    <Dynasty
                                                        id={id}
                                                        loadLeague={loadLeague}
                                                        league={league}
                                                        players={players}
                                                        loadRosters={loadRosters}
                                                        rosters={rosters}
                                                        foundHistory={foundHistory}
                                                        owner={owner}
                                                        findLogo={findLogo}
                                                        winPCT={winPCT}
                                                        roundToHundredth={roundToHundredth}
                                                        findPlayer={findPlayer}
                                                        isOdd={isOdd}
                                                        tab={tab}
                                                        findRosterByName={findRosterByName}
                                                    />
                                                : tab === "Power" ?
                                                    <Power
                                                        id={id}
                                                        loadLeague={loadLeague}
                                                        league={league}
                                                        foundMyMatchups={foundMyMatchups}
                                                        findRosterByID={findRosterByID}
                                                        findRecord={findRecord}
                                                        players={players}
                                                        findLogo={findLogo}
                                                        loadRosters={loadRosters}
                                                        rosters={rosters}
                                                        foundHistory={foundHistory}
                                                        owner={owner}
                                                        handleSzn={handleSzn}
                                                        winPCT={winPCT}
                                                        roundToHundredth={roundToHundredth}
                                                        lineupEfficiency={lineupEfficiency}
                                                        totalPtsPerGame={totalPtsPerGame}
                                                        findPlayer={findPlayer}
                                                        isOdd={isOdd}
                                                        openModal={openModal}
                                                        tab={tab}
                                                        getTotalPts={getTotalPts}
                                                        findRosterByName={findRosterByName}   
                                                        // weeklyMatch={weeklyMatch}
                                                        // findWeeklyMatchups={findWeeklyMatchups}
                                                        // handleWeeklyMatch={handleWeeklyMatch}  
                                                        // vs={vs}
                                                        // handleAllPlay={handleAllPlay}
                                                        // handleVS={handleVS}
                                                        // selectAllPlay={selectAllPlay}
                                                    />
                                                :<></>
                                            }
                                        </div>
                                    </div>
                                )
                            :<></>
                        }
                    </div>
                </div>
                <Modal
                    open={isOpen}
                    id={id}
                    handleDraftClass={handleDraftClass}
                    league={league} 
                    draftClass={draftClass}
                    myDraftPicks={myDraftPicks}
                    isOdd={isOdd}
                    findLogo={findLogo}
                    findPlayer={findPlayer}
                    closeModal={closeModal}
                    foundHistory={foundHistory}
                    modalTab={modalTab}
                    openModal={openModal}
                    findRosterByID={findRosterByID}
                    oID={oID}
                    setOID={setOID}
                    findRecord={findRecord}
                    findGameDate={findGameDate}
                    match={match}
                    setMatch={setMatch}
                    rosters={rosters}
                />
            </>
        
    )
}
