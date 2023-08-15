import React from "react";
import { Icon } from "@iconify/react";

export default function StandingTableHeader({asc, handleSort, setAsc, sort, division}) {
  return (
    <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
        <div className="col-sm-7 d-flex align-items-center"> 
            <div className="col-sm-1">
            {sort === "RANK" ?
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
            <p className="m-0 StandingCell">{division === 1 ? "DIVISION 1" : division === 2 ? "DIVISION 2" : "TEAM"}</p>
        </div>
        {sort === "RECORD" ?
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
        {sort === "PF" ?
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
        {sort === "MAX PF" ?
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
        {sort === "PA" ?
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
    )
}