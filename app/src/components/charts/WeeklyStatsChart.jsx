import React from "react";
import Chart from "react-apexcharts";

export default function WeeklyStatsChart({
    id,
    foundHistory,
    foundRoster,
    weeklyMatch,
}) {

    const seasonMatchups = Number(weeklyMatch) > 2020 ? foundHistory(id, weeklyMatch).matchups.slice(0,14) : foundHistory(id, weeklyMatch).matchups.slice(0,13);
    const series = [
        {
            name:foundRoster.owner.display_name,
            data: seasonMatchups.map(m => m.filter(t => t.roster_id === Number(id)).map(s => s.points)[0])
        },
        {
            name:"Points Against",
            data: seasonMatchups.map(m => m.filter(t => t.roster_id !== Number(id)).map(s => s.points)[0])
        },
        {
            name:"League Average",
            data:foundHistory(id, weeklyMatch).regularSeason.leagueAvgPts
        },
    ];   
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
    };
    return (
        <Chart
            options={options} 
            series={series} 
            type="line" 
            height={350}
            width={"100%"} 
        />
    )
}
