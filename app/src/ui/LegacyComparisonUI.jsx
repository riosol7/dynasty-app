import React from "react";
import { Icon } from '@iconify/react';
import OwnerLegacyChart from "../components/charts/OwnerLegacyChart";

export default function LegacyComparisonUI({
    id,
    loadRosters,
    processedRosters
}) {
    return (
        <div className="my-4">
            <div className="d-flex justify-content-between">
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
                            background:"black", fontSize:"1em"}}
                        />  
                </form>
            </div>
            <div className="" style={{background:"", borderRadius:"6px", minWidth:"320px", width:"100%"}}>
                <OwnerLegacyChart
                    id={id}
                    loadRosters={loadRosters}
                    processedRosters={processedRosters}
                />
            </div>
        </div>
    )
}