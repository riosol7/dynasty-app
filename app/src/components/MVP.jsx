import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { Icon } from '@iconify/react';
import value from "../assets/value.png";

export default function MVP(props) {
    const rosters=props.rosters
    const loadRosters=props.loadRosters
    const findLogo=props.findLogo
    const findPlayer=props.findPlayer
    const getTotalPts=props.getTotalPts
    const findRosterByName=props.findRosterByName

    function getMVP(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topPlayers = [
            foundTeam.kct.qb.players[0],
            foundTeam.kct.rb.players[0],
            foundTeam.kct.wr.players[0],
            foundTeam.kct.te.players[0]
        ]
        let topPlayer = topPlayers.reduce((prev, current) => {
            return (prev.rating > current.rating) ? prev : current
        })
        return topPlayer
    }

    // var getInitials = function (name) {
    //     var splitName = name.split(" ");
    //     return splitName[0].charAt(0) + ". " + splitName[1]
    // };
    return (
        <>
        { loadRosters ? <p>Loading </p> :
            <div className="d-flex" style={{maxWidth:"1717.44px",cursor:"grab"}}>
                <Swiper 
                    breakpoints = {{
                        1850: {
                            minWidth:1850.44,
                            slidesPerView: 5,
                            spaceBetweenSlides:55,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        1520:{
                            minWidth:1520.44,
                            slidesPerView:4,
                            spaceBetweenSlides: 55,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        1200:{
                            minWidth:1200.44,
                            slidesPerView:3,
                            spaceBetweenSlides: 55,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        855:{
                            minWidth:855.44,
                            slidesPerView:2,
                            spaceBetweenSlides: 25,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                    }}
                    spaceBetween={30}
                    slidesPerGroup={1} 
                    loop={true} 
                    loopFillGroupWithBlank={true}  
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                    }}
                    className="mySwiper"
                >
                {rosters.teamRank.map((roster, i) => 
                    <SwiperSlide key={i} className={""}>
                        <div className="" style={{border:"none", borderRadius:"4px", background:findLogo(getMVP(roster.kct.owner.display_name).team).bgColor}}>
                            <div className="d-flex" style={{
                                backgroundImage: `url(${findLogo(getMVP(roster.kct.owner.display_name).team).l}`,
                                backgroundRepeat:"no-repeat",
                                backgroundPosition:"bottom left",
                                backgroundSize:"150px",
                            }}>
                                <div className="px-1" style={{}}>
                                    <div
                                        style={{
                                            backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                getMVP(roster.kct.owner.display_name).player_id}.jpg)`,
                                            backgroundRepeat:"no-repeat",
                                            backgroundPosition:"bottom",
                                            backgroundSize:"cover",
                                            minHeight:"145px",
                                            minWidth:"175px"
                                        }}>
                                    </div> 
                                </div>
                                <div className="col">
                                    <div className="d-flex justify-content-between">
                                        <div className="mt-2">
                                            <p className="m-0">{findPlayer(getMVP(roster.kct.owner.display_name).player_id).first_name}</p>
                                            <p className="m-0 bold" style={{fontSize:"1.3em"}}>{findPlayer(getMVP(roster.kct.owner.display_name).player_id).last_name}</p>
                                        </div>
                                        <div className="p-2">
                                            <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner.avatar}`}/>
                                        </div> 
                                    </div>
                                    <div className="my-1 d-flex align-items-center">
                                        <div className="">
                                            <div className={
                                                getMVP(roster.kct.owner.display_name).position.match(/^[A-Z]+/)[0] === "QB" ? "qbHUD" :
                                                getMVP(roster.kct.owner.display_name).position.match(/^[A-Z]+/)[0] === "RB" ? "rbHUD" :
                                                getMVP(roster.kct.owner.display_name).position.match(/^[A-Z]+/)[0] === "WR" ? "wrHUD" :
                                                "teHUD"
                                            }>
                                                <p className="m-0 d-flex align-items-center" style={{fontSize:"12px", paddingInline:"6px"}}>
                                                    {getMVP(roster.kct.owner.display_name).position} 
                                                    <span style={{color:"whitesmoke", fontWeight:"normal", paddingLeft:"12px"}}>
                                                        {getTotalPts(findRosterByName(roster.kct.owner.display_name),getMVP(roster.kct.owner.display_name).player_id).pts}
                                                        <span style={{color:"lightgray"}}> pts</span>
                                                    </span>
                                                </p> 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mx-2" style={{marginTop:".8em"}}>
                                        <div className="d-flex align-items-center" style={{width:"60px"}}>
                                            <Icon icon="fa6-solid:ranking-star" style={{fontSize:"22px", color:"#a9dfd8"}}/>
                                            <p className="m-0" style={{fontSize:"12px", paddingLeft:"4px"}}>{getMVP(roster.kct.owner.display_name).rank}</p> 
                                        </div>
                                        <div className="d-flex align-items-center" style={{}}>
                                            <img src={value} alt="value" style={{width:"25px",}}/>
                                            <p className="m-0" style={{fontSize:"12px", paddingLeft:"6px"}}>{getMVP(roster.kct.owner.display_name).rating}</p> 
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )}
                </Swiper>
            </div>
        }
        </>
    )
}
