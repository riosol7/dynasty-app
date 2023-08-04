import React from 'react';
import Chart from 'react-apexcharts';

export default function PowerScoreStackedChart(props) {
    const pwrRank=props.pwrRank
    const winPCT=props.winPCT
    const roundToHundredth=props.roundToHundredth
    const selectSzn=props.selectSzn
    const foundHistory=props.foundHistory
    const league=props.league

    console.log(pwrRank)
    const series=[
        {
            name:'Average PTS',
            data:pwrRank&&pwrRank.map(o=> Number(selectSzn) <= 2020?
                roundToHundredth(Number((o.settings.fpts+"."+o.settings.fpts_decimal)/13))
            :
                roundToHundredth(Number((o.settings.fpts+"."+o.settings.fpts_decimal)/14)))
        },
        {
            name:'Best Week',
            data: selectSzn===league.season?
                pwrRank&&pwrRank.map(o=>
                    foundHistory(o.roster_id).c.matchups.length > 0? 
                        foundHistory(o.roster_id).c.matchups
                            .map(t=>t.filter(r=>r.roster_id===o.roster_id)[0])
                                .sort((a,b)=> b.points - a.points)[0].points
                    :0
                )  
            :
                pwrRank&&pwrRank.map(o=>
                    foundHistory(o.roster_id,selectSzn).s.matchups
                        .map(t=>t.filter(r=>r.roster_id===o.roster_id)[0])
                            .sort((a,b)=> b.points - a.points)[0].points
                )
        },
        {
            name:'Worst Week',
            data: selectSzn===league.season?
                pwrRank&&pwrRank.map(o=>
                    foundHistory(o.roster_id).c.matchups.length > 0? 
                        foundHistory(o.roster_id).c.matchups
                            .map(t=>t.filter(r=>r.roster_id===o.roster_id)[0])
                                .sort((a,b)=> a.points - b.points)[0].points
                    :0
                )  
            :
                pwrRank&&pwrRank.map(o=>
                    foundHistory(o.roster_id,selectSzn).s.matchups
                        .map(t=>t.filter(r=>r.roster_id===o.roster_id)[0])
                            .sort((a,b)=> a.points - b.points)[0].points
                )
        },
        {
            name:'Win PCT',
            data:pwrRank&&pwrRank.map(o=>
                winPCT(o.settings.wins,o.settings.losses)        
            )
        },
        {
            name:'All Play PCT',
            data:pwrRank&&pwrRank.map(o=>o.apR)
        },
    ]
    console.log(series)
    const options={
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels:{
            enabled:false
        },
        grid: {
            xaxis: {
                lines: {
                show: false
                },
            },
            yaxis: {
                lines: {
                show: false
                },
            }
        },
        legend:{
            show:false
        },
        stroke: {
            curve: 'smooth',
            width: 7
        },
        theme: {
            mode: 'dark', 
        },
        tooltip: {
            shared: false,
            intersect: false
        },
        xaxis: {
            categories: pwrRank && pwrRank.map(o => o.owner.display_name)
        }
    }

    return (
        <div>
            <Chart
                type="bar"
                options={options}
                series={series}
                width={500}
                height={500}
            />
        </div>
    )
}
