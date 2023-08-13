import React from 'react'
import { Swiper, SwiperSlide} from "swiper/react";

export default function Matchup(props) {
    const id=props.id
    const findPlayer=props.findPlayer
    const league=props.league
    const foundHistory=props.foundHistory
    const findRosterByID=props.findRosterByID
    const oID=props.oID
    const setOID=props.setOID
    const findRecord=props.findRecord
    const isOdd=props.isOdd
    const findLogo=props.findLogo
    const findGameDate=props.findGameDate
    const game=props.match
    const setMatch=props.setMatch
    const rosters=props.rosters
    const players=props.players
    // const [game, setGame] = useState([])
    const findH2HGames = () => {
        if(oID !== ""){
            return foundHistory(id).g.map((gm) => gm.map(t =>  {
                if(t.roster_id === oID){
                    return gm
                } return []
            }).filter(g => g.length > 0)).filter(g => g.length > 0).map(g => g[0])
        }
        return null
    }
    const findMatch = (g) => {
        setMatch(g)
    }
    const clickRoster = (rID) =>{
        setOID(rID)
        setMatch([])
    }
    const findRecordBy = (rID, yr) => {
        if(rID !== undefined && yr !== undefined){
            if(yr !== league.season){
                let findYR = league && league.history && league.history.filter(l => l.year === yr.toString())[0]
                return findYR && findYR.rosters && findYR.rosters.filter(r => r.roster_id === rID)[0]
            } else {
                return rosters && rosters.totalRoster.filter(r => r.roster_id === rID)[0]
            }
        }
    }
    // console.log(league.history.filter(l => l.year === "2020")[0].rosters.filter(r => r.roster_id === 7)[0])
    return (
       <div>
            <div className="d-flex align-items-center" style={{borderBottom:"1px solid #2a2c3e"}}>
                <Swiper
                    spaceBetween={5}
                    slidesPerView={7}
                    slidesPerGroup={1}
                    loopFillGroupWithBlank={true}
                    loop={true}
                >
                    {
                        league.owners.filter(o => o.roster_id !== Number(id)).map((o,idx) =>
                            <SwiperSlide key={idx} className="">
                                <div className="py-3 px-2" style={{minWidth:"80px"}} onClick={() => clickRoster(o.roster_id)}>
                                    <div className="d-flex justify-content-center pb-2">
                                        <div className=""style={oID === o.roster_id ? {
                                                borderRadius:"50%",
                                                padding:"2px",
                                                // border:"solid 2px #a9dfd8",
                                                background:"linear-gradient(360deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)"
                                            }: {padding:"2px"}}>
                                            <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                o.avatar ? o.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}
                                                style={{width:"32px", background:"#1b2025"}} 
                                            />
                                        </div>
                                    </div>
                                    <p className="m-0 text-truncate text-center" style={{fontSize:"12px"}}>{o.display_name}</p>
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
            <div  id="scrollBar" style={{overflow:"auto",maxHeight:"575px"}}>
                {
                    game.length > 0 ?
                        <div>
                            {/* <div className="d-flex align-items-center justify-content-center py-1 bold" style={{background:"#1b2025",}}>
                                <p className="m-0" style={{}}>
                                    {
                                        findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk01"?
                                            "Week 1"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk02"?
                                            "Week 2"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk03"?
                                            "Week 3"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk04"?
                                            "Week 4"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk05"?
                                            "Week 5"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk06"?
                                            "Week 6"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk07"?
                                            "Week 7"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk08"?
                                            "Week 8"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk09"?
                                            "Week 9"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk10"?
                                            "Week 10"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk11"?
                                            "Week 11"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk12"?
                                            "Week 12"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk13"?
                                            "Week 13"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk14"?
                                            "Week 14"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk15"?
                                            "Week 15"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk16"?
                                            "Week 16"
                                        : findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk17"?
                                            "Week 17"
                                        :findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).week
                                    }
                                </p>
                                <p className="m-0" style={{}}>, {findGameDate(game[0].points, game[1].points).year}</p>                                       
                            </div> */}
                            <div className="d-flex align-items-center">
                                {
                                    game.map((t,i) => 
                                        <div key={i} className="col">
                                            {
                                                i ===1 ?
                                                    <div>
                                                        <div className="d-flex align-items-center" style={{background:"rgba(27,32,37,1)"}}>
                                                            <div className="d-flex align-items-center col justify-content-end">
                                                                <div className="col" style={{fontSize:"13.5px",marginRight:".8em"}}> 
                                                                    <p className="m-0 text-end bold text-truncate" style={{}}>
                                                                        {
                                                                            findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.team_name ?
                                                                                findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.team_name
                                                                            :
                                                                                findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.display_name
                                                                        }
                                                                    </p>
                                                                    <p className="m-0 text-end" style={{color:"#cbcbcb", fontWeight:"lighter",fontSize:"13px"}}>{findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.display_name}@</p>
                                                                    <div className="d-flex justify-content-between">
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="m-0 bold" style={{paddingLeft:"1.3em"}}>{t.points}</p>
                                                                            <p className="m-0 bold" style={{paddingLeft:"6px", color:"#cc1d00"}}>L</p>
                                                                        </div>
                                                                        {
                                                                            findRecordBy(t.roster_id,findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).year) && 
                                                                            findRecordBy(t.roster_id,findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).year).settings ?
                                                                                <p className="m-0 mt-1">
                                                                                    {findRecordBy(t.roster_id,findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).year).settings.wins}
                                                                                    -
                                                                                    {findRecordBy(t.roster_id,findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).year).settings.losses}
                                                                                </p>
                                                                            :<></>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <img  alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                            findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.avatar ? 
                                                                                findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.avatar 
                                                                            : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}
                                                                        style={{width:"80px"}} 
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="d-flex align-items-center m-0 py-1" style={{background:"linear-gradient(126deg, rgba(27,32,37,1) 60%, rgba(0,0,0,1) 100%)", fontSize:"14.5px"}}>
                                                            <p className="m-0 bold" style={{paddingLeft:"1.3em"}}>{t.points}</p>
                                                            <p className="m-0 bold" style={{paddingLeft:"6px", color:"#cc1d00"}}>L</p>
                                                        </div> */}
                                                        <div style={{fontSize:"13.5px"}}>
                                                            {
                                                                t.starters.map((s,q) =>
                                                                <div key={q} className={"py-3" }style={isOdd(q) ===1?{background:"#1b2025"}:{background:"#0f0f0f"}}>
                                                                    <div className="d-flex justify-content-between align-items-end">
                                                                            <p className="m-0 bold" style={{paddingLeft:"1.3em"}}>{t.starters_points[q]}</p>
                                                                            {
                                                                                findPlayer(s, players) ?
                                                                                    <div className="d-flex align-items-center">
                                                                                        <div className="text-end">
                                                                                            {
                                                                                                findPlayer(s, players).position === "DEF"?
                                                                                                    <p className="m-0 bold">{findPlayer(s, players).first_name} {findPlayer(s, players).last_name}</p> 
                                                                                                :
                                                                                                    <p className="m-0 bold">{findPlayer(s, players).full_name}</p> 
                                                                                            }                                                                                
                                                                                            <p className="m-0 bold" style={{fontSize:"11px", color:"lightgray"}}>{findPlayer(s, players).position} - {findPlayer(s, players).team}</p>
                                                                                            {
                                                                                                findPlayer(s, players).position === "DEF"?
                                                                                                <></>
                                                                                                :
                                                                                                    <p className="m-0" style={{color:"#718396", fontSize:"10.5px"}}>EXP {findPlayer(s, players).years_exp}</p>
                                                                                            }
                                                                                        </div>
                                                                                        {
                                                                                            findPlayer(s, players).position === "DEF" ?
                                                                                                <div className="mx-2" style={{ 
                                                                                                            background:"#a4553f",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }}>
                                                                                                    <div className="p-1"style={isOdd(q)===1?{background:"#1b2025",borderRadius:"50%"}:{background:"#0f0f0f",borderRadius:"50%"}}>
                                                                                                        <div className="smallHeadShot"
                                                                                                            style={{backgroundSize:"50px",backgroundImage: `url(${findLogo(findPlayer(s, players).team).l})`,
                                                                                                        }}>
                                                                                                                        
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            :
                                                                                                <div className="mx-2" style={
                                                                                                    q===0?
                                                                                                        { 
                                                                                                            background:"#f8296d",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q===1 || q===2? 
                                                                                                        {
                                                                                                            background:"#36ceb8",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q > 2 && q < 6?
                                                                                                        {
                                                                                                            background:"#58a7ff",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q === 6?
                                                                                                        {
                                                                                                            background:"#faae58",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }: 
                                                                                                    q === 7?
                                                                                                        {
                                                                                                            background:"linear-gradient(90deg, rgba(250,174,88,1) 0%, rgba(88,167,255,1) 50%, rgba(54,206,184,1) 100%)",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }: 
                                                                                                    q === 8?
                                                                                                        {
                                                                                                            background:"linear-gradient(90deg, rgba(88,167,255,1) 0%, rgba(54,206,184,1) 100%)",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q === 9?
                                                                                                        {
                                                                                                            background:"linear-gradient(90deg, rgba(250,174,88,1) 0%, rgba(88,167,255,1) 25%, rgba(55,204,187,1) 75%, rgba(248,41,109,1) 100%)",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q === 10?
                                                                                                        {
                                                                                                            background:"#bd66ff",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }
                                                                                                        :{ 
                                                                                                            background:"black",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }
                                                                                                }>
                                                                                                    <div className="p-1"style={isOdd(q)===1?{background:"#1b2025",borderRadius:"50%"}:{background:"#0f0f0f",borderRadius:"50%"}}>
                                                                                                        <div className="smallHeadShot"
                                                                                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                                                                findPlayer(s, players).player_id}.jpg)`,
                                                                                                        }}>
                                                                                                            {
                                                                                                                findLogo(findPlayer(s, players).team).l !=="" || findLogo("FA").l !==""?
                                                                                                                    <div className="displayOwnerLogoSM" style={{textAlign:"left",left:"-10px"}}> 
                                                                                                                        <img style={{width:"3em"}} alt="" src={findLogo(findPlayer(s, players).team).l || findLogo("FA").l}/>
                                                                                                                    </div>  
                                                                                                                :<></>
                                                                                                            }           
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                        }
                                                                                    </div>
                                                                                :
                                                                                    <div className="mx-2" style={{ 
                                                                                        background:"lightgrey",
                                                                                        borderRadius:"50%",
                                                                                        padding:"2px"
                                                                                    }}>
                                                                                        <div className="p-1"style={isOdd(q)===1?{background:"#1b2025",borderRadius:"50%"}:{background:"#0f0f0f",borderRadius:"50%"}}>
                                                                                            <div className="smallHeadShot"
                                                                                                style={{backgroundSize:"50px",backgroundImage: `url()`,
                                                                                            }}>            
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                :
                                                    <div>
                                                        <div className="d-flex align-items-center" style={{background:"rgba(27,32,37,1)"}}>
                                                            <div className="d-flex align-items-center col justify-content-end">
                                                                <div>
                                                                    <img className="" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                            findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.avatar ? 
                                                                                findRosterByID(t.roster_id, rosters.totalRoster).owner.avatar 
                                                                            : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}
                                                                        style={{width:"80px",}} 
                                                                    />
                                                                </div>
                                                                <div className="col" style={{fontSize:"13.5px",marginLeft:".8em"}}>
                                                                    <p className="m-0 bold text-truncate" style={{}}>
                                                                        {
                                                                            findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.team_name ?
                                                                                findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.team_name
                                                                            :
                                                                                findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.display_name
                                                                        }
                                                                    </p>
                                                                    <p className="m-0" style={{color:"#cbcbcb", fontWeight:"lighter",fontSize:"13px"}}>@{findRosterByID(t.roster_id, rosters.totalRoster)?.owner?.display_name}</p>
                                                                    <div className="d-flex justify-content-between">
                                                                        {
                                                                            findRecordBy(t.roster_id,findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).year) && 
                                                                            findRecordBy(t.roster_id,findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).year).settings ?
                                                                                <p className="m-0 mt-1">
                                                                                    {findRecordBy(t.roster_id,findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).year).settings.wins}
                                                                                    -
                                                                                    {findRecordBy(t.roster_id,findGameDate(game[0].points,game[1].points,game.filter(o => o.roster_id !== Number(id)).roster_id).year).settings.losses}
                                                                                </p>
                                                                            :<></>
                                                                        }
                                                                        <div className="d-flex align-items-center"> 
                                                                            <p className="m-0 bold" style={{paddingRight:"6px", color:"#34d367"}}>W</p>               
                                                                            <p className="m-0 bold" style={{paddingRight:"1.3em"}}>{t.points}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="p-1"style={{position:"relative",zIndex:1,background:"#1b2025", borderRadius:"50%",border:"2px outset #0f0f0f"}}>
                                                                    <p className="m-0 bold p-2"style={{fontSize:"12px",color:"#a9dfd8",background:"#0f0f0f", borderRadius:"50%"}}>VS</p>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                        {/* <div className="m-0 py-1 d-flex justify-content-end align-items-center" style={{background:"linear-gradient(-140deg, rgba(27,32,37,1) 65%, rgba(0,0,0,1) 68%)", fontSize:"14.5px"}}>
                                                            <p className="m-0 bold" style={{paddingRight:"6px", color:"#34d367"}}>W</p>               
                                                            <p className="m-0 bold" style={{paddingRight:"1.3em"}}>{t.points}</p>
                                                        </div> */}
                                                        <div className="" style={{fontSize:"13.5px"}}>
                                                            {
                                                                t.starters.map((s,q) =>
                                                                    <div key={q} className={"py-3" }style={isOdd(q) ===1?{background:"#1b2025"}:{background:"#0f0f0f"}}>
                                                                        <div className="d-flex justify-content-between align-items-end">
                                                                            {
                                                                                findPlayer(s, players) ?
                                                                                    <div className="d-flex align-items-center">
                                                                                        {
                                                                                            findPlayer(s, players).position === "DEF" ?
                                                                                                <div className="mx-2" style={{ 
                                                                                                    background:"#a4553f",
                                                                                                    borderRadius:"50%",
                                                                                                    padding:"2px"
                                                                                                }}>
                                                                                                    <div className="p-1"style={isOdd(q)===1?{background:"#1b2025",borderRadius:"50%"}:{background:"#0f0f0f",borderRadius:"50%"}}>
                                                                                                        <div className="smallHeadShot"
                                                                                                            style={{backgroundSize:"50px",backgroundImage: `url(${findLogo(findPlayer(s, players).team).l})`,
                                                                                                        }}>            
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            :
                                                                                                <div className="mx-2" style={
                                                                                                    q===0?
                                                                                                        { 
                                                                                                            background:"#f8296d",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q===1 || q===2? 
                                                                                                        {
                                                                                                            background:"#36ceb8",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q > 2 && q < 6?
                                                                                                        {
                                                                                                            background:"#58a7ff",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q === 6?
                                                                                                        {
                                                                                                            background:"#faae58",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }: 
                                                                                                    q === 7?
                                                                                                        {
                                                                                                            background:"linear-gradient(90deg, rgba(250,174,88,1) 0%, rgba(88,167,255,1) 50%, rgba(54,206,184,1) 100%)",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }: 
                                                                                                    q === 8?
                                                                                                        {
                                                                                                            background:"linear-gradient(90deg, rgba(88,167,255,1) 0%, rgba(54,206,184,1) 100%)",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q === 9?
                                                                                                        {
                                                                                                            background:"linear-gradient(90deg, rgba(250,174,88,1) 0%, rgba(88,167,255,1) 25%, rgba(55,204,187,1) 75%, rgba(248,41,109,1) 100%)",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }:
                                                                                                    q === 10?
                                                                                                        {
                                                                                                            background:"#bd66ff",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }
                                                                                                        :{ 
                                                                                                            background:"black",
                                                                                                            borderRadius:"50%",
                                                                                                            padding:"2px"
                                                                                                        }
                                                                                                }>
                                                                                                    <div className="p-1"style={isOdd(q)===1?{background:"#1b2025",borderRadius:"50%"}:{background:"#0f0f0f",borderRadius:"50%"}}>
                                                                                                        <div className="smallHeadShot"
                                                                                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                                                                findPlayer(s, players).player_id}.jpg)`,
                                                                                                        }}>
                                                                                                            {
                                                                                                                findLogo(findPlayer(s, players).team).l !== "" || findLogo("FA").l !==""?
                                                                                                                    <div className="displayOwnerLogoSM" style={{}}> 
                                                                                                                        <img style={{width:"3em"}} alt="" src={findLogo(findPlayer(s, players).team).l || findLogo("FA").l}/>
                                                                                                                    </div> 
                                                                                                                :<></>
                                                                                                            }
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                        }
                                                                                        <div>
                                                                                            {
                                                                                                findPlayer(s, players).position === "DEF"?
                                                                                                    <p className="m-0 bold">{findPlayer(s, players).first_name} {findPlayer(s, players).last_name}</p> 
                                                                                                :
                                                                                                    <p className="m-0 bold">{findPlayer(s, players).full_name}</p> 
                                                                                            }
                                                                                            <p className="m-0 bold" style={{fontSize:"11px", color:"lightgray"}}>{findPlayer(s, players).position} - {findPlayer(s, players).team}</p>
                                                                                            {
                                                                                                findPlayer(s, players).position === "DEF"?
                                                                                                <></>
                                                                                                :
                                                                                                    <p className="m-0" style={{color:"#718396", fontSize:"10.5px"}}>EXP {findPlayer(s, players).years_exp}</p>
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                :
                                                                                    <div className="mx-2" style={{ 
                                                                                        background:"lightgrey",
                                                                                        borderRadius:"50%",
                                                                                        padding:"2px"
                                                                                    }}>
                                                                                        <div className="p-1"style={isOdd(q)===1?{background:"#1b2025",borderRadius:"50%"}:{background:"#0f0f0f",borderRadius:"50%"}}>
                                                                                            <div className="smallHeadShot"
                                                                                                style={{backgroundSize:"50px",backgroundImage: `url()`,
                                                                                            }}>            
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                            }
                                                                            <p className="m-0 bold" style={{paddingRight:"1.3em"}}>{t.starters_points[q]}</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    :<></>
                }
            </div>
            <div id="" style={{fontSize:"13px",borderTop:"1px solid #2a2c3e"}}>
                <div>
                    <div className="d-flex align-items-center justify-content-between px-2 pt-3 pb-2"style={{color:"#7d91a6", fontSize:"12.85px",borderBottom:"3px solid #2a2c3e"}}>
                        <div className="d-flex align-items-center">
                            <p className="m-0" style={{width:"48px",paddingLeft:"8px"}}>#</p>
                            <p className="m-0" style={{width:"200px"}}>Result</p>
                            <p className="m-0"style={{width:"150px"}}>Date</p>
                        </div>
                        <p className="m-0" style={{}}>Record</p>
                    </div>
                    <div id="leftScrollBar"style={{overflow:"auto",maxHeight:"200px", direction:"rtl",borderBottom:"3px solid #2a2c3e"}}>
                        {
                            findH2HGames() !== null ?
                                findH2HGames().map((g,k) =>
                                    <div key={k} onClick={() => findMatch(g)}
                                        className="py-3 px-2 hover" style={isOdd(k) === 1 ? {background:"#0f0f0f"}:{background:"inherit"}}>
                                        <div className="d-flex align-items-center justify-content-between" style={
                                            game[0] && 
                                            game[0].points &&
                                            g[0] &&
                                            g[0].points &&
                                            game[1] &&
                                            game[1].points &&
                                            g[1] &&
                                            g[1].points
                                            && game[0].points === g[0].points && game[1].points === g[1].points?
                                            {color:"#a9dfd8", fontWeight:"bold"}:{}
                                        }>    
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <p className="m-0 bold" style={{width:"40px",color:"#acb6c3", fontSize:"1em"}}>{k+1}</p>
                                                </div>
                                                <div className="d-flex align-items-center" style={{width:"200px"}}>
                                                    {
                                                        g.map((t,j) =>
                                                            <div key={j}>
                                                                <div className="d-flex align-items-center">
                                                                    {
                                                                        j === 0 ? 
                                                                            t.roster_id===Number(id)? 
                                                                                <p className="m-0 bold" style={{color:"#34d367", width:"18px"}}>W</p>
                                                                            :
                                                                                <p className="m-0 bold" style={{color:"#cc1d00", width:"18px"}}>L</p>
                                                                        :<></>
                                                                    }
                                                                    {
                                                                        j === 1 ?
                                                                        <span className="mx-1" style={{color:"#698b87"}}>-</span>:<></>
                                                                    }
                                                                    <p className="m-0 text-center">{t.points}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                {
                                                    findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id) && 
                                                    findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week && 
                                                    findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).year?
                                                        <div className="d-flex align-items-center" style={{width:"150px"}}>   
                                                            <p className="m-0">
                                                                {
                                                                    findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk01"?
                                                                        "Week 1"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk02"?
                                                                        "Week 2"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk03"?
                                                                        "Week 3"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk04"?
                                                                        "Week 4"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk05"?
                                                                        "Week 5"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk06"?
                                                                        "Week 6"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk07"?
                                                                        "Week 7"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk08"?
                                                                        "Week 8"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk09"?
                                                                        "Week 9"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk10"?
                                                                        "Week 10"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk11"?
                                                                        "Week 11"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk12"?
                                                                        "Week 12"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk13"?
                                                                        "Week 13"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk14"?
                                                                        "Week 14"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk15"?
                                                                        "Week 15"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk16"?
                                                                        "Week 16"
                                                                    : findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week === "wk17"?
                                                                        "Week 17"
                                                                    :findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).week
                                                                }
                                                            </p>
                                                            <p className="m-0">, {findGameDate(g[0].points,g[1].points,g.filter(o => o.roster_id !== Number(id)).roster_id).year}</p>
                                                        </div>
                                                    :<></>
                                                } 
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <p className="m-0">
                                                    {findRecord(findH2HGames(), k).w}
                                                    <span className="" style={{color:"whitesmoke"}}>-</span>
                                                    {findRecord(findH2HGames(), k).l}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            : <></>
                        }
                    </div>
                </div>
                
            </div>
       </div>
    )
}
