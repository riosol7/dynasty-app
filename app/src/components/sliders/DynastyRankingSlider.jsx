import React from "react";
import { Swiper, SwiperSlide} from "swiper/react";
import { Autoplay } from "swiper";
import DynastyRankingSlide from "../slides/DynastyRankingSlide";

export default function DynastyRankingSlider({
    owner,
    processedRosters,
    roundToHundredth,
}) {
    return (
        <div className="my-4">
            <p className="m-0 bold" style={{color:"lightgrey"}}>DYNASTY RANKING</p>
            <div style={{maxWidth:"1720px"}}>
                <Swiper
                    // style={{
                    //     "--swiper-navigation-color": "black",

                    //     // "--swiper-navigation-size": "25px",
                    // }}
                    breakpoints = {{
                        1650: {
                            minWidth:1650.44,
                            slidesPerView: 6,
                            spaceBetweenSlides:5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        1440:{
                            minWidth:1440.44,
                            slidesPerView:5,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        1250:{
                            minWidth:1250.44,
                            slidesPerView:4,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        1050:{
                            minWidth:1050.44,
                            slidesPerView:3,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        800:{
                            minWidth:800.44,
                            slidesPerView:2,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                        615:{
                            minWidth:615.44,
                            slidesPerView:1,
                            spaceBetweenSlides: 5,
                            loop:true,
                            loopFillGroupWithBlank:true 
                        },
                    }}
                    spaceBetween={0}
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
                        processedRosters?.teamRank?.sort((a,b) => a.rank - b.rank).map((r, i) => 
                            <SwiperSlide key={i} style={{width:"260px"}}>
                                <DynastyRankingSlide
                                    owner={owner}
                                    r={r}
                                    roundToHundredth={roundToHundredth}
                                />
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </div>
    )
}
