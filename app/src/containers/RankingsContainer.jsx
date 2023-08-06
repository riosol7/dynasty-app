import React, {useState, useEffect} from "react";
import RankingsUI from "../ui/RankingsUI";
import { processRosters } from "../helpers";

export default function RankingsContainer({
  findRosterByID,
  foundHistory,
  handleRostersBySzn,
  league,
  lineupEfficiency,
  loadLeague,
  loadRosters,
  owners,
  players,
  rosters,
  roundToHundredth,
  winPCT,
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
      findRosterByID={findRosterByID}
      foundHistory={foundHistory}
      handlePlayoffs={handlePlayoffs}
      handleRankings={handleRankings}
      handleRostersBySzn={handleRostersBySzn}
      handleSelectSzn={handleSelectSzn}
      league={league}
      lineupEfficiency={lineupEfficiency}
      loadLeague={loadLeague}
      loadRosters={loadRosters}
      playoffs={playoffs}
      processedRosters={processedRosters}
      rankings={rankings}
      rosters={rosters}
      roundToHundredth={roundToHundredth}
      selectSzn={selectSzn}
      winPCT={winPCT}
    />
  )
}
