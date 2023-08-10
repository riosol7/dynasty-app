import React from "react";
import Chart from "react-apexcharts";

export default function DynastyAgeBarChart({
    loadRosters,
    processedRosters,
    roster,
}) {
    const teamRankRosters = processedRosters.teamRank;
    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }
    const avgQB = teamRankRosters.map(team => roundToHundredth(team.kct.qb.players.reduce((a,b) => a + Number(b.age), 0)/ team.kct.qb.players.length)).reduce((a,b) => a + b,0)/teamRankRosters.length
    const avgRB = teamRankRosters.map(team => roundToHundredth(team.kct.rb.players.reduce((a,b) => a + Number(b.age), 0)/ team.kct.rb.players.length)).reduce((a,b) => a + b,0)/teamRankRosters.length
    const avgWR = teamRankRosters.map(team => roundToHundredth(team.kct.wr.players.reduce((a,b) => a + Number(b.age), 0)/ team.kct.wr.players.length)).reduce((a,b) => a + b,0)/teamRankRosters.length
    const avgTE = teamRankRosters.map(team => roundToHundredth(team.kct.te.players.reduce((a,b) => a + Number(b.age), 0)/ team.kct.te.players.length)).reduce((a,b) => a + b,0)/teamRankRosters.length

    const series = [{
        name:roster.kct.owner.display_name,
        data:[roundToHundredth(roundToHundredth(
            roundToHundredth(roster.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.qb.players.length) +
            roundToHundredth(roster.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.rb.players.length) +
            roundToHundredth(roster.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.wr.players.length) +
            roundToHundredth(roster.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.te.players.length))/4), 
            roundToHundredth(roster.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.qb.players.length),
            roundToHundredth(roster.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.rb.players.length),
            roundToHundredth(roster.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.wr.players.length),
            roundToHundredth(roster.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ roster.kct.te.players.length)
        ]
    },{
        name:"League Average", 
        data: [roundToHundredth((avgQB + avgRB + avgWR + avgTE)/4),
            roundToHundredth(avgQB),
            roundToHundredth(avgRB), 
            roundToHundredth(avgWR), 
            roundToHundredth(avgTE)
        ]
    }
    ]
    var options = {
        chart: {
            type: 'bar',
            foreColor: '#fff',
            toolbar: {
                show: false
            },
            dropShadow: {
                enabled: true,
                top: 5,
                left: 7,
                blur: 5,
                opacity: 1,
            },
        },
        colors: ["#a9dfd8","#fccccb"],
        dataLabels: {
            enabled: false
        },
        // dropShadow: {
        //     enabled: true,
        //     enabledOnSeries: undefined,
        //     top: 3,
        //     left: 3,
        //     blur: 3,
        //     color: '#a9dfd8',
        //     opacity: 1
        // },
        fill: {
            opacity: .8
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
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: '50%',
                barHeight:'50%',
                endingShape: 'rounded'
            },
        },
        stroke: {
            show: true,
            width: 6,
            colors: ['transparent']
        },
        tooltip: {
            theme:"dark",
            y:{
                formatter: function (val) {
                  return val + " years"
                },
            },
        },
        xaxis: {
            categories: ["All","QB","RB","WR","TE"]
        },
        yaxis: {
            title: {
                text: ""
            },
        },
    };

    return (
        <>
        {
            loadRosters ? <p>Loading </p> :
            <div className="">
                <Chart 
                    type='bar'
                    series={series}
                    options={options}   
                    width={300}
                    height={300}
                />
            </div>
        }
        </>
    )
}
