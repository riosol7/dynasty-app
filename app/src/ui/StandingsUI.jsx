import React from "react";
import { Icon } from "@iconify/react";
import StandingRow from "../components/standings/StandingRow";
import PostSeasonBracket from "../components/standings/PostSeasonBracket";
import { winPCT } from "../utils";
// FIX VARIABLES FOR division -> roster
export default function StandingsUI({
  all_time,
  asc,
  asc1,
  asc2,
  divsRanks,
  div1Ranks,
  div2Ranks,
  findRosterBySzn,
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

  return (
    <div>
      { // IN SEASON :: CURRENT YR
        selectSzn === league.season ?
          playoffs===true?
            <PostSeasonBracket
              findRosterBySzn={findRosterBySzn}
              foundHistory={foundHistory}
              handleRostersBySzn={handleRostersBySzn}
              league={league}
              processedRosters={processedRosters}
              selectSzn={selectSzn}              
            />  
          :
            <div className="">
              <div className="my-2" style={{fontSize:"14px"}}>
                <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                  <div className="col-sm-7 d-flex align-items-center"> 
                    <div className="col-sm-1">
                      {
                        sort1 === "RANK" ?
                          asc1 === false ?
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>RANK</p>
                              <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                          :
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>RANK</p>
                              <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                        :
                        <p className="StandingCell m-0" onClick={() => handleSort1("RANK")}>RANK</p>
                      }
                    </div>
                    <p className="m-0 StandingCell">DIVISION 1 TEAM</p>
                  </div>
                  {
                    sort1 === "RECORD" ?
                      asc1 === true ?
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>RECORD</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>RECORD</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-2 d-flex align-items-center">
                        <p className="m-0 StandingCell" onClick={() => handleSort1("RECORD")}>RECORD</p>
                      </div>
                  }
                  {
                    sort1 === "PF" ?
                      asc1 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc1(false)}>PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort1("PF")}>PF</p>
                      </div>
                  }
                  {
                    sort1 === "MAX PF" ?
                      asc1 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc1(false)}>MAX PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>MAX PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort1("MAX PF")}>MAX PF</p>
                      </div>
                  }
                  {
                    sort1 === "PA" ?
                      asc1 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>PA</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>PA</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort1("PA")}>PA</p>
                      </div>
                  }
                </div>
                { 
                  (sort1 === "RANK" && asc1 === false)  || (sort1 === "RECORD" && asc1 === true) ? 
                    div1Ranks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "RANK" && asc1 === true)  || (sort1 === "RECORD" && asc1 === false) ? 
                    div1Ranks.reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "PF" && asc1 === true) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "PF" && asc1 === false) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "MAX PF" && asc1 === true) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "MAX PF" && asc1 === false) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "PA" && asc1 === true) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort1 === "PA" && asc1 === false) ? 
                    div1Ranks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :
                    div1Ranks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                }
              </div>
              {/* |||||||| DIVISION 2 |||||||| */}
              <div className="my-2" style={{fontSize:"14px"}}>
                <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                  <div className="col-sm-7 d-flex align-items-center"> 
                    <div className="col-sm-1">
                      {
                        sort2 === "RANK" ?
                          asc2 === false ?
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>RANK</p>
                              <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                          :
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>RANK</p>
                              <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                        :
                        <p className="StandingCell m-0" onClick={() => handleSort2("RANK")}>RANK</p>
                      }
                    </div>
                    <p className="m-0 StandingCell">DIVISION 2 TEAM</p>
                  </div>
                  {
                    sort2 === "RECORD" ?
                      asc2 === true ?
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>RECORD</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>RECORD</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-2 d-flex align-items-center">
                        <p className="m-0 StandingCell" onClick={() => handleSort2("RECORD")}>RECORD</p>
                      </div>
                  }
                  {
                    sort2 === "PF" ?
                      asc2 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc2(false)}>PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort2("PF")}>PF</p>
                      </div>
                  }
                  {
                    sort2 === "MAX PF" ?
                      asc2 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc2(false)}>MAX PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>MAX PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort2("MAX PF")}>MAX PF</p>
                      </div>
                  }
                  {
                    sort2 === "PA" ?
                      asc2 === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>PA</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>PA</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort2("PA")}>PA</p>
                      </div>
                  }
                </div>
                { 
                  (sort2 === "RANK" && asc2 === false)  || (sort2 === "RECORD" && asc2 === true) ? 
                    div2Ranks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "RANK" && asc2 === true)  || (sort2 === "RECORD" && asc2 === false) ? 
                    div2Ranks.reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "PF" && asc2 === true) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "PF" && asc2 === false) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "MAX PF" && asc2 === true) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "MAX PF" && asc2 === false) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      /> 
                    )
                  :(sort2 === "PA" && asc2 === true) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort2 === "PA" && asc2 === false) ? 
                    div2Ranks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :
                    div2Ranks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                }
              </div>
              {/* |||||||| ALL DIVISIONS |||||||| */}
              <div className="my-2" style={{fontSize:"14px"}}>
                <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                  <div className="col-sm-7 d-flex align-items-center"> 
                    <div className="col-sm-1">
                      {
                        sort === "RANK" ?
                          asc === false ?
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RANK</p>
                              <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                          :
                            <div className="d-flex align-items-center">
                              <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RANK</p>
                              <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                            </div>
                        :
                        <p className="StandingCell m-0" onClick={() => handleSort("RANK")}>RANK</p>
                      }
                    </div>
                    <p className="m-0 StandingCell">TEAM</p>
                  </div>
                  {
                    sort === "RECORD" ?
                      asc === true ?
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RECORD</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RECORD</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-2 d-flex align-items-center">
                        <p className="m-0 StandingCell" onClick={() => handleSort("RECORD")}>RECORD</p>
                      </div>
                  }
                  {
                    sort === "PF" ?
                      asc === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc(false)}>PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort("PF")}>PF</p>
                      </div>
                  }
                  {
                    sort === "MAX PF" ?
                      asc === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell"onClick={() => setAsc(false)}>MAX PF</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>MAX PF</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort("MAX PF")}>MAX PF</p>
                      </div>
                  }
                  {
                    sort === "PA" ?
                      asc === true ?
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(false)}>PA</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="col-sm-1 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PA</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                      <div className="col-sm-1">
                        <p className="m-0 StandingCell" onClick={() => handleSort("PA")}>PA</p>
                      </div>
                  }
                </div>
                { 
                  (sort === "RANK" && asc === false)  || (sort === "RECORD" && asc === true) ? 
                    divsRanks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "RANK" && asc === true)  || (sort === "RECORD" && asc === false) ? 
                    divsRanks.reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "PF" && asc === true) ? 
                    divsRanks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "PF" && asc === false) ? 
                    divsRanks.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "MAX PF" && asc === true) ? 
                    divsRanks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "MAX PF" && asc === false) ? 
                    divsRanks.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "PA" && asc === true) ? 
                    divsRanks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :(sort === "PA" && asc === false) ? 
                    divsRanks.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal))).reverse().map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                  :
                    divsRanks.map((division, i) => 
                      <StandingRow
                        key={i}
                        division={division}
                        winPCT={winPCT}
                        selectSzn={selectSzn}
                        league={league}
                      />
                    )
                }
              </div>
            </div>
        : selectSzn === "All Time"?
          <div className="my-2">
            <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
              <div className="col-sm-7 d-flex align-items-center"> 
                <div className="col-sm-1">
                  {
                    sort === "RANK" ?
                      asc === false ?
                        <div className="d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RANK</p>
                          <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                      :
                        <div className="d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RANK</p>
                          <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                        </div>
                    :
                    <p className="StandingCell m-0" onClick={() => handleSort("RANK")}>RANK</p>
                  }
                </div>
                <p className="m-0 StandingCell">TEAM</p>
              </div>
              {
                sort === "RECORD" ?
                  asc === true ?
                    <div className="col-sm-2 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RECORD</p>
                      <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                  :
                    <div className="col-sm-2 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RECORD</p>
                      <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                :
                  <div className="col-sm-2 d-flex align-items-center">
                    <p className="m-0 StandingCell" onClick={() => handleSort("RECORD")}>RECORD</p>
                  </div>
              }
              {
                sort === "PF" ?
                  asc === true ?
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell"onClick={() => setAsc(false)}>PF</p>
                      <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                  :
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PF</p>
                      <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                :
                  <div className="col-sm-1">
                    <p className="m-0 StandingCell" onClick={() => handleSort("PF")}>PF</p>
                  </div>
              }
              {
                sort === "MAX PF" ?
                  asc === true ?
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell"onClick={() => setAsc(false)}>MAX PF</p>
                      <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                  :
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(true)}>MAX PF</p>
                      <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                :
                  <div className="col-sm-1">
                    <p className="m-0 StandingCell" onClick={() => handleSort("MAX PF")}>MAX PF</p>
                  </div>
              }
              {
                sort === "PA" ?
                  asc === true ?
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(false)}>PA</p>
                      <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                  :
                    <div className="col-sm-1 d-flex align-items-center">
                      <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PA</p>
                      <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                    </div>
                :
                  <div className="col-sm-1">
                    <p className="m-0 StandingCell" onClick={() => handleSort("PA")}>PA</p>
                  </div>
              }
            </div>
            { 
              (sort === "RANK" && asc === false)  || (sort === "RECORD" && asc === true) ? 
                all_time.map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "RANK" && asc === true)  || (sort === "RECORD" && asc === false) ? 
                all_time.reverse().map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "PF" && asc === true) ? 
                all_time.sort((a,b) => b.fpts - a.fpts).map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "PF" && asc === false) ? 
                all_time.sort((a,b) => b.fpts - a.fpts).reverse().map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "MAX PF" && asc === true) ? 
                all_time.sort((a,b) => b.ppts - a.ppts).map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "MAX PF" && asc === false) ? 
                all_time.sort((a,b) => b.ppts - a.ppts).reverse().map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "PA" && asc === true) ? 
                all_time.sort((a,b) => b.fpts_against - a.fpts_against).map((owner, i) => 
                  <StandingRow
                    key={i}
                    winPCT={winPCT}
                    selectSzn={selectSzn}
                    owner={owner}
                    league={league}
                  />
                )
              : (sort === "PA" && asc === false) ? 
                all_time.sort((a,b) => b.fpts_against - a.fpts_against).reverse().map((owner, i) => 
                <StandingRow
                  key={i}
                  winPCT={winPCT}
                  selectSzn={selectSzn}
                  owner={owner}
                  league={league}
                />
                )
              :<></>
            }
          </div>
        : 
          
            playoffs===true?
              <PostSeasonBracket
                findRosterBySzn={findRosterBySzn}
                foundHistory={foundHistory}
                handleRostersBySzn={handleRostersBySzn}
                league={league}
                processedRosters={processedRosters}
                selectSzn={selectSzn} 
              />  
            :
              <div>
                <div className="my-2" style={{fontSize:"14px"}}>
                  <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                    <div className="col-sm-7 d-flex align-items-center"> 
                      <div className="col-sm-1">
                        {
                          sort1 === "RANK" ?
                            asc1 === false ?
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>RANK</p>
                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                            :
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>RANK</p>
                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                          :
                          <p className="StandingCell m-0" onClick={() => handleSort1("RANK")}>RANK</p>
                        }
                      </div>
                      <p className="m-0 StandingCell">DIVISION 1 TEAM</p>
                    </div>
                    {
                      sort1 === "RECORD" ?
                        asc1 === true ?
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>RECORD</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>RECORD</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => handleSort1("RECORD")}>RECORD</p>
                        </div>
                    }
                    {
                      sort1 === "PF" ?
                        asc1 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc1(false)}>PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort1("PF")}>PF</p>
                        </div>
                    }
                    {
                      sort1 === "MAX PF" ?
                        asc1 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc1(false)}>MAX PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>MAX PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort1("MAX PF")}>MAX PF</p>
                        </div>
                    }
                    {
                      sort1 === "PA" ?
                        asc1 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(false)}>PA</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc1(true)}>PA</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort1("PA")}>PA</p>
                        </div>
                    }
                  </div>
                  { 
                    (sort1 === "RANK" && asc1 === false)  || (sort1 === "RECORD" && asc1 === true) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1)?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      ) 
                    : (sort1 === "RANK" && asc1 === true)  || (sort1 === "RECORD" && asc1 === false) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1)?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "PF" && asc1 === true) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1)?.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal)))?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "PF" && asc1 === false) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1)?.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal)))?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "MAX PF" && asc1 === true) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1)?.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal)))?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "MAX PF" && asc1 === false) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1)?.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal)))?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "PA" && asc1 === true) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1)?.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal)))?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort1 === "PA" && asc1 === false) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 1)?.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal)))?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    :
                      div1Ranks.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                  }
                </div>
                {/* |||||||| DIVISION 2 |||||||| */}
                <div className="my-2" style={{fontSize:"14px"}}>
                  <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                    <div className="col-sm-7 d-flex align-items-center"> 
                      <div className="col-sm-1">
                        {
                          sort2 === "RANK" ?
                            asc2 === false ?
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>RANK</p>
                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                            :
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>RANK</p>
                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                          :
                          <p className="StandingCell m-0" onClick={() => handleSort2("RANK")}>RANK</p>
                        }
                      </div>
                      <p className="m-0 StandingCell">DIVISION 2 TEAM</p>
                    </div>
                    {
                      sort2 === "RECORD" ?
                        asc2 === true ?
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>RECORD</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>RECORD</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => handleSort2("RECORD")}>RECORD</p>
                        </div>
                    }
                    {
                      sort2 === "PF" ?
                        asc2 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc2(false)}>PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort2("PF")}>PF</p>
                        </div>
                    }
                    {
                      sort2 === "MAX PF" ?
                        asc2 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc2(false)}>MAX PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>MAX PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort2("MAX PF")}>MAX PF</p>
                        </div>
                    }
                    {
                      sort2 === "PA" ?
                        asc2 === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(false)}>PA</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc2(true)}>PA</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort2("PA")}>PA</p>
                        </div>
                    }
                  </div>
                  { 
                    (sort2 === "RANK" && asc2 === false)  || (sort2 === "RECORD" && asc2 === true) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2)?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "RANK" && asc2 === true)  || (sort2 === "RECORD" && asc2 === false) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2)?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "PF" && asc2 === true) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2)?.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal)))?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "PF" && asc2 === false) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2)?.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal))).reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "MAX PF" && asc2 === true) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2)?.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal)))?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "MAX PF" && asc2 === false) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2)?.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal)))?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "PA" && asc2 === true) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2)?.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal)))?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort2 === "PA" && asc2 === false) ? 
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2)?.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal)))?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    :
                      handleRank(handleRostersBySzn(selectSzn, league, processedRosters), 2)?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                  }
                </div>
                <div className="my-2" style={{fontSize:"14px"}}>
                  <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                    <div className="col-sm-7 d-flex align-items-center"> 
                      <div className="col-sm-1">
                        {
                          sort === "RANK" ?
                            asc === false ?
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RANK</p>
                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                            :
                              <div className="d-flex align-items-center">
                                <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RANK</p>
                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                              </div>
                          :
                          <p className="StandingCell m-0" onClick={() => handleSort("RANK")}>RANK</p>
                        }
                      </div>
                      <p className="m-0 StandingCell">TEAM</p>
                    </div>
                    {
                      sort === "RECORD" ?
                        asc === true ?
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RECORD</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-2 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RECORD</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-2 d-flex align-items-center">
                          <p className="m-0 StandingCell" onClick={() => handleSort("RECORD")}>RECORD</p>
                        </div>
                    }
                    {
                      sort === "PF" ?
                        asc === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc(false)}>PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort("PF")}>PF</p>
                        </div>
                    }
                    {
                      sort === "MAX PF" ?
                        asc === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell"onClick={() => setAsc(false)}>MAX PF</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(true)}>MAX PF</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort("MAX PF")}>MAX PF</p>
                        </div>
                    }
                    {
                      sort === "PA" ?
                        asc === true ?
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(false)}>PA</p>
                            <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                        :
                          <div className="col-sm-1 d-flex align-items-center">
                            <p className="m-0 StandingCell" onClick={() => setAsc(true)}>PA</p>
                            <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                          </div>
                      :
                        <div className="col-sm-1">
                          <p className="m-0 StandingCell" onClick={() => handleSort("PA")}>PA</p>
                        </div>
                    }
                  </div>
                  { 
                    (sort === "RANK" && asc === false)  || (sort === "RECORD" && asc === true) ? 
                      handleRostersBySzn(selectSzn, league, processedRosters)?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "RANK" && asc === true)  || (sort === "RECORD" && asc === false) ? 
                      handleRostersBySzn(selectSzn, league, processedRosters)?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "PF" && asc === true) ? 
                      handleRostersBySzn(selectSzn, league, processedRosters)?.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal)))?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "PF" && asc === false) ? 
                      handleRostersBySzn(selectSzn, league, processedRosters)?.sort((a,b) => Number(b.settings.fpts + "." + b.settings.fpts_decimal) - (Number(a.settings.fpts + "." + a.settings.fpts_decimal)))?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "MAX PF" && asc === true) ? 
                      handleRostersBySzn(selectSzn, league, processedRosters)?.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal)))?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "MAX PF" && asc === false) ? 
                      handleRostersBySzn(selectSzn, league, processedRosters)?.sort((a,b) => Number(b.settings.ppts + "." + b.settings.ppts_decimal) - (Number(a.settings.ppts + "." + a.settings.ppts_decimal)))?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "PA" && asc === true) ? 
                      handleRostersBySzn(selectSzn, league, processedRosters)?.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal)))?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    : (sort === "PA" && asc === false) ? 
                      handleRostersBySzn(selectSzn, league, processedRosters)?.sort((a,b) => Number(b.settings.fpts_against + "." + b.settings.fpts_against_decimal) - (Number(a.settings.fpts_against + "." + a.settings.fpts_against_decimal)))?.reverse()?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                    :
                      handleRostersBySzn(selectSzn, league, processedRosters)?.map((division, i) => 
                        <StandingRow
                          key={i}
                          division={division}
                          winPCT={winPCT}
                          selectSzn={selectSzn}
                          league={league}
                        />
                      )
                  }
                </div>
              </div>
          
      }
    </div>
    )
}