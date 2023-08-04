import React, {useState, useEffect} from 'react';
import Chart from 'react-apexcharts';

export default function PowerRadarChart(props) {
    const pwrRank=props.pwrRank
    const selectSzn=props.selectSzn
    const roundToHundredth=props.roundToHundredth
    const foundHistory=props.foundHistory
    const league=props.league
    const owner=props.owner
    // const [t1,setT1]=useState(pwrRank&&pwrRank.filter(o=>o.owner.display_name===owner.owner.display_name)[0])
    const [t1,setT1]=useState(pwrRank[0])
    const [t2,setT2]=useState(pwrRank[1])

    const series = [t1.owner&&t1.settings?{
        name: t1.owner.display_name,
        data:[
            Number(selectSzn) <= 2020?
                roundToHundredth(Number((t1.settings.fpts+"."+t1.settings.fpts_decimal)/13))
            :
                roundToHundredth(Number((t1.settings.fpts+"."+t1.settings.fpts_decimal)/14))
            ,
            Number(selectSzn) <= 2020?
                roundToHundredth(Number((t1.settings.fpts_against+"."+t1.settings.fpts_against_decimal)/13))
            :
                roundToHundredth(Number((t1.settings.fpts_against+"."+t1.settings.fpts_against_decimal)/14))
        ,
            selectSzn===league.season?
                foundHistory(t1.roster_id).c.matchups.length > 0? 
                    foundHistory(t1.roster_id).c.matchups
                    .map(t=>t.filter(r=>r.roster_id===t1.roster_id)[0])
                        .sort((a,b)=> b.points - a.points)[0].points
                :0
            :
                foundHistory(t1.roster_id,selectSzn).s.matchups
                .map(t=>t.filter(r=>r.roster_id===t1.roster_id)[0])
                    .sort((a,b)=> b.points - a.points)[0].points
        ,
            selectSzn===league.season?
                foundHistory(t1.roster_id).c.matchups.length > 0? 
                    foundHistory(t1.roster_id).c.matchups
                    .map(t=>t.filter(r=>r.roster_id===t1.roster_id)[0])
                        .sort((a,b)=> a.points - b.points)[0].points
                :0
            :
                foundHistory(t1.roster_id,selectSzn).s.matchups
                .map(t=>t.filter(r=>r.roster_id===t1.roster_id)[0])
                    .sort((a,b)=> a.points - b.points)[0].points
        ,
            selectSzn===league.season?
                foundHistory(t1.roster_id).c.matchups.length > 0? 
                    foundHistory(t1.roster_id).c.matchups
                    .map(t=>t.filter(r=>r.roster_id!==t1.roster_id)[0])
                        .sort((a,b)=> a.points - b.points)[0].points
                :0
            :
                foundHistory(t1.roster_id,selectSzn).s.matchups
                .map(t=>t.filter(r=>r.roster_id!==t1.roster_id)[0])
                    .sort((a,b)=> a.points - b.points)[0].points
        ,
            selectSzn===league.season?
                foundHistory(t1.roster_id).c.matchups.length > 0? 
                    foundHistory(t1.roster_id).c.matchups
                    .map(t=>t.filter(r=>r.roster_id!==t1.roster_id)[0])
                        .sort((a,b)=> b.points - a.points)[0].points
                :0
            :
                foundHistory(t1.roster_id,selectSzn).s.matchups
                .map(t=>t.filter(r=>r.roster_id!==t1.roster_id)[0])
                    .sort((a,b)=> b.points - a.points)[0].points
        ],
    }:{},
    t2.owner&&t2.settings?{
        name: t2.owner.display_name,
        data:[
            Number(selectSzn) <= 2020?
                roundToHundredth(Number((t2.settings.fpts+"."+t2.settings.fpts_decimal)/13))
            :
                roundToHundredth(Number((t2.settings.fpts+"."+t2.settings.fpts_decimal)/14))
            ,
            Number(selectSzn) <= 2020?
            roundToHundredth(Number((t2.settings.fpts_against+"."+t2.settings.fpts_against_decimal)/13))
        :
            roundToHundredth(Number((t2.settings.fpts_against+"."+t2.settings.fpts_against_decimal)/14))
            ,
            selectSzn===league.season?
                foundHistory(t2.roster_id).c.matchups.length>0?
                    foundHistory(t2.roster_id).c.matchups
                    .map(t=>t.filter(r=>r.roster_id===t2.roster_id)[0])
                        .sort((a,b)=> b.points - a.points)[0].points
                :0
            :
                foundHistory(t2.roster_id,selectSzn).s.matchups
                .map(t=>t.filter(r=>r.roster_id===t2.roster_id)[0])
                    .sort((a,b)=> b.points - a.points)[0].points
        ,
            selectSzn===league.season?
                foundHistory(t2.roster_id).c.matchups.length>0?
                    foundHistory(t2.roster_id).c.matchups
                        .map(t=>t.filter(r=>r.roster_id===t2.roster_id)[0])
                            .sort((a,b)=> a.points - b.points)[1].points
                :0
            :
                foundHistory(t2.roster_id,selectSzn).s.matchups
                .map(t=>t.filter(r=>r.roster_id===t2.roster_id)[0])
                    .sort((a,b)=> a.points - b.points)[0].points
        ,
            selectSzn===league.season?
                foundHistory(t2.roster_id).c.matchups.length>0?
                    foundHistory(t2.roster_id).c.matchups
                    .map(t=>t.filter(r=>r.roster_id!==t2.roster_id)[0])
                        .sort((a,b)=> a.points - b.points)[0].points
                :0
            :
                foundHistory(t2.roster_id,selectSzn).s.matchups
                .map(t=>t.filter(r=>r.roster_id!==t2.roster_id)[0])
                    .sort((a,b)=> a.points - b.points)[0].points
        ,
            selectSzn===league.season?
                foundHistory(t2.roster_id).c.matchups.length>0?
                    foundHistory(t2.roster_id).c.matchups
                    .map(t=>t.filter(r=>r.roster_id!==t2.roster_id)[0])
                        .sort((a,b)=> b.points - a.points)[0].points
                :0
            :
                foundHistory(t2.roster_id,selectSzn).s.matchups
                .map(t=>t.filter(r=>r.roster_id!==t2.roster_id)[0])
                    .sort((a,b)=> b.points - a.points)[0].points
        ],
    }:{},
    ]
    const options = {
        chart: {
            type: 'radar',
            foreColor: 'none',
            toolbar: {
                show: false
            },
        },
        colors: ["#a9dfd8","#fccccb"],
        dataLabels: {
            enabled: false
        },
        grid: {
            show: false,
            padding: {
              bottom: 0
            }
        },
        legend:{
            show:false
        },
        tooltip: {
            theme:"dark",
            y:{
                formatter: function (val) {
                  return val + " pts"
                },
            },
        },
        xaxis: {
            categories: ['avg pts PF', 'avg pts PA', 'best', 'worst', 'easiest', 'hardest']
        }
    };

    const handleTeam1=(e)=>{
        setT1(pwrRank.filter(r=>r.owner.display_name===e.target.value)[0])
    }
    const handleTeam2=(e)=>{
        setT2(pwrRank&&pwrRank.filter(r=>r.owner.display_name===e.target.value)[0])
    }

    useEffect(() =>{
        setT1(pwrRank[0])
        setT2(pwrRank[1])
    },[selectSzn, pwrRank])
    return (
        <div className="" style={{border:"none", width:"350px"}}>
            <div className="">
                <div className="">
                    <select onChange={handleTeam1} style={{
                        background:"inherit",
                        color:"white",
                        paddingBlock:".5em",
                        width:"100%",
                        border:"none",
                    }} value={t1.owner && t1.owner.display_name}>
                        {
                            pwrRank&&pwrRank.filter(r=>r.roster_id!==t2.roster_id).map((t,i)=>
                                <option key={i} value={t.owner.display_name}>{t.owner.display_name}</option>    
                            )
                        }
                    </select>
                    {
                        t1&&t1.settings?
                            <div className="d-flex align-items-center justify-content-between my-3" style={{fontSize:"12.5px"}}>
                                <p className="m-0"><span style={{color:"#a9dfd8"}}>PF</span> {t1.settings.fpts}.{t1.settings.fpts_decimal}</p>
                                <p className="m-0"><span style={{color:"#a9dfd8"}}>MAX PF</span> {t1.settings.ppts}.{t1.settings.ppts_decimal}</p>
                                <p className="m-0"><span style={{color:"#a9dfd8"}}>PA</span> {t1.settings.fpts_against}.{t1.settings.fpts_against_decimal}</p>
                            </div>
                        :<></>
                    }
                </div>
                <div className="">
                    <select onChange={handleTeam2} style={{
                        background:"inherit",
                        color:"white",
                        paddingBlock:".5em",
                        width:"100%",
                        border:"none",
                    }} value={t2.owner && t2.owner.display_name}>
                        {
                            pwrRank&&pwrRank.filter(r=>r.roster_id!==t1.roster_id).map((t,i)=>
                                <option key={i} value={t.owner.display_name}>{t.owner.display_name}</option>    
                            )
                        }
                    </select>
                    <div className="d-flex align-items-center justify-content-between mt-3" style={{fontSize:"12.5px"}}>
                        <p className="m-0"><span style={{color:"#fccccb"}}>PF</span> {t2.settings.fpts}.{t2.settings.fpts_decimal}</p>
                        <p className="m-0"><span style={{color:"#fccccb"}}>MAX PF</span> {t2.settings.ppts}.{t2.settings.ppts_decimal}</p>
                        <p className="m-0"><span style={{color:"#fccccb"}}>PA</span> {t2.settings.fpts_against}.{t2.settings.fpts_against_decimal}</p>
                    </div>
                </div>
            </div>
            <div>
                <Chart 
                    type='radar'
                    series={series}
                    options={options}   
                    width={350}
                    height={400}
                />
            </div>
        </div>
    )
}
