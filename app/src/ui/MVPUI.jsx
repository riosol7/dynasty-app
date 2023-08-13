import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { Icon } from "@iconify/react";
import MVPSlide from "../components/slides/MVPSlide";
import { getTotalPts } from "../utils";

export default function MVPUI({
    findLogo,
    getMVP,
    league,
    loadLeague,
    loadRosters,
    matches,
    processedRosters,
}) {
    return (
        <div className="my-5"> 
            <div className="d-flex align-items-center justify-content-between mb-3"> 
                <div className="d-flex align-items-center">
                    <Icon icon="fluent:star-line-horizontal-3-24-regular" style={{color:"#a9dfd8", fontSize:"1.1rem"}}/>
                    <p className="m-0 mx-1 bold">MVPs</p>
                </div>
                <div id="LA" className="p-2">
                    <Icon icon="material-symbols:arrow-right-alt-rounded" style={{fontSize:"1.5rem",color:"#cbcbcb"}}/>
                </div>
            </div>
            <div>
            { loadLeague && loadRosters ? <p>Loading </p> :
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
                    {processedRosters && processedRosters.teamRank?.length > 1 && processedRosters?.teamRank.map((roster, i) => 
                        <SwiperSlide key={i}>
                            <MVPSlide
                                findLogo={findLogo}
                                getMVP={getMVP}
                                getTotalPts={getTotalPts}
                                league={league}
                                matches={matches}
                                roster={roster}
                            />
                        </SwiperSlide>
                    )}
                    </Swiper>
                </div>
            }
            </div>
        </div>
    )
}
