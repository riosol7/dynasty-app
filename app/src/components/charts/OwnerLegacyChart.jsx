import React from 'react';
import Chart from 'react-apexcharts';

export default function AreaChart({
    id,
    processedRosters,
}) {
    const foundRoster = processedRosters?.totalRoster?.filter(r => r.roster_id === Number(id));

    let lineSeries = foundRoster.map(roster => {
        return {
            name:roster.owner.display_name,
            data:roster.owner ? roster.owner.team_rating.slice().map(data => data.value) : []
        }
    })
    let dates = foundRoster?.map(roster => roster.owner.team_rating.map(data => new Date(data.date).toLocaleDateString()))
    const series =  lineSeries !== undefined ? lineSeries : [{name:"", data:[]}]
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
            "#a9dfd8","#9733ee","#FF009C",
            "#f4ab6f","#a80077","#ff8008",
            "#fd1d1d","#00EFD1","#7573ff",
            "#c9d6ff","#24fe41",
            "#ffff1c"
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
            type: 'datetime',
            categories: dates !== undefined ? dates[0] : []
        },
        zoom: {
            enabled: false
        }
    }
    
    return (
        <div id="chart" className="">
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
