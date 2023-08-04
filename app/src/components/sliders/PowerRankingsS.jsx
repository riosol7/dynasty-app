import React from 'react';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide} from "swiper/react";
import { Autoplay } from 'swiper';

export default function PowerRankings(props) {
    const rosters=props.rosters
    const foundHistory=props.foundHistory
    const selectSzn=props.selectSzn
    const winPCT=props.winPCT
    const league=props.league
    const findRosterByName=props.findRosterByName
    const owner=props.owner
    const pwrRank=props.pwrRank
    return (
        <div>
            <div style={{maxWidth:"1720px"}}>
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
                        pwrRank && pwrRank.map((roster, idx) => ({...roster, rank:idx+1})).map((r,i) => 
                            <SwiperSlide key={i}>
                                <div className="py-4" style={{border:"",background:""}}>
                                    <a href={`/Owner/${findRosterByName(r.owner && r.owner.display_name)}`} className="cellLink">
                                        <div className="d-flex align-items-center">
                                            {
                                                r.owner?
                                                    <div className="d-flex align-items-center">
                                                        <div className="" style={{marginRight:".7em"}}>
                                                            <img className="ownerLogo" alt="" style={{width:"45px"}} src={`https://sleepercdn.com/avatars/thumbs/${
                                                                r.owner.avatar ? r.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                                <div className="d-flex justify-content-center align-items-center" 
                                                                    style={{position:"relative", left:30,bottom:15, background:"black", borderRadius:"50%", width:"20px"}}>
                                                                    <p className="m-0 bold" style={owner && owner.owner.display_name === r.owner.display_name?
                                                                        {color:"#a9dfd8"}:{color:"#acb6c3"}}>{r.rank}
                                                                    </p>
                                                                </div>
                                                        </div>
                                                        <div style={owner.owner.display_name === r.owner.display_name?{}:{color:"lightgrey"}}>
                                                            {
                                                                owner.owner.display_name === r.owner.display_name?
                                                                    <p className="m-0 bold">{r.owner.display_name}</p>
                                                                :
                                                                    <p className="m-0">{r.owner.display_name}</p>
                                                            }
                                                            <div className="d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <Icon icon="material-symbols:arrow-drop-up-rounded" style={{color:"#42f3e9",fontSize:"2.5em"}}/>
                                                                    <p className="m-0">{r.apW}</p>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <Icon icon="material-symbols:arrow-drop-down-rounded" style={{color:"#f85012",fontSize:"2.5em"}}/>
                                                                    <p className="m-0">{r.apL}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                :<></>
                                            }
                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>      
                        )
                    }
                </Swiper>
            </div>
        </div>
    )
}
