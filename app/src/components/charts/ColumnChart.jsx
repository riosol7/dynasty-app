import React from 'react'
import Chart from 'react-apexcharts';

export default function ColumnChart(props) {
    const loadRosters = props.loadRosters
    const rosters = props.rosters
    const roster = props.roster

    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }
    const avgQB = rosters.teamRank.map(team => roundToHundredth(team.kct.qb.players.reduce((a,b) => a + Number(b.age), 0)/ team.kct.qb.players.length)).reduce((a,b) => a + b,0)/rosters.teamRank.length
    const avgRB = rosters.teamRank.map(team => roundToHundredth(team.kct.rb.players.reduce((a,b) => a + Number(b.age), 0)/ team.kct.rb.players.length)).reduce((a,b) => a + b,0)/rosters.teamRank.length
    const avgWR = rosters.teamRank.map(team => roundToHundredth(team.kct.wr.players.reduce((a,b) => a + Number(b.age), 0)/ team.kct.wr.players.length)).reduce((a,b) => a + b,0)/rosters.teamRank.length
    const avgTE = rosters.teamRank.map(team => roundToHundredth(team.kct.te.players.reduce((a,b) => a + Number(b.age), 0)/ team.kct.te.players.length)).reduce((a,b) => a + b,0)/rosters.teamRank.length

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
