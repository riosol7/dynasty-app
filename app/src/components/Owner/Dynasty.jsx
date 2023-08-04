import React, {} from 'react'
import AreaChart from '../charts/AreaChart';
import RadarChart from '../charts/RadarChart';
import ColumnChart from '../charts/ColumnChart';
import Roster from '../Roster';
import DynastyRankingsS from '../sliders/DynastyRankingsS';
import { Icon } from '@iconify/react';

export default function Dynasty(props) {
    const id=props.id
    // const loadLeague = props.loadLeague
    // const league = props.league
    // const players = props.players
    const loadRosters=props.loadRosters
    const rosters=props.rosters
    // const foundHistory = props.foundHistory
    const owner=props.owner
    const findLogo =props.findLogo
    // const foundRoster = props.foundRoster
    // const findRecord = props.findRecord
    // const winPCT = props.winPCT
    const roundToHundredth=props.roundToHundredth
    const findPlayer=props.findPlayer
    const isOdd=props.isOdd
    const tab=props.tab
    const findRosterByName=props.findRosterByName

    return (
        <div style={{fontSize:"14px"}}>
            <div className="my-4">
                    <p className="m-0 bold" style={{color:"lightgrey"}}>DYNASTY RANKING</p>
                <DynastyRankingsS
                    id={id}
                    owner={owner}
                    loadRosters={loadRosters}
                    rosters={rosters}
                    roundToHundredth={roundToHundredth}
                    findRosterByName={findRosterByName}
                />
            </div>
            <div className="my-4 d-flex justify-content-between">
                <form className="d-flex align-items-center" style={{width:"100%"}}>
                    <button className="d-flex justify-content-center align-items-center" style={{
                        borderRadius:"4px 0px 0px 4px",
                        background:"#111111",
                        border:"2px solid #111111",
                        height:"3em", width:"3em"}}>
                        <Icon icon="uil:search" style={{transform:"rotate(1.2turn)", color:"white", fontSize:"1.2em"}}/>
                    </button>
                    <input className="form-control px-3" type="text" placeholder="Enter second team" 
                        style={{
                            color:"white",
                            width:"100%", 
                            height:"3em", 
                            borderLeft:"none",
                            borderRadius:"0px 4px 4px 0px", 
                            borderTop:"1px solid #111111", 
                            borderBottom:"1px solid #111111",
                            borderRight:"1px solid #111111",
                            background:"black", fontSize:"1em"}}/>  
                </form>
            </div>
            <div className="d-flex align-items-center flex-wrap">
                <div className="p-2 mb-4" style={{background:"", borderRadius:"6px", minWidth:"320px", width:"100%"}}>
                    <AreaChart
                        id={id}
                        loadRosters={loadRosters}
                        rosters={rosters}
                    />
                </div>
                <div className="d-flex my-4" style={{}}>
                    <div>
                        <div className="sticky-top" style={{background:"#0f0f0f", borderRadius:"4px", marginRight:"3em"}}>
                            <div className="">
                                <div className="d-flex justify-content-center" style={{minWidth:"300px"}}>
                                    <ColumnChart 
                                        id={id}
                                        roster={owner} 
                                        rosters={rosters}
                                    />
                                </div> 
                            </div>
                            <div>
                                <div style={{background:"",borderTop:""}}>
                                    <RadarChart 
                                        id={id}
                                        roster={owner} 
                                        rosters={rosters}
                                        roundToHundredth={roundToHundredth}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="" style={{width:"100%"}}>
                        <Roster
                            owner={owner}
                            rosters={rosters}
                            roundToHundredth={roundToHundredth}
                            findLogo={findLogo}
                            findPlayer={findPlayer}
                            isOdd={isOdd}
                            tab={tab}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
