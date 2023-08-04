import React from 'react';
import Chart from 'react-apexcharts';

export default function BarChart(props) {
    const pwrRank=props.pwrRank
    const lineupEfficiency=props.lineupEfficiency
    const series= [{
        name: "Actual",
        data: pwrRank && pwrRank.map(t=>{
            return{
                x:t.owner.display_name,
                y:Number(t.settings.fpts + "." + t.settings.fpts_decimal),
                goals:[
                    {
                        name:"Expected",
                        value:Number(t.settings.ppts + "." + t.settings.ppts_decimal),
                        strokeHeight:5,
                        strokeColor:'#F3F2FC'
                    },
                    {
                        name:"Lineup Efficiency",
                        value:lineupEfficiency(Number(t.settings.fpts + "." + t.settings.fpts_decimal),Number(t.settings.ppts + "." + t.settings.ppts_decimal)),
                        strokeColor:"#ff",
                        strokeHeight:0
                    }
                ],
            }
        })
      }]
    var options = {
        chart: {
          type: 'bar',
          stacked: false,
          foreColor: '#c9cfd1',
          background:"inherit",
          toolbar:{
            show:false
          }
        },
        dataLabels:{
          enabled:false
        },
        plotOptions: {
          bar: {
            horizontal:false,
            dataLabels: {
              enabled: false
            },
            columnWidth: '42%',
            barHeight:'50%',
            endingShape: 'rounded'
          }
        },
        colors: ["#a9dfd8",'#F3F2FC'],
        xaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            show: false
          },
          labels: {
            show: false,
            style: {
              fontSize: '14px'
            }
          },
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
        yaxis: {
          axisBorder: {
            show: false
          },
          labels: {
            show: true
          },
        },
        theme: {
            mode: 'dark', 
        },
        tooltip: {
          shared: false,
          intersect: false
        }
      
    }
    return (
        <div>
            <Chart
              type='bar'
              series={series}
              options={options}   
              width={"100%"}
              height={250}
            />
        </div>
    )
}
