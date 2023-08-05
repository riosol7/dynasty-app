import React, {useState, useEffect} from 'react'

import Standings from './Standings';
import DynastyRankings from "./DynastyRankings";
import { Icon } from '@iconify/react';
import PowerRankings from './PowerRankings';

// const FIXED = {
//   position:"fixed", 
//   zIndex:"9999", 
//   background:"black", 
//   width:"75%",
//   display:"block"
// }

export default function Rankings(props) {
  const loadRosters = props.loadRosters
  const rosters = props.rosters
  const loadLeague = props.loadLeague
  const league = props.league
  const findRosterByID=props.findRosterByID
  const handleRostersBySzn=props.handleRostersBySzn
  const foundHistory=props.foundHistory
  const roundToHundredth=props.roundToHundredth
  const owners=props.owners
  const players=props.players
  const winPCT=props.winPCT
  const lineupEfficiency=props.lineupEfficiency

  const [rankings, setRankings] = useState("Standings")
  const [selectSzn,setSelectSzn] = useState(league.season)
  const [playoffs,setPlayoffs] = useState(false)
  // const [isOpen, setIsOpen] = useState(false)
  // const [fix, setFix] = useState(false)


  const handleRankings = (e) => {
    setRankings(e.target.value);
  }
  const handleSelectSzn = (e) => {
    setSelectSzn(e.target.value);
  }
  const handlePlayoffs = () => {
    setPlayoffs(!playoffs);
  }
  // const handleFix = () => {
  //     if(document.querySelector("#scrollBar").scrollY >= 150){
  //       setFix(true)
  //     } else {
  //       setFix(false)
  //     }
  //   }
  
  // league ?  document.querySelector("#scrollBar").addEventListener("scroll", handleFix) : <></>

  useEffect(() => {
    if(selectSzn === undefined || null){
      setSelectSzn(league.season)
    }
  }, [selectSzn, league.season])

  return (
    <>
    { loadRosters && loadLeague ? <p>Loading </p> :
      <div className="">
        {/* <div className="d-flex align-items-center justify-content-between" style={fix ? FIXED: {}}> */}
        <div className="d-flex align-items-center justify-content-between sticky-top pt-3 pb-2" style={{background:"black"}}>
          <div className="d-flex align-items-center">
            <Icon icon="icon-park-outline:ranking" style={{color:"#a9dfd8",fontSize:"1.1rem"}}/>
            <select className="m-0 mx-1 bold" onChange={handleRankings} value={rankings} style={{background:"black", color:"white", border:"none"}}>
              <option value={"Dynasty"}>Dynasty</option>
              <option value={"Power"}>Power</option>
              <option value={"Standings"}>Standings</option>
            </select>
          </div>
          {
            rankings === "Standings" || rankings==="Power"?
              <div className="d-flex align-items-center">
                {
                  selectSzn !== "All Time" && rankings !== "Power" ?
                    <div className="mx-4">
                      <Icon icon="mdi:bracket" onClick={() => handlePlayoffs()} style={ playoffs ? {fontSize:"1.4rem", color:"#a9dfd8"} : {fontSize:"1.4rem", color:"#cbcbcb"}}/>
                    </div>
                  :<></>
                }
                <div className="d-flex align-items-center">
                  <select className="p-2" onChange={handleSelectSzn} value={selectSzn} style={{fontSize:".8em", borderRadius:"25px", border:"2px solid #3bdbba", background:"black", color:"white"}}>
                    <option value={league.season}>{league.season}</option>
                      {
                        league.history ? 
                          league.history.map((l, i) => 
                            <option key={i} value={l.year}>{l.year}</option>
                          )
                        :<></>
                      }
                      {
                        rankings ==="Standings" && playoffs===false?
                          <option value="All Time">All Time</option>
                        :<></>
                      }
                  </select>
                </div>
              </div>
            :  
              <div className="d-flex align-items-center">
                <select className="p-2" style={{fontSize:".8em", borderRadius:"25px", border:"2px solid #3bdbba", background:"black", color:"white"}}>
                  <option value={"KCT"}>kct</option>
                </select>
              </div>
          } 
        </div>
        
        <div className="">
        { 
          rankings==="Standings"? 
            <Standings
              owners={owners}
              players={players}
              rosters={rosters}
              league={league}
              selectSzn={selectSzn}
              playoffs={playoffs}
              findRosterByID={findRosterByID}
              handleRostersBySzn={handleRostersBySzn}
              foundHistory={foundHistory}
              roundToHundredth={roundToHundredth}
              winPCT={winPCT}
            />
          : rankings==="Dynasty"?
            <DynastyRankings
              loadRosters={loadRosters}
              rosters={rosters}
              loadLeague={loadLeague}
              league={league}
              roundToHundredth={roundToHundredth}
            />
          : rankings==="Power"?
            <PowerRankings
              rosters={rosters}
              league={league}
              foundHistory={foundHistory}
              winPCT={winPCT}
              selectSzn={selectSzn}
              roundToHundredth={roundToHundredth}
              lineupEfficiency={lineupEfficiency}
            />
          :<></>
        }
        </div>
      
      </div>
    }
    </>
  )
}
