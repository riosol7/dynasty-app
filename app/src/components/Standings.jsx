import React, {useState} from "react";
import StandingRow from "./temp/StandingRow";
import { Icon } from "@iconify/react";
import PostSeasonBracket from "./PostSeasonBracket";
import { processRosters } from "../helpers";

export default function Standings({
  findRosterByID,
  foundHistory,
  handleRostersBySzn,
  league,
  owners,
  players,
  playoffs,
  rosters,
  roundToHundredth,
  selectSzn,
  winPCT,
}){
  const processedRosters = processRosters(rosters, players, owners);

  const [sort, setSort] = useState("RANK")
  const [asc, setAsc] = useState(false)
  const [sort1, setSort1] = useState("RANK")
  const [asc1, setAsc1] = useState(false)
  const [sort2, setSort2] = useState("RANK")
  const [asc2, setAsc2] = useState(false)

  const handleSort = (value) => {
    if(value === "RANK"){
      setAsc(false)
      setSort(value)
    } else if(value === "RECORD"){
      setAsc(true)
      setSort(value)
    } else if(value === "PF"){
      setAsc(true)
      setSort(value)
    } else if(value === "MAX PF"){
      setAsc(true)
      setSort(value)
    } else if(value === "PA"){
      setAsc(true)
      setSort(value)
    } else {
      setSort("")
    }
  }
  const handleSort1 = (value) => {
    if(value === "RANK"){
      setAsc1(false)
      setSort1(value)
    } else if(value === "RECORD"){
      setAsc1(true)
      setSort1(value)
    } else if(value === "PF"){
      setAsc1(true)
      setSort1(value)
    } else if(value === "MAX PF"){
      setAsc1(true)
      setSort1(value)
    } else if(value === "PA"){
      setAsc1(true)
      setSort1(value)
    } else {
      setSort1("")
    }
  }
  const handleSort2 = (value) => {
    if(value === "RANK"){
      setAsc2(false)
      setSort2(value)
    } else if(value === "RECORD"){
      setAsc2(true)
      setSort2(value)
    } else if(value === "PF"){
      setAsc2(true)
      setSort2(value)
    } else if(value === "MAX PF"){
      setAsc2(true)
      setSort2(value)
    } else if(value === "PA"){
      setAsc2(true)
      setSort2(value)
    } else {
      setSort2("")
    }
  }
  const handleRank = (standing, division) => {
    if(standing !== undefined && division !== undefined){
      return standing.filter(team => team.settings.division === division).map((roster, idx) => ({...roster, rank:idx +1}))
    }
  } 
  let divsRanks = processedRosters?.totalRoster?.length > 1 ? processedRosters?.totalRoster.sort((a,b) => 
  { if(a.settings.wins === b.settings.wins) {
      return (b.settings.fpts) - (a.settings.fpts);
    } else {
      return b.settings.wins - a.settings.wins
    }
  }).map((team, i) => ({...team, rank:i+1})) : []

  let div1Ranks = processedRosters?.totalRoster?.length > 1 ? processedRosters?.totalRoster.filter(roster => roster.settings.division === 1).sort((a,b) => 
  { if(a.settings.wins === b.settings.wins) {
      return (b.settings.fpts) - (a.settings.fpts);
    } else {
      return b.settings.wins - a.settings.wins
    }
  }).map((team, i) => ({...team, rank:i+1})) : []

  let div2Ranks = processedRosters?.totalRoster?.length > 1 ? processedRosters?.totalRoster.filter(roster => roster.settings.division === 2).sort((a,b) => 
  { if(a.settings.wins === b.settings.wins) {
      return (b.settings.fpts) - (a.settings.fpts);
    } else {
      return b.settings.wins - a.settings.wins
    }
  }).map((team, i) => ({...team, rank:i+1})) : []

  const all_time = league.owners && league.owners.map(owner => {
    let id = owner.roster_id

    let currentYR = processedRosters?.totalRoster?.length > 1 && processedRosters?.totalRoster.find(roster => roster.roster_id === id).settings

    let foundHistory = league.history.map(szn => szn.rosters.filter(roster => roster.roster_id === id)[0])
    let historyWs = foundHistory.reduce((acc, item) =>  acc + item.settings.wins, 0)
    let historyLs = foundHistory.reduce((acc, item) =>  acc + item.settings.losses, 0)
    let historyFPTS = foundHistory.reduce((acc, item) =>  acc + Number(item.settings.fpts + "." + item.settings.fpts_decimal), 0)
    let historyPPTS = foundHistory.reduce((acc, item) =>  acc + Number(item.settings.ppts + "." + item.settings.ppts_decimal), 0)
    let historyPA = foundHistory.reduce((acc, item) =>  acc + Number(item.settings.fpts_against + "." + item.settings.fpts_against_decimal), 0)

    let fptsCurrentYR=0;
    let pptsCurrentYR=0;
    let fpts_againstCurrentYR=0
    if(currentYR.fpts!==0&&currentYR.ppts!==undefined&&currentYR.fpts_against!==undefined){
      fptsCurrentYR = currentYR ? Number(currentYR.fpts + "." + currentYR.fpts_decimal) : 0
      pptsCurrentYR = Number(currentYR.ppts + "." + currentYR.ppts_decimal)
      fpts_againstCurrentYR = Number(currentYR.fpts_against + "." + currentYR.fpts_against_decimal)
    }

    return {
      ...owner, 
      percentage:roundToHundredth(((currentYR.wins + historyWs)/(currentYR.wins + historyWs + currentYR.losses + historyLs))*100),
      record:(currentYR.wins + historyWs) + "-" + (currentYR.losses + historyLs),
      fpts:roundToHundredth(fptsCurrentYR + historyFPTS),
      ppts:roundToHundredth(pptsCurrentYR + historyPPTS),
      fpts_against:roundToHundredth(fpts_againstCurrentYR + historyPA)
      }
    } 
  ).sort((a,b) => {
    if(b.percentage === a.percentage){
      return b.fpts - a.fpts
    } else {
      return parseFloat(b.percentage) - parseFloat(a.percentage)
    }
  }).map((roster, idx) => ({...roster, rank:idx +1}))

  const findRosterBySzn=(szn, id)=>{
    if(szn !== undefined && id !== undefined){
      if(szn===league.season){
        return handleRostersBySzn(selectSzn, league, rosters).filter(r=>r.roster_id === id)[0]
      } else {
        return handleRostersBySzn(selectSzn, league, rosters)[0].filter(r=>r.roster_id === id)[0]
      }
    } 
  }
 return (
    <>
      { 
        selectSzn === league.season ?
        // IN SEASON :: CURRENT YR
          playoffs===true?
            <PostSeasonBracket
              league={league}
              selectSzn={selectSzn}
              findRosterByID={findRosterByID}
              handleRostersBySzn={handleRostersBySzn}
              foundHistory={foundHistory}
              findRosterBySzn={findRosterBySzn}
            />  
          :
            <div className="">
              <div className="my-2" style={{fontSize:"14px"}}>
                <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                  <div className="col-sm-7 d-flex align-items-center"> 
                    <div className="col-sm-1">
                      {
                        sort1 === "RANK" ?
                          asc1 === false ?
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>RANK</p>
                              <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                          :
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>RANK</p>
                              <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                        :
                        <p className="StandingCell m-0" onClick={() => handleSort1("RANK")}>RANK</p>
                      }
                    </div>
                    <p className="m-0 StandingCell">DIVISION 1 TEAM</p>
                  </div>
                  {
                    sort1 === "RECORD" ?
                      asc1 === true ?
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>RECORD</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>RECORD</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-2 d-flex align-items-center">
                        <p className="m-0 StandingCell" onClick={() => handleSort1("RECORD")}>RECORD</p>
                      </div>
                  }
                  {
                    sort1 === "PF" ?
                      asc1 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc1(false)}>PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort1("PF")}>PF</p>
                      </div>
                  }
                  {
                    sort1 === "MAX PF" ?
                      asc1 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc1(false)}>MAX PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>MAX PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort1("MAX PF")}>MAX PF</p>
                      </div>
                  }
                  {
                    sort1 === "PA" ?
                      asc1 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>PA</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>PA</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort1("PA")}>PA</p>
                      </div>
                  }
                </div>
                { 
                  (sort1 === "RANK" && asc1 === false)  || (sort1 === "RECORD" && asc1 === true) ? 
                    div1Ranks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "RANK" && asc1 === true)  || (sort1 === "RECORD" && asc1 === false) ? 
                    div1Ranks.reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "PF" && asc1 === true) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "PF" && asc1 === false) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "MAX PF" && asc1 === true) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "MAX PF" && asc1 === false) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "PA" && asc1 === true) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "PA" && asc1 === false) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :
                    div1Ranks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                }
              </div>
              {/* |||||||| DIVISION 2 |||||||| */}
              <div className="my-2" style={{fontSize:"14px"}}>
                <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                  <div className="col-sm-7 d-flex align-items-center"> 
                    <div className="col-sm-1">
                      {
                        sort2 === "RANK" ?
                          asc2 === false ?
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>RANK</p>
                              <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                          :
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>RANK</p>
                              <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                        :
                        <p className="StandingCell m-0" onClick={() => handleSort2("RANK")}>RANK</p>
                      }
                    </div>
                    <p className="m-0 StandingCell">DIVISION 2 TEAM</p>
                  </div>
                  {
                    sort2 === "RECORD" ?
                      asc2 === true ?
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>RECORD</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>RECORD</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-2 d-flex align-items-center">
                        <p className="m-0 StandingCell" onClick={() => handleSort2("RECORD")}>RECORD</p>
                      </div>
                  }
                  {
                    sort2 === "PF" ?
                      asc2 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc2(false)}>PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort2("PF")}>PF</p>
                      </div>
                  }
                  {
                    sort2 === "MAX PF" ?
                      asc2 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc2(false)}>MAX PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>MAX PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort2("MAX PF")}>MAX PF</p>
                      </div>
                  }
                  {
                    sort2 === "PA" ?
                      asc2 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>PA</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>PA</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort2("PA")}>PA</p>
                      </div>
                  }
                </div>
                { 
                  (sort2 === "RANK" && asc2 === false)  || (sort2 === "RECORD" && asc2 === true) ? 
                    div2Ranks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "RANK" && asc2 === true)  || (sort2 === "RECORD" && asc2 === false) ? 
                    div2Ranks.reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "PF" && asc2 === true) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "PF" && asc2 === false) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "MAX PF" && asc2 === true) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "MAX PF" && asc2 === false) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      /> 
                    )
                  :(sort2 === "PA" && asc2 === true) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "PA" && asc2 === false) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :
                    div2Ranks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                }
              </div>
              {/* |||||||| ALL DIVISIONS |||||||| */}
              <div className="my-2" style={{fontSize:"14px"}}>
                <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                  <div className="col-sm-7 d-flex align-items-center"> 
                    <div className="col-sm-1">
                      {
                        sort === "RANK" ?
                          asc === false ?
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RANK</p>
                              <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                          :
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RANK</p>
                              <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                        :
                        <p className="StandingCell m-0" onClick={() => handleSort("RANK")}>RANK</p>
                      }
                    </div>
                    <p className="m-0 StandingCell">TEAM</p>
                  </div>
                  {
                    sort === "RECORD" ?
                      asc === true ?
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RECORD</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RECORD</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-2 d-flex align-items-center">
                        <p className="m-0 StandingCell" onClick={() => handleSort("RECORD")}>RECORD</p>
                      </div>
                  }
                  {
                    sort === "PF" ?
                      asc === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc(false)}>PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort("PF")}>PF</p>
                      </div>
                  }
                  {
                    sort === "MAX PF" ?
                      asc === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc(false)}>MAX PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>MAX PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort("MAX PF")}>MAX PF</p>
                      </div>
                  }
                  {
                    sort === "PA" ?
                      asc === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(false)}>PA</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PA</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort("PA")}>PA</p>
                      </div>
                  }
                </div>
                { 
                  (sort === "RANK" && asc === false)  || (sort === "RECORD" && asc === true) ? 
                    divsRanks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "RANK" && asc === true)  || (sort === "RECORD" && asc === false) ? 
                    divsRanks.reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "PF" && asc === true) ? 
                    divsRanks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "PF" && asc === false) ? 
                    divsRanks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "MAX PF" && asc === true) ? 
                    divsRanks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "MAX PF" && asc === false) ? 
                    divsRanks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "PA" && asc === true) ? 
                    divsRanks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "PA" && asc === false) ? 
                    divsRanks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :
                    divsRanks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                }
              </div>
            </div>
        : selectSzn === "All Time"?
          <div className="my-2">
            <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
              <div className="col-sm-7 d-flex align-items-center"> 
                <div className="col-sm-1">
                  {
                    sort === "RANK" ?
                      asc === false ?
                        <div className="d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RANK</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RANK</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                    <p className="StandingCell m-0" onClick={() => handleSort("RANK")}>RANK</p>
                  }
                </div>
                <p className="m-0 StandingCell">TEAM</p>
              </div>
              {
                sort === "RECORD" ?
                  asc === true ?
                    <div className="col-sm-2 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RECORD</p>
                      <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                  :
                    <div className="col-sm-2 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RECORD</p>
                      <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                :
                  <div className="col-sm-2 d-flex align-items-center">
                    <p className="m-0 StandingCell" onClick={() => handleSort("RECORD")}>RECORD</p>
                  </div>
              }
              {
                sort === "PF" ?
                  asc === true ?
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell"onClick={() => setAsc(false)}>PF</p>
                      <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                  :
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PF</p>
                      <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                :
                  <div className="col-sm-1">
                    <p className="m-0 StandingCell" onClick={() => handleSort("PF")}>PF</p>
                  </div>
              }
              {
                sort === "MAX PF" ?
                  asc === true ?
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell"onClick={() => setAsc(false)}>MAX PF</p>
                      <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                  :
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(true)}>MAX PF</p>
                      <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                :
                  <div className="col-sm-1">
                    <p className="m-0 StandingCell" onClick={() => handleSort("MAX PF")}>MAX PF</p>
                  </div>
              }
              {
                sort === "PA" ?
                  asc === true ?
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(false)}>PA</p>
                      <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                  :
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PA</p>
                      <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                :
                  <div className="col-sm-1">
                    <p className="m-0 StandingCell" onClick={() => handleSort("PA")}>PA</p>
                  </div>
              }
            </div>
            { 
              (sort === "RANK" && asc === false)  || (sort === "RECORD" && asc === true) ? 
                all_time.map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "RANK" && asc === true)  || (sort === "RECORD" && asc === false) ? 
                all_time.reverse().map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "PF" && asc === true) ? 
                all_time.sort((a,b) => b.fpts - a.fpts).map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "PF" && asc === false) ? 
                all_time.sort((a,b) => b.fpts - a.fpts).reverse().map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "MAX PF" && asc === true) ? 
                all_time.sort((a,b) => b.ppts - a.ppts).map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "MAX PF" && asc === false) ? 
                all_time.sort((a,b) => b.ppts - a.ppts).reverse().map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "PA" && asc === true) ? 
                all_time.sort((a,b) => b.fpts_against - a.fpts_against).map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "PA" && asc === false) ? 
                all_time.sort((a,b) => b.fpts_against - a.fpts_against).reverse().map((owner, i) => 
                <StandingRow
                  key={i}
                  winPCT={winPCT}
                  selectSzn={selectSzn}
                  owner={owner}
                  league={league}
                />
                )
              :<></>
            }
          </div>
        : 
          handleRostersBySzn(selectSzn, league, rosters).map((r,j) => 
            playoffs===true?
              <PostSeasonBracket
                key={j}
                league={league}
                selectSzn={selectSzn}
                findRosterByID={findRosterByID}
                handleRostersBySzn={handleRostersBySzn}
                foundHistory={foundHistory}
                findRosterBySzn={findRosterBySzn}
              />  
            :
              <div key={j}>
                <div className="my-2" style={{fontSize:"14px"}}>
                  <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                    <div className="col-sm-7 d-flex align-items-center"> 
                      <div className="col-sm-1">
                        {
                          sort1 === "RANK" ?
                            asc1 === false ?
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>RANK</p>
                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                            :
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>RANK</p>
                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                          :
                          <p className="StandingCell m-0" onClick={() => handleSort1("RANK")}>RANK</p>
                        }
                      </div>
                      <p className="m-0 StandingCell">DIVISION 1 TEAM</p>
                    </div>
                    {
                      sort1 === "RECORD" ?
                        asc1 === true ?
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>RECORD</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>RECORD</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => handleSort1("RECORD")}>RECORD</p>
                        </div>
                    }
                    {
                      sort1 === "PF" ?
                        asc1 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc1(false)}>PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort1("PF")}>PF</p>
                        </div>
                    }
                    {
                      sort1 === "MAX PF" ?
                        asc1 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc1(false)}>MAX PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>MAX PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort1("MAX PF")}>MAX PF</p>
                        </div>
                    }
                    {
                      sort1 === "PA" ?
                        asc1 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>PA</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>PA</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort1("PA")}>PA</p>
                        </div>
                    }
                  </div>
                  { 
                    (sort1 === "RANK" && asc1 === false)  || (sort1 === "RECORD" && asc1 === true) ? 
                      handleRank(r, 1).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      ) 
                    : (sort1 === "RANK" && asc1 === true)  || (sort1 === "RECORD" && asc1 === false) ? 
                      handleRank(r, 1).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "PF" && asc1 === true) ? 
                      handleRank(r, 1).sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "PF" && asc1 === false) ? 
                      handleRank(r, 1).sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "MAX PF" && asc1 === true) ? 
                      handleRank(r, 1).sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "MAX PF" && asc1 === false) ? 
                      handleRank(r, 1).sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "PA" && asc1 === true) ? 
                      handleRank(r, 1).sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "PA" && asc1 === false) ? 
                      handleRank(r, 1).sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    :
                      div1Ranks.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                  }
                </div>
                {/* |||||||| DIVISION 2 |||||||| */}
                <div className="my-2" style={{fontSize:"14px"}}>
                  <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                    <div className="col-sm-7 d-flex align-items-center"> 
                      <div className="col-sm-1">
                        {
                          sort2 === "RANK" ?
                            asc2 === false ?
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>RANK</p>
                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                            :
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>RANK</p>
                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                          :
                          <p className="StandingCell m-0" onClick={() => handleSort2("RANK")}>RANK</p>
                        }
                      </div>
                      <p className="m-0 StandingCell">DIVISION 2 TEAM</p>
                    </div>
                    {
                      sort2 === "RECORD" ?
                        asc2 === true ?
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>RECORD</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>RECORD</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => handleSort2("RECORD")}>RECORD</p>
                        </div>
                    }
                    {
                      sort2 === "PF" ?
                        asc2 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc2(false)}>PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort2("PF")}>PF</p>
                        </div>
                    }
                    {
                      sort2 === "MAX PF" ?
                        asc2 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc2(false)}>MAX PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>MAX PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort2("MAX PF")}>MAX PF</p>
                        </div>
                    }
                    {
                      sort2 === "PA" ?
                        asc2 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>PA</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>PA</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort2("PA")}>PA</p>
                        </div>
                    }
                  </div>
                  { 
                    (sort2 === "RANK" && asc2 === false)  || (sort2 === "RECORD" && asc2 === true) ? 
                      handleRank(r, 2).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "RANK" && asc2 === true)  || (sort2 === "RECORD" && asc2 === false) ? 
                      handleRank(r, 2).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "PF" && asc2 === true) ? 
                      handleRank(r, 2).sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "PF" && asc2 === false) ? 
                      handleRank(r, 2).sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "MAX PF" && asc2 === true) ? 
                      handleRank(r, 2).sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "MAX PF" && asc2 === false) ? 
                      handleRank(r, 2).sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "PA" && asc2 === true) ? 
                      handleRank(r, 2).sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "PA" && asc2 === false) ? 
                      handleRank(r, 2).sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    :
                      handleRank(r, 2).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                  }
                </div>
                <div className="my-2" style={{fontSize:"14px"}}>
                  <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                    <div className="col-sm-7 d-flex align-items-center"> 
                      <div className="col-sm-1">
                        {
                          sort === "RANK" ?
                            asc === false ?
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RANK</p>
                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                            :
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RANK</p>
                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                          :
                          <p className="StandingCell m-0" onClick={() => handleSort("RANK")}>RANK</p>
                        }
                      </div>
                      <p className="m-0 StandingCell">TEAM</p>
                    </div>
                    {
                      sort === "RECORD" ?
                        asc === true ?
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RECORD</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RECORD</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => handleSort("RECORD")}>RECORD</p>
                        </div>
                    }
                    {
                      sort === "PF" ?
                        asc === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc(false)}>PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort("PF")}>PF</p>
                        </div>
                    }
                    {
                      sort === "MAX PF" ?
                        asc === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc(false)}>MAX PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(true)}>MAX PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort("MAX PF")}>MAX PF</p>
                        </div>
                    }
                    {
                      sort === "PA" ?
                        asc === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(false)}>PA</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PA</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort("PA")}>PA</p>
                        </div>
                    }
                  </div>
                  { 
                    (sort === "RANK" && asc === false)  || (sort === "RECORD" && asc === true) ? 
                      r.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "RANK" && asc === true)  || (sort === "RECORD" && asc === false) ? 
                      r.reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "PF" && asc === true) ? 
                      r.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "PF" && asc === false) ? 
                      r.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "MAX PF" && asc === true) ? 
                      r.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "MAX PF" && asc === false) ? 
                      r.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "PA" && asc === true) ? 
                      r.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "PA" && asc === false) ? 
                      r.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).reverse().map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    :
                      r.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                  }
                </div>
              </div>
          )
      }
    </>
    )
}