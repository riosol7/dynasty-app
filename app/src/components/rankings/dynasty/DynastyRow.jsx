import React from "react";

export default function DynastyRow({roster, sort}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL;
    const dummyAvatar = process.env.REACT_APP_DUMMY_AVATAR;
    const getStyle = (field) => {
        return {
            fontSize: "12px",
            color: sort === field ? "#a9dfd8" : "white",
        };
    };
    return (
        <div className="team d-flex align-items-center py-3">
            <a href={`/Owner/${roster.roster_id}`} className="cellLink">
                <div className="col-sm-7 d-flex align-items-center">
                    <div className="col-sm-1">
                        <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{roster.rank}</p>
                    </div>                                
                    <div className="">
                        <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${
                            roster.kct.owner ? roster.kct.owner.avatar : dummyAvatar}`}/>
                    </div>
                    <div className="text-truncate mx-1" style={{width:"100%"}}>
                        {roster.kct.owner.team_name ?
                            <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                <span className="m-0 mx-1 truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                            </p>
                        :        
                            <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                <span className="">{roster.kct.owner.display_name}</span>
                            </p>
                        }
                        <div className="pb-2 mx-1">
                            <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {roster.kct.owner.exp}</p>
                        </div>
                    </div> 
                </div>
                {["TEAM", "QB", "RB", "WR", "TE"].map((field, index) => (
                    <div key={index} className="col-sm-1">
                        <p className="m-0" style={getStyle(field)}>{field === "TEAM"? roster.kct.teamTotal : roster.kct[field.toLowerCase()].total}</p>
                    </div>
                ))}
            </a>
        </div>    
    )
}