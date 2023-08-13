import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { processRosters } from "../helpers";
import LeagueNavigation from "../layouts/LeagueNavigation";
import OwnerHeader from "../layouts/OwnerHeader";
import OwnerBody from "../layouts/OwnerBody";
import Modal from "../components/modals/Modal";

export default function Owner({
    activityBar,
    findPlayer,
    findRosterByID,
    foundHistory,
    // getTotalPts,
    league,
    // lineupEfficiency,
    loadLeague,
    loadMatches,
    loadRosters,
    owners,
    matches,
    matchups,
    players,
    rosters,
    // roundToHundredth,
    setActivityBar,
    // winPCT,
}) {
    const {id} = useParams()
    const processedRosters = processRosters(rosters, players, owners);

    const [isOpen, setIsOpen] = useState(false)
    const [match, setMatch] = useState([])
    const [oID, setOID] = useState("")
    const [modalTab, setModalTab] = useState("")
    const [draftClass, setDraftClass] = useState(league.season)

    const handleDraftClass = (e) => {
        setDraftClass(e.target.value)
    }
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
    const findRecord = (matches, week) => {
        let w = 0;
        let l = 0;
        let record;

        matches?.filter((_, idx) => idx <= week).forEach(team => {
            if (team[0].matchup_id === null || (team[0].points === 0 && team[1].points === 0)){
                return record;
            
            } else if (team[0].roster_id === Number(id)) {
                w++;
                record = w + " - " + l;
                return record;
            }
                l ++;
                record = w + " - " + l;
                return record;
        });

        return {
            record: record,
            w: w,
            l: l
        }
    }
    const topDraftPick = league?.draft?.picks?.filter(p => p.roster_id === Number(id))[0]
    
    const findGameDate = (score1, score2, opID) => {
        let historyArray = []
        let currentArray = []
        if(score1 !== undefined && score2 !== undefined){
            historyArray =  league.history && league.history.map(szn => { return [
                Object.entries(szn.matchups).map(g => g), 
                szn.year
            ]}).map(y => {
                return y[0].map(w => {
                    if(w[1].filter(r => (r.points === score1 || r.points === score2) && (r.roster_id === Number(id) || r.roster_id === opID)).length >0){

                        return {
                            game:w[1].filter(r => (r.points === score1 || r.points === score2) && (r.roster_id === Number(id) || r.roster_id === opID)),
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
            currentArray = matches.map((w,wkIdx) => {return {game:w.filter(r => r.points === score1 || r.points === score2),week:`Week ${wkIdx+1}`,year:league.season}}).filter(y => y.game.length > 0)[0]
        }
        return historyArray !== undefined? historyArray : currentArray
    }
    
    useEffect(() => {
        if(draftClass === undefined || null){
          setDraftClass(league.season)
        }
    }, [draftClass, league.season])

    return (loadLeague && loadRosters && loadMatches ? <div style={{width:"100%", height:"100vh"}}></div> :
        <>
            <div className="home">
                <div className="pt-3 px-5">
                    <LeagueNavigation
                        activityBar={activityBar}
                        league={league}
                        loadLeague={loadLeague}
                        setActivityBar={setActivityBar}
                    />
                    {
                        processedRosters?.totalRoster && league?.history && matches ?
                            processedRosters?.totalRoster.filter(roster => roster.roster_id === Number(id)).map((roster, i) => 
                                <div key={i}>
                                    <OwnerHeader 
                                        findPlayer={findPlayer}
                                        league={league}
                                        openModal={openModal}
                                        players={players}
                                        roster={roster}
                                        topDraftPick={topDraftPick}
                                    />
                                    <OwnerBody
                                        findRecord={findRecord}
                                        findRosterByID={findRosterByID}
                                        foundHistory={foundHistory}
                                        id={id}
                                        league={league} 
                                        loadLeague={loadLeague} 
                                        loadRosters={loadRosters} 
                                        matches={matches}
                                        matchups={matchups}
                                        openModal={openModal}
                                        players={players}
                                        processedRosters={processedRosters}
                                        roster={roster}
                                    />
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
