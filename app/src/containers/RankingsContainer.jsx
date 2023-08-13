import React, {useState, useEffect} from "react";
import RankingsUI from "../ui/RankingsUI";
import { processRosters } from "../helpers";

export default function RankingsContainer({
  foundHistory,
  league,
  loadLeague,
  loadRosters,
  owners,
  players,
  rosters,
}) {
  const [rankings, setRankings] = useState("Standings");
  const [selectSzn, setSelectSzn] = useState(league.season);
  const [playoffs, setPlayoffs] = useState(false);

  const processedRosters = processRosters(rosters, players, owners);

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
      loadLeague={loadLeague}
      loadRosters={loadRosters}
      playoffs={playoffs}
      processedRosters={processedRosters}
      rankings={rankings}
      rosters={rosters}
      selectSzn={selectSzn}
    />
  )
}
