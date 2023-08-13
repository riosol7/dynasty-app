import React from "react";
import RivalryRecordUI from "../ui/RivalryRecordUI";

export default function RivalryRecordContainer({
    foundHistory,
    handleAllPlay,
    handleVS,
    id,
    league,
    openModal,
    processedRosters,
    selectAllPlay,
    vs,
}) {   
    function MouseOver(event) {
        event.target.style.color="#a9dfd8";
    }
    function MouseOut(event){
        event.target.style.color="#7f7f7f";
    }
    return (
        <RivalryRecordUI
            foundHistory={foundHistory}
            handleAllPlay={handleAllPlay}
            handleVS={handleVS}
            id={id}
            league={league}
            MouseOut={MouseOut}
            MouseOver={MouseOver}
            openModal={openModal}
            processedRosters={processedRosters}
            selectAllPlay={selectAllPlay}
            vs={vs}
        />
    )
}
