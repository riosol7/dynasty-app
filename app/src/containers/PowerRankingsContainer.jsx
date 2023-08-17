import React, { useState } from "react";
import PowerRankingsUI from "../ui/PowerRankingsUI";
import { winPCT } from "../utils";

export default function PowerRankingsContainer({
  foundHistory,
  league,
  processedRosters,
  selectSzn,
}) {
  const [sort,setSort] = useState("")
  const [asc,setAsc] = useState(false)
  const handleSort = (value) => {
    if(value === "RANK"){
      setAsc(false)
      setSort(value)
    } else if(value === "W"){
      setAsc(true)
      setSort(value)
    } else if(value === "L"){
      setAsc(true)
      setSort(value)
    } else if(value === "Luck"){
      setAsc(true)
      setSort(value)
    } else {
      setSort("")
    }
  }
  const getPowerRank = () => {
    if (selectSzn === league.season) {
      return processedRosters?.totalRoster?.map(r => ({
        ...r,
        apW:foundHistory(r.roster_id, selectSzn).s.allPlayRecordW,
        apL:foundHistory(r.roster_id, selectSzn).s.allPlayRecordL,
        apR:winPCT(foundHistory(r.roster_id, selectSzn).s.allPlayRecordW, foundHistory(r.roster_id, selectSzn).s.allPlayRecordL)
      })).sort((a,b) => b.apR - a.apR).map((roster, idx) => ({...roster, rank:idx+1}))

    } else if (league?.history?.filter(l => l.year === selectSzn)[0] !== undefined) {
      return league.history.filter(l => l.year === selectSzn)[0].rosters.map(r => ({
        ...r,
        apW:foundHistory(r.roster_id, selectSzn).s.allPlayRecordW,
        apL:foundHistory(r.roster_id, selectSzn).s.allPlayRecordL,
        apR:winPCT(foundHistory(r.roster_id, selectSzn).s.allPlayRecordW,foundHistory(r.roster_id, selectSzn).s.allPlayRecordL)
      })).sort((a,b) => b.apR - a.apR).map((roster, idx) => ({...roster, rank:idx+1}))
    }
  };
  const powerRank = getPowerRank();
            
  return (
    <PowerRankingsUI
      asc={asc}
      handleSort={handleSort}
      pwrRank={powerRank}  
      setAsc={setAsc}
      sort={sort}
      winPCT={winPCT}
    />
  )
}