import React from "react";
import Draft from "../Draft";
import { Icon } from "@iconify/react";
import Matchup from "../Matchup";
import { findLogo, isOdd } from "../../utils";
const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'38em',
    transform: 'translate(-50%, -50%)',
    background: "#1b2025",
    borderRadius:'5px',
    minHeight:"900px",
    height:"100%",
    zIndex: 5
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex:5
}

export default function Modal(props) {
    const id=props.id
    const handleDraftClass=props.handleDraftClass
    const league=props.league
    const draftClass=props.draftClass
    const myDraftPicks=props.myDraftPicks
    const findPlayer=props.findPlayer
    const closeModal=props.closeModal
    const foundHistory=props.foundHistory
    const modalTab=props.modalTab
    const openModal=props.openModal
    const findRosterByID=props.findRosterByID
    const oID=props.oID
    const setOID=props.setOID
    const findRecord=props.findRecord
    const findGameDate=props.findGameDate
    const match=props.match
    const setMatch=props.setMatch
    const rosters=props.rosters
    if(!props.open) return null 
    return (
        <div style={OVERLAY_STYLES}>
            <div className="col"style={MODAL_STYLES}>
                <div className="d-flex justify-content-between pt-2" style={{background:"black"}}>
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center px-4 py-2" onClick={() => openModal("Draft")} style={modalTab === "Draft" ? {background:"#1b2025", borderRadius:"10px 10px 0px 0px"}:{}}>
                            <Icon icon="fluent:keyboard-layout-float-20-regular" style={{color:"#a9dfd8", fontSize:"1.6em"}}/>
                            <p className="m-0 bold" style={{paddingLeft:"6px"}}>Draft</p>
                        </div>
                        <div className="d-flex align-items-center px-4 py-2" onClick={() => openModal("Matchup")} style={modalTab === "Matchup" ? {background:"#1b2025", borderRadius:"10px 10px 0px 0px"}:{}}>
                            <Icon icon="fluent-emoji-high-contrast:vs-button" style={{color:"#a9dfd8", fontSize:"1.6em"}}/>
                            <p className="m-0 bold" style={modalTab === "Matchup" ? {color:"white", paddingLeft:"6px"}:{color:"lightgrey",paddingLeft:"6px"}}>Matchup</p>
                        </div>
                    </div>
                    <div className="px-2">
                        <Icon icon="octicon:x-circle-fill-24" style={{fontSize:"1em", color:"#f25b57"}}onClick={() => closeModal()}/>
                    </div>
                </div>
                {
                    modalTab === "Draft" ?
                        <Draft
                            id={id}
                            handleDraftClass={handleDraftClass}
                            league={league}
                            draftClass={draftClass}
                            myDraftPicks={myDraftPicks}
                            isOdd={isOdd}
                            findLogo={findLogo}
                            findPlayer={findPlayer}
                        />
                    : modalTab === "Matchup" ?
                        <Matchup
                            id={id}
                            league={league}
                            foundHistory={foundHistory}
                            findPlayer={findPlayer}
                            findRosterByID={findRosterByID}
                            oID={oID}
                            setOID={setOID}
                            findRecord={findRecord}
                            isOdd={isOdd}
                            findLogo={findLogo}
                            findGameDate={findGameDate}
                            match={match}
                            setMatch={setMatch}
                            rosters={rosters}
                        />
                    :<></>
                }
              
            </div>
        </div>
    )
}
