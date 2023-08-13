import React, {useState} from "react";
import StandingsUI from "../ui/StandingsUI";
import { handleRostersBySzn } from "../helpers";
import { roundToHundredth } from "../utils";

export default function StandingsContainer({
  foundHistory,
  league,
  playoffs,
  processedRosters,
  rosters,
  selectSzn,
}){
  const [sort, setSort] = useState("RANK");
  const [asc, setAsc] = useState(false);
  const [sort1, setSort1] = useState("RANK");
  const [asc1, setAsc1] = useState(false);
  const [sort2, setSort2] = useState("RANK");
  const [asc2, setAsc2] = useState(false);

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
    if (standing !== undefined && division !== undefined){
      return standing.filter(team => team.settings.division === division).map((roster, idx) => ({...roster, rank:idx +1}))
    }
  }; 
  let divsRanks = processedRosters?.totalRoster?.length > 1 ? processedRosters?.totalRoster.sort((a,b) => { 
    if (a.settings.wins === b.settings.wins) {
      return (b.settings.fpts) - (a.settings.fpts);
    } else {
      return b.settings.wins - a.settings.wins
    }
  }).map((team, i) => ({...team, rank:i+1})) : []

  let div1Ranks = processedRosters?.totalRoster?.length > 1 ? processedRosters?.totalRoster.filter(roster => roster.settings.division === 1).sort((a,b) => { 
    if (a.settings.wins === b.settings.wins) {
      return (b.settings.fpts) - (a.settings.fpts);
    } else {
      return b.settings.wins - a.settings.wins
    }
  }).map((team, i) => ({...team, rank:i+1})) : []

  let div2Ranks = processedRosters?.totalRoster?.length > 1 ? processedRosters?.totalRoster.filter(roster => roster.settings.division === 2).sort((a,b) => { 
    if (a.settings.wins === b.settings.wins) {
      return (b.settings.fpts) - (a.settings.fpts);
    } else {
      return b.settings.wins - a.settings.wins
    }
  }).map((team, i) => ({...team, rank:i+1})) : []

  const all_time = league.owners && league.owners.map(owner => {
    let id = owner.roster_id;

    let currentYR = processedRosters?.totalRoster?.length > 1 && processedRosters?.totalRoster.find(roster => roster.roster_id === id).settings;

    let foundHistory = league.history.map(szn => szn.rosters.filter(roster => roster.roster_id === id)[0]);
    let historyWs = foundHistory.reduce((acc, item) =>  acc + item.settings.wins, 0);
    let historyLs = foundHistory.reduce((acc, item) =>  acc + item.settings.losses, 0);
    let historyFPTS = foundHistory.reduce((acc, item) =>  acc + Number(item.settings.fpts + "." + item.settings.fpts_decimal), 0);
    let historyPPTS = foundHistory.reduce((acc, item) =>  acc + Number(item.settings.ppts + "." + item.settings.ppts_decimal), 0);
    let historyPA = foundHistory.reduce((acc, item) =>  acc + Number(item.settings.fpts_against + "." + item.settings.fpts_against_decimal), 0);

    let fptsCurrentYR = 0;
    let pptsCurrentYR = 0;
    let fpts_againstCurrentYR = 0;

    if (currentYR.fpts!==0 && currentYR.ppts!==undefined && currentYR.fpts_against!==undefined) {
      fptsCurrentYR = currentYR ? Number(currentYR.fpts + "." + currentYR.fpts_decimal) : 0
      pptsCurrentYR = Number(currentYR.ppts + "." + currentYR.ppts_decimal);
      fpts_againstCurrentYR = Number(currentYR.fpts_against + "." + currentYR.fpts_against_decimal);
    }

    return {
      ...owner, 
      percentage:roundToHundredth(((currentYR.wins + historyWs)/(currentYR.wins + historyWs + currentYR.losses + historyLs))*100),
      record:(currentYR.wins + historyWs) + "-" + (currentYR.losses + historyLs),
      fpts:roundToHundredth(fptsCurrentYR + historyFPTS),
      ppts:roundToHundredth(pptsCurrentYR + historyPPTS),
      fpts_against:roundToHundredth(fpts_againstCurrentYR + historyPA)
    }
  }).sort((a,b) => {
    if (b.percentage === a.percentage) {
      return b.fpts - a.fpts
    } else {
      return parseFloat(b.percentage) - parseFloat(a.percentage)
    }
  }).map((roster, idx) => ({...roster, rank:idx +1}))

  const findRosterBySzn=(szn, id) => {
    if (szn !== undefined && id !== undefined) {
      if (szn===league.season){
        return handleRostersBySzn(selectSzn, league, processedRosters).filter(r => r.roster_id === id)[0]
      } else {
        return handleRostersBySzn(selectSzn, league, rosters)[0].filter(r=>r.roster_id === id)[0]
      }
    } 
  }
  
  return (
    <StandingsUI
      all_time={all_time}
      asc={asc}
      asc1={asc1}
      asc2={asc2}
      divsRanks={divsRanks}
      div1Ranks={div1Ranks}
      div2Ranks={div2Ranks}
      findRosterBySzn={findRosterBySzn}
      foundHistory={foundHistory}
      handleRank={handleRank}
      handleRostersBySzn={handleRostersBySzn}
      handleSort={handleSort}
      handleSort1={handleSort1}
      handleSort2={handleSort2}
      league={league}
      playoffs={playoffs}
      processedRosters={processedRosters}
      selectSzn={selectSzn}
      setAsc={setAsc}
      setAsc1={setAsc1}
      setAsc2={setAsc2}
      sort={sort}
      sort1={sort1}
      sort2={sort2}
    />
  )
}