import React from 'react';
import Chart from 'react-apexcharts';

export default function LineChart(props) {
    const id=props.id
    // const loadRosters=props.loadRosters
    // const rosters=props.rosters
    const weeklyMatch=props.weeklyMatch
    const foundHistory=props.foundHistory
    const findRosterByID=props.findRosterByID
    let lineSeriesC = [
        {
            name:findRosterByID(id).owner.display_name,
            data:foundHistory(id).c.matchups.map(m => m.filter(t => t.roster_id === Number(id)).map(s => s.points)[0])
        },
        {
            name:"Points Against",
            data:foundHistory(id).c.matchups.map(m => m.filter(t => t.roster_id !== Number(id)).map(s => s.points)[0])
        },
        {
            name:"League Average",
            data:foundHistory(id).c.leagueAvgPts
        },
    ]
    let lineSeriesS = [
        {
            name:findRosterByID(id).owner.display_name,
            data:foundHistory(id,weeklyMatch).s.matchups.map(m => m.filter(t => t.roster_id === Number(id)).map(s => s.points)[0])
        },
        {
            name:"Points Against",
            data:foundHistory(id,weeklyMatch).s.matchups.map(m => m.filter(t => t.roster_id !== Number(id)).map(s => s.points)[0])
        },
        {
            name:"League Average",
            data:foundHistory(id,weeklyMatch).s.leagueAvgPts
        },
    ]
    let seriesConditional = lineSeriesS[0].data.length>0? lineSeriesS : lineSeriesC[0].data.length>0?lineSeriesC:[]
    // let lineSeries = foundHistory(id,selectSzn) && foundHistory(id,selectSzn).s.matchups.map(m => m.filter(t => t.roster_id === Number(id)).map(s => {
    //     return {
    //         name:findRosterByID(id).owner.display_name,
    //         data:s.points
    //     }
    // }))
    // let lineSeries = rosters.totalRoster && rosters.totalRoster.filter(r => r.roster_id === Number(id)).map(roster => {
    //     return {
    //         name:roster.owner.display_name,
    //         data:roster.owner ? roster.owner.dynasty.slice().map(data => data.value) : []
    //     }
    // })
    // let dates = rosters.totalRoster && rosters.totalRoster.filter(r => r.roster_id === Number(id)).map(roster => roster.owner.dynasty.map(data => new Date(data.date).toLocaleDateString()))
    const series = seriesConditional
    const options = {
        chart: {
            animations: {
                enabled: false,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            background: 'inherit',
            dropShadow: {
                enabled: true,
                top: 5,
                left: 7,
                blur: 5,
                opacity: 1,
            },
            foreColor: '#fff',
            toolbar: {
                show: false
            },
            type: 'line',
            stacked: false,
        },
        colors:[
            "#a9dfd8","#bda9df","#dab0af"
        ],
        dataLabels: {
            enabled: false
        },
        // fill: {
        //     type: 'gradient',
        //     gradient: {
        //         gradientToColors: [
        //             "#5ec8d7","#f09819","#00c6ff",
        //             "#7a2828","#00ACEA","#ff7e5f",
        //             "#757f9a","#FFB612","#d38312",
        //             "#D3BC8D","#89216b","#FFC20E"
        //             ],
        //         shadeIntensity: .9,
        //         stops:[0,100]

        //     }
        // },
        grid: {
            show: false,
            padding: {
              bottom: 0
            }
          },
        legend:{
            show:false
        },
        markers: {
            size: 0,
            strokeWidth: 3,
            hover: {
                size: 4
            }
        },
        stroke: {
            curve: 'smooth',
            width: 4
        },
        theme: {
            mode: 'dark', 
        },
        // title:{
        //     text:"Dynasty Growth",
        //     align:"left"
        // },
        tooltip: {
            x: {
                format: 'MM/dd/yy'
            },
        },
        xaxis: { 
            type: 'category',
            categories:Number(weeklyMatch) > 2020? [1,2,3,4,5,6,7,8,9,10,11,12,13,14]:[1,2,3,4,5,6,7,8,9,10,11,12,13]
            // categories: dates !== undefined ? dates[0] : []
        },
        zoom: {
            enabled: false
        }
    }
    return (
        <div>
            <Chart
                options={options} 
                series={series} 
                type="line" 
                height={350}
                width={"100%"} 
            />
        </div>
    )
}
