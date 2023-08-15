import React, {useState} from 'react';
import DynastyRankingsUI from '../ui/DynastyRankingsUI';

export default function DynastyRankingsContainer({
  processedRosters,
}) {
    const [sort, setSort] = useState("")
    const [asc, setAsc] = useState(false)

    const handleSort = (value) => {
      if(value === "RANK"){
        setAsc(false)
        setSort(value)
      } else if(value === "TOTAL"){
        setAsc(true)
        setSort(value)
      } else if(value === "QB"){
        setAsc(true)
        setSort(value)
      } else if(value === "RB"){
        setAsc(true)
        setSort(value)
      } else if(value === "WR"){
        setAsc(true)
        setSort(value)
      } else if(value === "TE"){
          setAsc(true)
          setSort(value)
      } else {
        setSort("")
      }
    }

    const handleRank = (display_name) => {
      let foundTeamRank = processedRosters?.teamRank?.filter(roster => roster.kct?.owner?.display_name === display_name)
      return foundTeamRank[0].rank
    }
    const findEXP = (display_name) => {
        let foundTeamRank = processedRosters?.teamRank?.find(roster => roster.kct?.owner?.display_name === display_name)
        return foundTeamRank?.kct?.owner?.exp
    }

    return (
        <DynastyRankingsUI
            asc={asc}
            findEXP={findEXP}
            handleRank={handleRank}
            handleSort={handleSort}
            processedRosters={processedRosters}
            setAsc={setAsc}
            sort={sort}
        />
    )
}
