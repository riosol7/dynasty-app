import React, {useState, useEffect} from "react";
import RankingsUI from "../ui/RankingsUI";

export default function RankingsContainer({
  foundHistory,
  league,
  owners,
  processedRosters
}) {
  const [rankings, setRankings] = useState("Standings");
  const [selectSzn, setSelectSzn] = useState(league.season);
  const [playoffs, setPlayoffs] = useState(false);

  const handleRankings = (e) => {
    setRankings(e.target.value);
  }
  const handleSelectSzn = (e) => {
    setSelectSzn(e.target.value);
  }
  const handlePlayoffs = () => {
    setPlayoffs(!playoffs);
  }
  useEffect(() => {
    if(selectSzn === undefined || null){
      setSelectSzn(league.season)
    }
  }, [selectSzn, league.season])

  return (
    <RankingsUI
      foundHistory={foundHistory}
      handlePlayoffs={handlePlayoffs}
      handleRankings={handleRankings}
      handleSelectSzn={handleSelectSzn}
      league={league}
      owners={owners}
      playoffs={playoffs}
      processedRosters={processedRosters}
      rankings={rankings}
      selectSzn={selectSzn}
    />
  )
}
