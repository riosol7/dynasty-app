import React from "react";
import Chart from "react-apexcharts";

export default function DynastyRadarInsights({
    loadRosters,
    processedRosters,
    roster,
    roundToHundredth,
    
}) {
    const teamRankRosters = processedRosters.teamRank;

    const leagueAvgQBs = roundToHundredth(teamRankRosters.reduce((a,b) => a + b.kct.qb.total, 0) / teamRankRosters.length)
    const leagueAvgRBs = roundToHundredth(teamRankRosters.reduce((a,b) => a + b.kct.rb.total, 0) / teamRankRosters.length)
    const leagueAvgWRs = roundToHundredth(teamRankRosters.reduce((a,b) => a + b.kct.wr.total, 0) / teamRankRosters.length)
    const leagueAvgTEs = roundToHundredth(teamRankRosters.reduce((a,b) => a + b.kct.te.total, 0) / teamRankRosters.length)
    
    const series = [{
        name: roster.kct.owner.display_name,
        data:[roster.kct.qb.total, roster.kct.rb.total, roster.kct.wr.total, roster.kct.te.total, 0],
    },
    {
        name:"League Average",
        data:[leagueAvgQBs,leagueAvgRBs,leagueAvgWRs,leagueAvgTEs, 0]
    }
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
                  return val + " value"
                },
            },
        },
        xaxis: {
            categories: ['QB', 'RB', 'WR', 'TE', 'Picks']
        }
    };

    return (
        <>
        {
            loadRosters ? <p>Loading </p> :
            <div className="">
                <Chart 
                    type='radar'
                    series={series}
                    options={options}   
                    width={320}
                    height={300}
                />
            </div>
        }
        </>
    )
}
