import React from 'react'
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide} from "swiper/react";
import { Autoplay } from 'swiper';

export default function DynastyRankings2(props) {
    // const id =props.id
    const owner=props.owner
    // const loadRosters=props.loadRosters
    const rosters=props.rosters
    const roundToHundredth=props.roundToHundredth
    const findRosterByName=props.findRosterByName 
    return (
        <div>
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
                        rosters && rosters.teamRank.sort((a,b) => a.rank - b.rank).map((r, i) => 
                            <SwiperSlide key={i} style={{width:"260px"}}>
                                <div className="py-4" style={{border:"",background:""}}>
                                    <a href={`/Owner/${findRosterByName(r.kct.owner.display_name)}`} className="cellLink">
                                        <div className="d-flex align-items-center">
                                            {
                                                r.kct && r.kct.owner ?
                                                    <div className="d-flex align-items-center">
                                                        <div className="" style={{marginRight:".7em"}}>
                                                            <img className="ownerLogo" alt="" style={{width:"45px"}} src={`https://sleepercdn.com/avatars/thumbs/${
                                                                r.kct.owner.avatar ? r.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                                <div className="d-flex justify-content-center align-items-center" 
                                                                    style={{position:"relative", left:30,bottom:15, background:"black", borderRadius:"50%", width:"20px"}}>
                                                                    <p className="m-0 bold" style={owner.owner_id.display_name === r.kct.owner.display_name?
                                                                        {color:"#a9dfd8"}:{color:"#acb6c3"}}>{r.rank}
                                                                    </p>
                                                                </div>
                                                        </div>
                                                        <div style={owner.owner_id.display_name === r.kct.owner.display_name?{}:{color:"lightgrey"}}>
                                                            {
                                                                owner.owner_id.display_name === r.kct.owner.display_name?
                                                                    <p className="m-0 bold">{r.kct.owner.display_name}</p>
                                                                :
                                                                    <p className="m-0">{r.kct.owner.display_name}</p>
                                                            }
                                                            <div className="d-flex align-items-center mt-1">
                                                                <div className="d-flex align-items-center">
                                                                    {
                                                                        owner.owner_id.display_name === r.kct.owner.display_name?
                                                                            <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                                                        :
                                                                            <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#698b87", marginRight:"4px"}}/>
                                                                    }
                                                                    <p className="m-0">{r.kct.teamTotal}</p>
                                                                </div>
                                                                <div className="d-flex align-items-center" style={{marginLeft:"1.5em"}}>
                                                                    {
                                                                        owner.owner_id.display_name === r.kct.owner.display_name?
                                                                            <Icon icon="material-symbols:avg-pace-sharp" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                                                        :
                                                                            <Icon icon="material-symbols:avg-pace-sharp" style={{fontSize:"24px", color:"#698b87", marginRight:"4px"}}/>
                                                                    }
                                                                    <p className="m-0 d-flex align-items-center">
                                                                        { roundToHundredth(roundToHundredth((r.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ r.kct.qb.players.length) +
                                                                        roundToHundredth(r.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ r.kct.rb.players.length) +
                                                                        roundToHundredth(r.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ r.kct.wr.players.length) +
                                                                        roundToHundredth(r.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ r.kct.te.players.length))/4
                                                                        )}
                                                                    </p>
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
