import React from "react";
import StandingTableHeader from "../components/standings/StandingTableHeader";
import StandingRow from "../components/standings/StandingRow";
import PostSeasonBracket from "../components/standings/PostSeasonBracket";

export default function StandingsUI({
  allTimeStats,
  asc,
  asc1,
  asc2,
  foundHistory,
  handleRank,
  handleRostersBySzn,
  handleSort,
  handleSort1,
  handleSort2,
  league,
  playoffs,
  processedRosters,
  selectSzn,
  setAsc,
  setAsc1,
  setAsc2,
  sort,
  sort1,
  sort2,
}){
  const getStatValue = (owner, statKey) => {
    if (owner.settings) {
      return owner.settings[statKey];
    }
    return owner[statKey];
  };
  const renderStandingRows = (data, sortKey, ascending) =>
    data?.slice().sort((a, b) => (ascending ? getStatValue(a, sortKey) - getStatValue(b, sortKey) : getStatValue(b, sortKey) - getStatValue(a, sortKey)))
      .map((owner, i) => (
        <StandingRow
          key={i}
          selectSzn={selectSzn}
          owner={owner}
          league={league}
        />
      ));

  return (
    <div>
      {selectSzn === "All Time" ?
        <div className="my-2">
          <StandingTableHeader asc={asc} handleSort={handleSort} setAsc={setAsc} sort={sort}/>
          {sort === "RANK" || sort === "RECORD" ? (
            // Handle sorting for RANK and RECORD separately
            sort === "RANK"
              ? asc
                ? renderStandingRows(allTimeStats, sort, true).reverse()
                : renderStandingRows(allTimeStats, sort, false)
              : asc
              ? renderStandingRows(allTimeStats, "winPCT", true).reverse()
              : renderStandingRows(allTimeStats, "winPCT", false)
          ) : sort === "PF" ? (
            renderStandingRows(allTimeStats, "fpts", asc)
          ) : sort === "MAX PF" ? (
            renderStandingRows(allTimeStats, "ppts", asc)
          ) : sort === "PA" ? (
            renderStandingRows(allTimeStats, "fpts_against", asc)
          ) : (
            <></>
          )}
        </div>
      : playoffs === true ?
        <PostSeasonBracket
          foundHistory={foundHistory}
          handleRostersBySzn={handleRostersBySzn}
          league={league}
          processedRosters={processedRosters}
          selectSzn={selectSzn} 
        />  
      :
        <div>
          <div className="my-2">
            <StandingTableHeader asc={asc1} handleSort={handleSort1} setAsc={setAsc1} sort={sort1} division={1}/>
            {sort1 === "RANK" || sort1 === "RECORD" ? (
              sort1 === "RANK"
                ? asc1
                  ? renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1), sort1, true).reverse()
                  : renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1), sort1, false)
                : asc1
                ? renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1), "winPCT", true).reverse()
                : renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1), "winPCT", false)
            ) : sort1 === "PF" ? (
              renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1), "fpts", asc1)
            ) : sort1 === "MAX PF" ? (
              renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1), "ppts", asc1)
            ) : sort1 === "PA" ? (
              renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1), "fpts_against", asc1)
            ) : (
              <></>
            )}
          </div>
          <div className="my-2">
            <StandingTableHeader asc={asc2} handleSort={handleSort2} setAsc={setAsc2} sort={sort2} division={2}/>
            {sort2 === "RANK" || sort2 === "RECORD" ? (
              sort2 === "RANK"
                ? asc2
                  ? renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2), sort2, true).reverse()
                  : renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2), sort2, false)
                : asc2
                ? renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2), "winPCT", true).reverse()
                : renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2), "winPCT", false)
            ) : sort2 === "PF" ? (
              renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2), "fpts", asc2)
            ) : sort2 === "MAX PF" ? (
              renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2), "ppts", asc2)
            ) : sort2 === "PA" ? (
              renderStandingRows(handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2), "fpts_against", asc2)
            ) : (
              <></>
            )}
          </div>
          <div className="my-2">
            <StandingTableHeader asc={asc} handleSort={handleSort} setAsc={setAsc} sort={sort}/>
            {sort === "RANK" || sort === "RECORD" ? (
              sort === "RANK"
                ? asc
                  ? renderStandingRows(handleRostersBySzn(selectSzn, league, processedRosters), sort, true).reverse()
                  : renderStandingRows(handleRostersBySzn(selectSzn, league, processedRosters), sort, false)
                : asc
                ? renderStandingRows(handleRostersBySzn(selectSzn, league, processedRosters), "winPCT", true).reverse()
                : renderStandingRows(handleRostersBySzn(selectSzn, league, processedRosters), "winPCT", false)
            ) : sort === "PF" ? (
              renderStandingRows(handleRostersBySzn(selectSzn, league, processedRosters), "fpts", asc)
            ) : sort === "MAX PF" ? (
              renderStandingRows(handleRostersBySzn(selectSzn, league, processedRosters), "ppts", asc)
            ) : sort === "PA" ? (
              renderStandingRows(handleRostersBySzn(selectSzn, league, processedRosters), "fpts_against", asc)
            ) : (
              <></>
            )}
          </div>
        </div>
      }
    </div>
  )
}