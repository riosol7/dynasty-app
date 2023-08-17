import React, {useState} from "react";
import StandingsUI from "../ui/StandingsUI";
import { handleRostersBySzn } from "../helpers";
import { roundToHundredth } from "../utils";

export default function StandingsContainer({
  foundHistory,
  league,
  owners,
  playoffs,
  processedRosters,
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
  const handleDivisionRank = (standing, division) => {
    if (standing !== undefined && division !== undefined){
      return standing?.filter(team => team.settings.division === division).map((roster, idx) => ({...roster, rank:idx +1}))
    }
  }; 
  const allTimeStats = owners?.map(owner => {
    const id = owner.roster_id;
    const currentRoster = processedRosters?.totalRoster?.find(roster => roster.roster_id === id)?.settings;
  
    const legacyRosters = league.history.flatMap(szn => szn.rosters.filter(roster => roster.roster_id === id));
  
    const historyWs = legacyRosters.reduce((acc, item) => acc + item.settings.wins, 0);
    const historyLs = legacyRosters.reduce((acc, item) => acc + item.settings.losses, 0);
    const historyFPTS = legacyRosters.reduce((acc, item) => acc + parseFloat(`${item.settings.fpts}.${item.settings.fpts_decimal}`), 0);
    const historyPPTS = legacyRosters.reduce((acc, item) => acc + parseFloat(`${item.settings.ppts}.${item.settings.ppts_decimal}`), 0);
    const historyPA = legacyRosters.reduce((acc, item) => acc + parseFloat(`${item.settings.fpts_against}.${item.settings.fpts_against_decimal}`), 0);
  
    const fptsCurrentYR = currentRoster?.ppts ? parseFloat(`${currentRoster.fpts}.${currentRoster.fpts_decimal}`) : 0;
    const pptsCurrentYR = currentRoster?.ppts ? parseFloat(`${currentRoster.ppts}.${currentRoster.ppts_decimal}`) : 0;
    const fptsAgainstCurrentYR = currentRoster?.ppts ? parseFloat(`${currentRoster.fpts_against}.${currentRoster.fpts_against_decimal}`) : 0;
  
    const percentage = ((currentRoster?.wins + historyWs) / (currentRoster?.wins + historyWs + currentRoster?.losses + historyLs)) * 100;
    const record = `${currentRoster?.wins + historyWs}-${currentRoster?.losses + historyLs}`;
    const fptsTotal = fptsCurrentYR + historyFPTS;
    const pptsTotal = pptsCurrentYR + historyPPTS;
    const fptsAgainstTotal = fptsAgainstCurrentYR + historyPA;

    return {
      ...owner,
      percentage: roundToHundredth(percentage),
      record,
      fpts: roundToHundredth(fptsTotal),
      ppts: roundToHundredth(pptsTotal),
      fpts_against: roundToHundredth(fptsAgainstTotal)
    };
  }).sort((a, b) => {
    if (b.percentage === a.percentage) {
      return b.fpts - a.fpts;
    } else {
      return b.percentage - a.percentage;
    }
  }).map((roster, idx) => ({...roster, rank: idx + 1}));
  
  return (
    <StandingsUI
      allTimeStats={allTimeStats}
      asc={asc}
      asc1={asc1}
      asc2={asc2}
      foundHistory={foundHistory}
      handleDivisionRank={handleDivisionRank}
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