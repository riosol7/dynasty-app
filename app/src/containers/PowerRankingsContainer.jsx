import React, { useState } from "react";
import PowerRankingsUI from "../ui/PowerRankingsUI";
import { getPowerRank, winPCT } from "../utils";

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
  const powerRank = getPowerRank(selectSzn, league, processedRosters, foundHistory);
  console.log(powerRank)
            
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