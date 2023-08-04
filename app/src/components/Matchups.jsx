import React from 'react';
import { Swiper, SwiperSlide} from "swiper/react";
import { Icon } from '@iconify/react';
import { Autoplay } from 'swiper';
import LoadMatchups from './temp/LoadMatchups';

export default function Matchups(props) {
    let id=props.id;
    let foundMyMatchups=props.foundMyMatchups
    const players=props.players
    const findRosterByID=props.findRosterByID
    const findRecord=props.findRecord
    const findLogo=props.findLogo
    const foundHistory=props.foundHistory
    const league=props.league
    // const loadLeague = props.loadLeague
    const weeklyMatch=props.weeklyMatch
    const findWeeklyMatchups=props.findWeeklyMatchups
    const openModal=props.openModal
    const roundToHundredth=props.roundToHundredth

    const foundPlayer = (m, pts) => {
        let playerID;

        if((m  !== undefined) && (pts !== undefined) ){
            Object.keys(m.players_points).reduce((acc, elem) => {
                if(m.players_points[elem] === pts){
                    playerID = elem
                    return playerID
                } 

                playerID = Object.keys(m.players_points).filter(key => m.players_points[key] === pts)[0]
                return playerID
            })
        } 
        let findPlayer = players.filter(p => p.player_id === String(playerID))[0]
        return findPlayer || {team:"FA"}
    }
    function MouseOver(event) {
        event.target.style.color="#a9dfd8";
    }
    function MouseOut(event){
        event.target.style.color="#7f7f7f";
    }
    return (
            foundMyMatchups.length === 0 && weeklyMatch === league.season ? <LoadMatchups></LoadMatchups>:
            <div className="d-flex align-items-center" style={{maxWidth:"1720px"}}>
                <Swiper
                    // style={{
                    //     "--swiper-navigation-color": "black",

                    //     // "--swiper-navigation-size": "25px",
                    // }}
                    breakpoints = {{
                        1850: {
                            minWidth:1850.44,
                            slidesPerView: 8,
                            spaceBetweenSlides:5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        1650:{
                            minWidth:1650.44,
                            slidesPerView:7,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        1440:{
                            minWidth:1440.44,
                            slidesPerView:6,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        1250:{
                            minWidth:1250.44,
                            slidesPerView:5,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        1050:{
                            minWidth:1050.44,
                            slidesPerView:4,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        800:{
                            minWidth:800.44,
                            slidesPerView:3,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        615:{
                            minWidth:615.44,
                            slidesPerView:2,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                    }}
                    spaceBetween={5}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    modules={[Autoplay]}
                    // navigation={true}
                    autoplay={{
                        delay: 7000,
                        disableOnInteraction: false
                    }}
                >
                    {
                        weeklyMatch === league.season ?
                            foundMyMatchups && foundMyMatchups.map((m,idx) => 
                                <SwiperSlide key={idx} className="">
                                    <div className="my-4"  style={{fontSize:"12px",width:"200px"}}>
                                        <div style={{position:"absolute", zIndex:"9999", top:"-2px", width:"205px", color:"#e9f0f2"}}>
                                            {
                                                idx === 0 ?
                                                    <div className="">
                                                        <p className="m-0" style={{fontSize:"11.5px", paddingBottom:"2px"}}>Regular Season (Wk. 1 - 14)</p>
                                                        {/* <div style={{width:"205px",height:"1.5px",
                                                            background:"linear-gradient(360deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)",
                                                            borderRadius:"0px 0px 18px 0px"}}>
                                                        </div> */}
                                                    </div>
                                                : idx === 14 ?
                                                    foundHistory(id).c.playoff === true ?
                                                        <div className="">
                                                            <p className="m-0" style={{fontSize:"11.5px",paddingBottom:"2px"}}>Playoffs (Wk. 15 - 17)</p>
                                                            {/* <div style={{width:"205px",height:"1.5px",
                                                                background:"linear-gradient(360deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)",
                                                                borderRadius:"0px 0px 18px 0px"}}>
                                                            </div> */}
                                                        </div> 
                                                    :
                                                    <div className="">
                                                        <p className="m-0" style={{fontSize:"11.5px",paddingBottom:"2px"}}>Toilet Bowl (Wk. 15 - 17)</p>
                                                        {/* <div style={{width:"205px",height:"1.5px",
                                                                background:"linear-gradient(360deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)",
                                                                borderRadius:"0px 0px 18px 0px"}}>
                                                        </div> */}
                                                    </div> 
                                                :<></>
                                            }
                                        </div>
                                        <div className="" style={{borderRadius:"2px 2px 0xp 0px",border:"none", background:"#0f0f0f"}}>
                                            {
                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === null ?
                                                    <div className="p-2">
                                                        <div className="mb-2 d-flex align-items-top">
                                                            <div style={{fontSize:"11.5px"}}>
                                                                {
                                                                    idx  === 14 ?
                                                                        foundHistory(id).c.playoff === true ?
                                                                            <p className="m-0 bold">Divisional</p>
                                                                        : <p className="m-0 bold">Bottom 6</p>
                                                                    : idx  === 16 ?
                                                                        m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ?
                                                                            <p className="m-0 bold">Finals</p>
                                                                        : m.filter(t => t.roster_id === Number(id))[0].matchup_id === null ?
                                                                            <p className="m-0 bold">Week 17</p>
                                                                        :  
                                                                            <p className="m-0 bold"></p>
                                                                    :<></>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="d-flex align-items-center justify-content-start mb-2">
                                                                <div className="d-flex align-items-center mx-2">
                                                                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                        findRosterByID(id).owner ? findRosterByID(id).owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                                </div>
                                                                {
                                                                    idx === 14 ?
                                                                        <p className="m-0" style={{color:"#c9cfd1"}}>BYE Week</p>
                                                                    : foundHistory(id).c.playoff === false ?   
                                                                        <p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                                                    :<p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                                                }
                                                            </div>
                                                            {
                                                                foundHistory(id).c.playoff === true ?
                                                                    idx === 14 ? 
                                                                        <p className="m-0">Clinched Division {findRosterByID(id).settings.division} and Bye</p>
                                                                    :  
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <p className="m-0">{findRosterByID(id).rank}th overall</p>
                                                                            <p className="m-0">{findRosterByID(id).settings.wins}-{findRosterByID(id).settings.losses}</p>
                                                                        </div>
                                                                : 
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <p className="m-0">{findRosterByID(id).rank}th overall</p>
                                                                        <p className="m-0">{findRosterByID(id).settings.wins}-{findRosterByID(id).settings.losses}</p>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                :
                                                    <div>
                                                        <div className="p-2 d-flex justify-content-between align-items-top">
                                                            <div style={{fontSize:"11.5px"}}>
                                                                {
                                                                    idx < 14 ?
                                                                        <p className="m-0 bold">Week {idx + 1}</p>
                                                                    : foundHistory(id).c.playoff === true ?
                                                                        idx  === 14 ?
                                                                            <p className="m-0 bold">Divisional</p>
                                                                        : idx  === 15 ?
                                                                            m.filter(t => t.roster_id === Number(id))[0].matchup_id === 3 ?
                                                                            <p className="m-0 bold">5th Place Match</p>
                                                                            :<p className="m-0 bold">Semi Finals</p>
                                                                        : idx  === 16 ?
                                                                            m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ?
                                                                                <p className="m-0 bold">Finals</p>
                                                                            : 
                                                                                <p className="m-0 bold">3rd Place Match</p>
                                                                        :<></>
                                                                    : idx  === 14 ?
                                                                        <p className="m-0 bold">Bottom 6</p>
                                                                    : idx  === 15 ?
                                                                        m.filter(t => t.roster_id === Number(id))[0].matchup_id === 6?
                                                                            <p className="m-0 bold">7th Place Match</p>
                                                                        : <p className="m-0 bold">Bottom 4</p>
                                                                    : idx  === 16 ?
                                                                        m.filter(t => t.roster_id === Number(id))[0].matchup_id === 4 ?
                                                                            <p className="m-0 bold">Toilet Bowl</p>
                                                                        : <p className="m-0 bold">9th Place Match</p>
                                                                    :<></>
                                                                }
                                                            </div>
                                                            <Icon icon="ic:outline-more-vert" onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={() => openModal("Matchup",m.filter(t => t.roster_id !== Number(id))[0].roster_id, m)}style={{color:"#7f7f7f", fontSize:"1.4em"}}/>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-start mb-2 px-2">
                                                            {
                                                                m.filter(t => t.roster_id !== Number(id)).map((o, j) => 
                                                                    <div key={j}>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="m-0" style={{color:"#c9cfd1"}}>vs</p>
                                                                            <div className="d-flex align-items-center mx-2">
                                                                                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                                    findRosterByID(o.roster_id).owner ? findRosterByID(o.roster_id).owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                                            </div>
                                                                            <p className="m-0 text-truncate" style={{maxWidth:"140px"}}>{findRosterByID(o.roster_id).owner.team_name ?
                                                                                findRosterByID(o.roster_id).owner.team_name:findRosterByID(o.roster_id).owner.display_name}
                                                                            </p>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="m-0 d-flex align-items-center justify-content-between px-2">
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                {
                                                                    m.map((team, index) => 
                                                                        <div key={index} className="d-flex" style={{border:""}}>
                                                                            {
                                                                                index === 0 ?
                                                                                    index === 0 && team.roster_id === Number(id) ?
                                                                                        <p className="m-0 bold" style={{paddingRight:"6px", color:"#34d367"}}>W</p>
                                                                                    :
                                                                                        <p className="m-0 bold" style={{paddingRight:"6px", color:"#cc1d00"}}>L</p>
                                                                                :<></>
                                                                            }
                                                                            <div className="d-flex align-items-center" style={{border:""}}>
                                                                                {
                                                                                    index === 1 ?
                                                                                    <span className="mx-1" style={{color:"#698b87"}}> - </span>                                                                                :<></>
                                                                                }
                                                                                <p className="m-0">{team.points}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                } 
                                                            </div>
                                                            <p className="m-0">
                                                                {findRecord(foundMyMatchups, idx).w}
                                                                <span className="" style={{color:"whitesmoke"}}>-</span>
                                                                {findRecord(foundMyMatchups, idx).l}
                                                            </p>
                                                        </div>
                                                        <div className="pt-2">
                                                            {
                                                                m.filter(t => t.roster_id === Number(id)).map((o, j) => 
                                                                    <div key={j} style={{}}>
                                                                        <div style={(players.length > 0) ?{background:findLogo(foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).team || "FA").bgColor}:{}}>
                                                                            <div className="d-flex align-items-center" style={{borderRadius:"0px 0px 2px 2px"}}>
                                                                                <div style={
                                                                                    foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                                                        {
                                                                                            width:"65px", height:"50px", 
                                                                                            backgroundPosition:"center",
                                                                                            backgroundRepeat:"no-repeat",
                                                                                            backgroundSize:"40px",
                                                                                            backgroundImage:`url(${findLogo(foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).team).l})`
                                                                                        }
                                                                                    :
                                                                                        {
                                                                                            width:"65px", height:"50px", 
                                                                                            backgroundPosition:"left top",
                                                                                            backgroundRepeat:"no-repeat",
                                                                                            backgroundSize:"40px",
                                                                                            backgroundImage:`url(${findLogo(foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).team).l})`
                                                                                        }
                                                                                }>
                                                                                    {
                                                                                        foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                                                            <></>
                                                                                        :
                                                                                            <img src={`https://sleepercdn.com/content/nfl/players/thumb/${
                                                                                                    foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).player_id
                                                                                                }.jpg`} 
                                                                                                alt="player" 
                                                                                                style={{width:"100%", height:"100%", objectFit:"cover"}}
                                                                                            />
                                                                                    }
                                                                                </div>
                                                                                <div>
                                                                                    <div className="mx-1">
                                                                                        {
                                                                                            foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                                                                <>
                                                                                                    <p className="m-0 bold text-truncate">
                                                                                                        {foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).first_name} {foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).last_name} 
                                                                                                    </p>
                                                                                                    <p className="m-0" style={{fontSize:"11.5px"}}>scored {o.starters_points.sort((a,b) => b - a)[0]}pts</p>
                                                                                                </>
                                                                                            :
                                                                                                <>
                                                                                                    <p className="m-0 bold text-truncate">{foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).full_name}</p>
                                                                                                    <p className="m-0" style={{fontSize:"11.5px"}}>scored {o.starters_points.sort((a,b) => b - a)[0]}pts</p>
                                                                                                </>
                                                                                        }
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        <div>
                                                            <div className="pt-2" style={{background:"black"}}>
                                                                {
                                                                    idx !==undefined && foundHistory(id).c.allPlayWk && foundHistory(id).c.allPlayWk[idx] && 
                                                                    foundHistory(id).c.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}})?
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <Icon icon="material-symbols:arrow-drop-up-rounded" style={{color:"#42f3e9",fontSize:"2.5em"}}/>
                                                                                    <p className="m-0">{foundHistory(id).c.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w}</p>
                                                                                </div>
                                                                                <div className="d-flex align-items-center">
                                                                                    <Icon icon="material-symbols:arrow-drop-down-rounded" style={{color:"#f85012",fontSize:"2.5em"}}/>
                                                                                    <p className="m-0">{foundHistory(id).c.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).oW}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                {
                                                                                    m.map((team, index) => 
                                                                                        <div key={index} style={{border:""}}>
                                                                                            {
                                                                                                index === 0 ?
                                                                                                    index === 0 && team.roster_id === Number(id) ?
                                                                                                        roundToHundredth(100-(foundHistory(id).c.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w/11)*100)!==0?
                                                                                                            <div className="d-flex align-items-center">
                                                                                                                <p className="m-0 px-1" style={{}}>
                                                                                                                    {roundToHundredth(100-(foundHistory(id).c.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w/11)*100)}
                                                                                                                </p>
                                                                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#289a5d"}}/>
                                                                                                            </div>
                                                                                                        : <Icon icon="fluent-emoji-flat:crown" style={{fontSize:"14px"}}/>
                                                                                                            
                                                                                                    :
                                                                                                        foundHistory(id).c.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).oW === 11?
                                                                                                            <Icon icon="emojione-v1:pile-of-poo" style={{fontSize:"16px", color:"#724b21"}}/>
                                                                                                        :
                                                                                                            <div className="d-flex align-items-center">
                                                                                                                <p className="m-0 px-1" style={{}}>
                                                                                                                    {roundToHundredth(0-(foundHistory(id).c.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w/11)*100)}                                                                                                   
                                                                                                                </p>
                                                                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#dab0af"}}/>
                                                                                                            </div>   
                                                                                                :<></>
                                                                                            }
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    :<></>  
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        :
                            findWeeklyMatchups().map((m,idx) => 
                                <SwiperSlide key={idx} className="">
                                    <div className="my-4"  style={{fontSize:"12px",width:"200px"}}>
                                        <div style={{position:"absolute", zIndex:"9999", top:"-2px", width:"205px", color:"#e9f0f2"}}>
                                            {
                                                Number(weeklyMatch) > 2020 ?
                                                    idx === 0 ?
                                                        <div className="">
                                                            <p className="m-0" style={{fontSize:"11.5px", paddingBottom:"2px"}}>Regular Season (Wk. 1 - 14)</p>
                                                            {/* <div style={{width:"205px",height:"1.5px",
                                                                background:"linear-gradient(360deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)",
                                                                borderRadius:"0px 0px 18px 0px"}}>
                                                            </div> */}
                                                        </div>
                                                    : idx === 14 ?
                                                        foundHistory(id, weeklyMatch).s.playoff === true ?
                                                            <div className="">
                                                                <p className="m-0" style={{fontSize:"11.5px",paddingBottom:"2px"}}>Playoffs (Wk. 15 - 17)</p>
                                                                {/* <div style={{width:"205px",height:"1.5px",
                                                                    background:"linear-gradient(360deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)",
                                                                    borderRadius:"0px 0px 18px 0px"}}>
                                                                </div> */}
                                                            </div> 
                                                        :
                                                            <div className="">
                                                                <p className="m-0" style={{fontSize:"11.5px",paddingBottom:"2px"}}>Toilet Bowl (Wk. 15 - 17)</p>
                                                                {/* <div style={{width:"205px",height:"1.5px",
                                                                        background:"linear-gradient(360deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)",
                                                                        borderRadius:"0px 0px 18px 0px"}}>
                                                                </div> */}
                                                            </div> 
                                                    :<></>
                                                :
                                                    idx === 0 ?
                                                        <div className="">
                                                            <p className="m-0" style={{fontSize:"11.5px", paddingBottom:"2px"}}>Regular Season (Wk. 1 - 13)</p>
                                                        </div>
                                                    : idx === 13 ?
                                                        foundHistory(id, weeklyMatch).s.playoff === true ?
                                                            <div className="">
                                                                <p className="m-0" style={{fontSize:"11.5px",paddingBottom:"2px"}}>Playoffs (Wk. 14 - 16)</p>
                                                            </div> 
                                                        :
                                                            <div className="">
                                                                <p className="m-0" style={{fontSize:"11.5px",paddingBottom:"2px"}}>Toilet Bowl (Wk. 14 - 16)</p>
                                                            </div> 
                                                    :<></>
                                            }
                                        </div>
                                        <div className="" style={{borderRadius:"2px 2px 0xp 0px",border:"none", background:"#0f0f0f"}}>
                                            {
                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === null ?
                                                    <div className="p-2">
                                                        <div className="mb-2 d-flex align-items-top">
                                                            <div style={{fontSize:"11.5px"}}>
                                                                {
                                                                    idx  === 14 ?
                                                                        foundHistory(id,weeklyMatch).s.playoff === true ?
                                                                            <p className="m-0 bold">Divisional</p>
                                                                        : <p className="m-0 bold">Bottom 6</p>
                                                                    : idx  === 16 ?
                                                                        m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ?
                                                                            <p className="m-0 bold">Finals</p>
                                                                        : m.filter(t => t.roster_id === Number(id))[0].matchup_id === null ?
                                                                            <p className="m-0 bold">Week 17</p>
                                                                        :  
                                                                            <p className="m-0 bold"></p>
                                                                    :<></>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="d-flex align-items-center justify-content-start mb-2">
                                                                <div className="d-flex align-items-center mx-2">
                                                                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                        findRosterByID(id).owner ? findRosterByID(id).owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                                </div>
                                                                {
                                                                    idx === 14 ?
                                                                        <p className="m-0" style={{color:"#c9cfd1"}}>BYE Week</p>
                                                                    : foundHistory(id,weeklyMatch).s.playoff === false ?   
                                                                        <p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                                                    :<p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                                                }
                                                            </div>
                                                            {
                                                                foundHistory(id,weeklyMatch).s.playoff === true ?
                                                                    idx === 14 ? 
                                                                        <p className="m-0">Clinched Division {findRosterByID(id).settings.division} and Bye</p>
                                                                    :  
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <p className="m-0">{findRosterByID(id).rank}th overall</p>
                                                                            <p className="m-0">{findRosterByID(id).settings.wins}-{findRosterByID(id).settings.losses}</p>
                                                                        </div>
                                                                : 
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <p className="m-0">{findRosterByID(id).rank}th overall</p>
                                                                        <p className="m-0">{findRosterByID(id).settings.wins}-{findRosterByID(id).settings.losses}</p>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                :
                                                    <div>
                                                        <div className="p-2 d-flex justify-content-between align-items-top">
                                                            <div style={{fontSize:"11.5px"}}>
                                                                {
                                                                    Number(weeklyMatch) > 2020?
                                                                        idx < 14 ?
                                                                            <p className="m-0 bold">Week {idx + 1}</p>
                                                                        : foundHistory(id,weeklyMatch).s.playoff === true ?
                                                                            idx  === 14 ?
                                                                                <p className="m-0 bold">Divisional</p>
                                                                            : idx  === 15 ?
                                                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === 3 ?
                                                                                <p className="m-0 bold">5th Place Match</p>
                                                                                :<p className="m-0 bold">Semi Finals</p>
                                                                            : idx  === 16 ?
                                                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ?
                                                                                    <p className="m-0 bold">Finals</p>
                                                                                : 
                                                                                    <p className="m-0 bold">3rd Place Match</p>
                                                                            :<></>
                                                                        : idx  === 14 ?
                                                                            <p className="m-0 bold">Bottom 6</p>
                                                                        : idx  === 15 ?
                                                                            m.filter(t => t.roster_id === Number(id))[0].matchup_id === 6?
                                                                                <p className="m-0 bold">7th Place Match</p>
                                                                            : <p className="m-0 bold">Bottom 4</p>
                                                                        : idx  === 16 ?
                                                                            m.filter(t => t.roster_id === Number(id))[0].matchup_id === 4 ?
                                                                                <p className="m-0 bold">Toilet Bowl</p>
                                                                            : <p className="m-0 bold">9th Place Match</p>
                                                                        :<></>
                                                                    :
                                                                        idx < 13 ?
                                                                                <p className="m-0 bold">Week {idx + 1}</p>
                                                                            : foundHistory(id,weeklyMatch).s.playoff === true ?
                                                                                idx  === 13 ?
                                                                                    <p className="m-0 bold">Divisional</p>
                                                                                : idx  === 14 ?
                                                                                    m.filter(t => t.roster_id === Number(id))[0].matchup_id === 3 ?
                                                                                    <p className="m-0 bold">5th Place Match</p>
                                                                                    :<p className="m-0 bold">Semi Finals</p>
                                                                                : idx  === 15 ?
                                                                                    m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ?
                                                                                        <p className="m-0 bold">Finals</p>
                                                                                    : 
                                                                                        <p className="m-0 bold">3rd Place Match</p>
                                                                                :<></>
                                                                            : idx  === 13 ?
                                                                                <p className="m-0 bold">Bottom 6</p>
                                                                            : idx  === 14 ?
                                                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === 6?
                                                                                    <p className="m-0 bold">7th Place Match</p>
                                                                                : <p className="m-0 bold">Bottom 4</p>
                                                                            : idx  === 15 ?
                                                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === 4 ?
                                                                                    <p className="m-0 bold">Toilet Bowl</p>
                                                                                : <p className="m-0 bold">9th Place Match</p>
                                                                            :<></>
                                                                }
                                                            </div>
                                                            <Icon icon="ic:outline-more-vert" onMouseOver={MouseOver} onMouseOut={MouseOut} onClick={() => openModal("Matchup",m.filter(t => t.roster_id !== Number(id))[0].roster_id, m)}style={{color:"#7f7f7f", fontSize:"1.4em"}}/>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-start mb-2 px-2">
                                                            {
                                                                m.filter(t => t.roster_id !== Number(id)).map((o, j) => 
                                                                    <div key={j}>
                                                                        <div className="d-flex align-items-center">
                                                                            <p className="m-0" style={{color:"#c9cfd1"}}>vs</p>
                                                                            <div className="d-flex align-items-center mx-2">
                                                                                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                                    findRosterByID(o.roster_id).owner ? findRosterByID(o.roster_id).owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                                            </div>
                                                                            <p className="m-0 text-truncate" style={{maxWidth:"140px"}}>{findRosterByID(o.roster_id).owner.team_name ?
                                                                                findRosterByID(o.roster_id).owner.team_name:findRosterByID(o.roster_id).owner.display_name}
                                                                            </p>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="m-0 d-flex align-items-center justify-content-between px-2">
                                                            <div className="d-flex align-items-center justify-content-start">
                                                                {
                                                                    m.map((team, index) => 
                                                                        <div key={index} className="d-flex" style={{border:""}}>
                                                                            {
                                                                                index === 0 ?
                                                                                    index === 0 && team.roster_id === Number(id) ?
                                                                                        <p className="m-0 bold" style={{paddingRight:"6px", color:"#34d367"}}>W</p>
                                                                                    :
                                                                                        <p className="m-0 bold" style={{paddingRight:"6px", color:"#cc1d00"}}>L</p>
                                                                                :<></>
                                                                            }
                                                                            <div className="d-flex align-items-center" style={{border:""}}>
                                                                                {
                                                                                    index === 1 ?
                                                                                    <span className="mx-1" style={{color:"#698b87"}}> - </span>:<></>
                                                                                }
                                                                                <p className="m-0">{team.points}</p>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                } 
                                                            </div>
                                                            <p className="m-0">
                                                                {findRecord(findWeeklyMatchups(), idx).w}
                                                                <span className="" style={{color:"whitesmoke"}}>-</span>
                                                                {findRecord(findWeeklyMatchups(), idx).l}
                                                            </p>
                                                        </div>
                                                        <div className="pt-2">
                                                            {
                                                                m.filter(t => t.roster_id === Number(id)).map((o, j) => 
                                                                    <div key={j} style={{}}>
                                                                        <div style={(players.length > 0) ?{background:findLogo(foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).team || "FA").bgColor}:{}}>
                                                                            <div className="d-flex align-items-center" style={{borderRadius:"0px 0px 2px 2px"}}>
                                                                                <div style={
                                                                                    foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                                                        {
                                                                                            width:"65px", height:"50px", 
                                                                                            backgroundPosition:"center",
                                                                                            backgroundRepeat:"no-repeat",
                                                                                            backgroundSize:"40px",
                                                                                            backgroundImage:`url(${findLogo(foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).team).l})`
                                                                                        }
                                                                                    :
                                                                                        {
                                                                                            width:"65px", height:"50px", 
                                                                                            backgroundPosition:"left top",
                                                                                            backgroundRepeat:"no-repeat",
                                                                                            backgroundSize:"40px",
                                                                                            backgroundImage:`url(${findLogo(foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).team).l})`
                                                                                        }
                                                                                }>
                                                                                    {
                                                                                        foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                                                            <></>
                                                                                        :
                                                                                            <img src={`https://sleepercdn.com/content/nfl/players/thumb/${
                                                                                                    foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).player_id
                                                                                                }.jpg`} 
                                                                                                alt="player" 
                                                                                                style={{width:"100%", height:"100%", objectFit:"cover"}}
                                                                                            />
                                                                                    }
                                                                                </div>
                                                                                <div>
                                                                                    <div className="mx-1">
                                                                                        {
                                                                                            foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                                                                <>
                                                                                                    <p className="m-0 bold text-truncate">
                                                                                                        {foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).first_name} {foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).last_name} 
                                                                                                    </p>
                                                                                                    <p className="m-0" style={{fontSize:"11.5px"}}>scored {o.starters_points.sort((a,b) => b - a)[0]}pts</p>
                                                                                                </>
                                                                                            :
                                                                                                <>
                                                                                                    <p className="m-0 bold text-truncate">{foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).full_name}</p>
                                                                                                    <p className="m-0" style={{fontSize:"11.5px"}}>scored {o.starters_points.sort((a,b) => b - a)[0]}pts</p>
                                                                                                </>
                                                                                        }
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                        <div>
                                                            <div className="pt-2" style={{background:"black"}}>
                                                                {
                                                                    idx !==undefined &&
                                                                    foundHistory(id, weeklyMatch) && 
                                                                    foundHistory(id, weeklyMatch).s &&
                                                                    foundHistory(id, weeklyMatch).s.allPlayWk && 
                                                                    foundHistory(id, weeklyMatch).s.allPlayWk[idx] && 
                                                                    foundHistory(id, weeklyMatch).s.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}})?
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="d-flex align-items-center">
                                                                                    <Icon icon="material-symbols:arrow-drop-up-rounded" style={{color:"#42f3e9",fontSize:"2.5em"}}/>
                                                                                    <p className="m-0">{foundHistory(id, weeklyMatch).s.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w}</p>
                                                                                </div>
                                                                                <div className="d-flex align-items-center">
                                                                                    <Icon icon="material-symbols:arrow-drop-down-rounded" style={{color:"#f85012",fontSize:"2.5em"}}/>
                                                                                    <p className="m-0">{foundHistory(id, weeklyMatch).s.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).oW}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="">
                                                                                {
                                                                                    m.map((team, index) => 
                                                                                        <div key={index} className="d-flex align-items-center" style={{border:""}}>
                                                                                            {
                                                                                                index === 0 ?
                                                                                                    index === 0 && team.roster_id === Number(id) ?
                                                                                                        roundToHundredth(100-(foundHistory(id,weeklyMatch).s.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w/11)*100)!==0?
                                                                                                            <div className="d-flex align-items-center">
                                                                                                                <p className="m-0 px-1" style={{}}>
                                                                                                                    {roundToHundredth(100-(foundHistory(id,weeklyMatch).s.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w/11)*100)}
                                                                                                                </p>
                                                                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#289a5d"}}/>
                                                                                                            </div>
                                                                                                        : <Icon icon="fluent-emoji-flat:crown" style={{fontSize:"16px"}}/>
                                                                                                            
                                                                                                    :
                                                                                                        foundHistory(id,weeklyMatch).s.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).oW === 11?
                                                                                                            <Icon icon="emojione-v1:pile-of-poo" style={{fontSize:"16px", color:"#724b21"}}/>
                                                                                                        :
                                                                                                            <div className="d-flex align-items-center">
                                                                                                                <p className="m-0 px-1" style={{}}>
                                                                                                                    {roundToHundredth(0-(foundHistory(id,weeklyMatch).s.allPlayWk[idx].reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w/11)*100)}                                                                                                   
                                                                                                                </p>
                                                                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#dab0af"}}/>
                                                                                                            </div>   
                                                                                                :<></>
                                                                                            }
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    :<></>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                            } 
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                    }
                </Swiper>
            </div>
        
    )
}