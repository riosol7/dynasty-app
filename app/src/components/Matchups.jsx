import React from "react";
import { Swiper, SwiperSlide} from "swiper/react";
import { Autoplay } from "swiper";
import MatchupSlide from "./slides/MatchupSlide";
import LoadMatchups from "./temp/LoadMatchups";

export default function Matchups({
    id,
    findLogo,
    findRecord,
    findRosterByID,
    findWeeklyMatchups,
    foundHistory,
    foundMyMatchups,
    league,
    loadLeague,
    openModal,
    players,
    processedRosters,
    roundToHundredth,
    weeklyMatch,
}) {
    const foundRoster = findRosterByID(id, processedRosters.totalRoster);

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
                                <SwiperSlide key={idx}>
                                    <MatchupSlide
                                        findLogo={findLogo}
                                        findRecord={findRecord}
                                        findRosterByID={findRosterByID}
                                        findWeeklyMatchups={findWeeklyMatchups}
                                        foundHistory={foundHistory}
                                        foundPlayer={foundPlayer}
                                        foundRoster={foundRoster}
                                        id={id}
                                        idx={idx}
                                        league={league}
                                        m={m}
                                        MouseOut={MouseOut}
                                        MouseOver={MouseOver}
                                        openModal={openModal}
                                        players={players}
                                        processedRosters={processedRosters}
                                        roundToHundredth={roundToHundredth}
                                        weeklyMatch={weeklyMatch}
                                    />
                                </SwiperSlide>
                            )
                        :
                            findWeeklyMatchups().map((m,idx) => 
                                <SwiperSlide key={idx} className="">
                                    <MatchupSlide
                                        findLogo={findLogo}
                                        findRecord={findRecord}
                                        findRosterByID={findRosterByID}
                                        findWeeklyMatchups={findWeeklyMatchups}
                                        foundHistory={foundHistory}
                                        foundPlayer={foundPlayer}
                                        foundRoster={foundRoster}
                                        id={id}
                                        idx={idx}
                                        league={league}
                                        m={m}
                                        MouseOut={MouseOut}
                                        MouseOver={MouseOver}
                                        openModal={openModal}
                                        players={players}
                                        processedRosters={processedRosters}
                                        roundToHundredth={roundToHundredth}
                                        weeklyMatch={weeklyMatch}
                                    />
                                </SwiperSlide>
                            )
                    }
                </Swiper>
            </div>
        
    )
}