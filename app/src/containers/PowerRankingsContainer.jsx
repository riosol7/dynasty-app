import React, {useState} from 'react'
import PowerRankingsUI from '../ui/PowerRankingsUI';

export default function PowerRankingsContainer({
    foundHistory,
    league,
    processedRosters,
    roundToHundredth,
    selectSzn,
    winPCT,
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
             
    const powerRankC=processedRosters?.totalRoster.map(r => ({
        ...r,
        apW:foundHistory(r.roster_id).c.allPlayRecordW,
        apL:foundHistory(r.roster_id).c.allPlayRecordL,
        apR:winPCT(foundHistory(r.roster_id).c.allPlayRecordW,foundHistory(r.roster_id).c.allPlayRecordL)

    })).sort((a,b) => b.apR - a.apR)
    let powerRankS=league && league.history.filter(l => l.year === selectSzn)[0] !== undefined?
        league.history.filter(l => l.year === selectSzn)[0].rosters.map(r => ({
            ...r,
            apW:foundHistory(r.roster_id,selectSzn).s.allPlayRecordW,
            apL:foundHistory(r.roster_id,selectSzn).s.allPlayRecordL,
            apR:winPCT(foundHistory(r.roster_id,selectSzn).s.allPlayRecordW,foundHistory(r.roster_id,selectSzn).s.allPlayRecordL)
        })).sort((a,b) => b.apR - a.apR)
    :[]
    let pwrRank=powerRankS.length>0?powerRankS:powerRankC
    return (
        <PowerRankingsUI
            asc={asc}
            handleSort={handleSort}
            pwrRank={pwrRank}  
            roundToHundredth={roundToHundredth}
            setAsc={setAsc}
            sort={sort}
            winPCT={winPCT}
        />
    )
}
