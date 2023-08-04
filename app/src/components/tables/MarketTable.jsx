import React from 'react'
import PositionChart from '../charts/PositionChart'

export default function MarketTable(props) {
    const waiverBidsDefault=props.waiverBidsDefault
    const roundToHundredth=props.roundToHundredth
    const qbWaiver=props.qbWaiver
    const rbWaiver=props.rbWaiver
    const wrWaiver=props.wrWaiver
    const teWaiver=props.teWaiver
    const positions=["QB","RB","WR","TE"]

    const qbLOW=qbWaiver&&qbWaiver.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid)[0]&&qbWaiver.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid)[0].settings.waiver_bid
    const rbLOW=rbWaiver&&rbWaiver.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid)[0]&&rbWaiver.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid)[0].settings.waiver_bid
    const wrLOW=wrWaiver&&wrWaiver.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid)[0]&&wrWaiver.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid)[0].settings.waiver_bid
    const teLOW=teWaiver&&teWaiver.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid)[0]&&teWaiver.sort((a,b)=>a.settings.waiver_bid-b.settings.waiver_bid)[0].settings.waiver_bid

    const qbHIGH=qbWaiver&&qbWaiver.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid)[0]&&qbWaiver.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid)[0].settings.waiver_bid                                        
    const rbHIGH=rbWaiver&&rbWaiver.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid)[0]&&rbWaiver.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid)[0].settings.waiver_bid
    const wrHIGH=wrWaiver&&wrWaiver.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid)[0]&&wrWaiver.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid)[0].settings.waiver_bid
    const teHIGH=teWaiver&&teWaiver.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid)[0]&&teWaiver.sort((a,b)=>b.settings.waiver_bid-a.settings.waiver_bid)[0].settings.waiver_bid

    const qbRECENT=qbWaiver&&qbWaiver.sort((a,b)=>b.created-a.created)
    const rbRECENT=rbWaiver&&rbWaiver.sort((a,b)=>b.created-a.created)
    const wrRECENT=wrWaiver&&wrWaiver.sort((a,b)=>b.created-a.created)
    const teRECENT=teWaiver&&teWaiver.sort((a,b)=>b.created-a.created)

    function percentageChange(newValue,ogValue){
        return ((newValue-ogValue)/ogValue)*100
    }


    function findTopSpender(positionWaiver){
        if(positionWaiver !== undefined){
            return Object.entries(positionWaiver&&positionWaiver.reduce((acc,team) => {
                acc[team.creator] = acc[team.creator] || [];
                acc[team.creator].push(team);
                return acc;
            }, Object.create(null))).map(o=> { 
                return {
                    owner:o[0],
                    pts:o[1].reduce((a,b)=>a +b.settings.waiver_bid,0)
                }
            }).sort((a,b) => b.pts-a.pts)[0]
        }
    }


    return (
        <div>
            <div className="">
                <div>
                    <div className="d-flex align-item-center bold pb-3" style={{fontSize:".7rem", color:"#7d91a6",borderBottom:"3px solid #2a2c3e"}}>
                        <div className="col-sm-1">POSITION</div>
                        <div className="col-sm-3">TREND</div>
                        <div className="col-sm-1">LAST PRICE</div>
                        <div className="col-sm-1">CHANGE %</div>
                        <div className="col-sm-1">AVG</div>
                        <div className="col-sm-1">LOW</div>
                        <div className="col-sm-1">HIGH</div>
                        <div className="col-sm-1">TRANSACTION</div>
                        <div className="col-sm-2">TOP SPENDER</div>
                    </div>
                </div>
                <div>
                    {
                        positions.map((p,i)=>
                            <div key={i} style={{border:"#2a2c3e", fontSize:"14px",color:"white",borderBottom:i===positions.length-1?"":"1px solid #2a2c3e"}} className="py-3 d-flex align-items-center">
                                <div className='col-sm-1'>
                                    <div style={{
                                        width:"40px", 
                                        height:"40px",
                                        display:"flex",
                                        textAlign:"center",
                                        alignItems:"center",
                                        borderRadius:"12px",
                                    }} className={
                                        p==="QB"?
                                            "box1"
                                        :p==="RB"?
                                            "box2"
                                        :p==="WR"?
                                            "box3"
                                        :p==="TE"?
                                            "box4"
                                        :<></>
                                    }>
                                        <p className="m-0 bold" style={{color:"white",width:"100%"}}>{p}</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center col-sm-3'>
                                    <PositionChart waiverBidsDefault={waiverBidsDefault} position={p} roundToHundredth={roundToHundredth}/>
                                </div>
                                <div className="col-sm-1">
                                    {
                                        p==="QB"?
                                            qbRECENT&&qbRECENT[0]?
                                                <p className='m-0 col-sm-4'>{qbRECENT[0].settings.waiver_bid}</p>
                                            :<></>
                                        :p==="RB"?
                                            rbRECENT&&rbRECENT[0]?
                                                <p className='m-0 col-sm-4'>{rbRECENT[0].settings.waiver_bid}</p>
                                            :<></>
                                        :p==="WR"?
                                            wrRECENT&&wrRECENT[0]?
                                                <p className='m-0 col-sm-4'>{wrRECENT[0].settings.waiver_bid}</p>
                                            :<></>
                                        :p==="TE"?
                                            teRECENT&&teRECENT[0]?
                                                <p className='m-0 col-sm-4'>{teRECENT[0].settings.waiver_bid}</p>
                                            :<></>
                                        :<></>
                                    }
                                </div>
                                <div className="col-sm-1">
                                    {
                                        p==="QB"?
                                            qbRECENT&&qbRECENT[0]&&qbRECENT[1]?
                                                <p className='m-0' style={{color:
                                                    Number(roundToHundredth(percentageChange(qbRECENT[0].settings.waiver_bid,qbRECENT[1].settings.waiver_bid)))>0?
                                                    "#257c51":"#e02117"}}>
                                                        {
                                                            Number(roundToHundredth(percentageChange(qbRECENT[0].settings.waiver_bid,qbRECENT[1].settings.waiver_bid)))>0?
                                                                "+":""
                                                        }
                                                        {roundToHundredth(percentageChange(qbRECENT[0].settings.waiver_bid,qbRECENT[1].settings.waiver_bid))}%
                                                </p>
                                            :<></>
                                        :p==="RB"?
                                            rbRECENT&&rbRECENT[0]&&rbRECENT[1]?
                                                <p className='m-0' style={{color:
                                                    Number(roundToHundredth(percentageChange(rbRECENT[0].settings.waiver_bid,rbRECENT[1].settings.waiver_bid)))>0?
                                                    "#257c51":"#e02117"}}>
                                                        {
                                                            Number(roundToHundredth(percentageChange(rbRECENT[0].settings.waiver_bid,rbRECENT[1].settings.waiver_bid)))>0?
                                                                "+":""
                                                        }
                                                        {roundToHundredth(percentageChange(rbRECENT[0].settings.waiver_bid,rbRECENT[1].settings.waiver_bid))}%
                                                </p>
                                            :<></>
                                        :p==="WR"?
                                            wrRECENT&&wrRECENT[0]&&wrRECENT[1]?
                                                <p className='m-0' style={{color:
                                                    Number(roundToHundredth(percentageChange(wrRECENT[0].settings.waiver_bid,wrRECENT[1].settings.waiver_bid)))>0?
                                                    "#257c51":"#e02117"}}>
                                                        {
                                                            Number(roundToHundredth(percentageChange(wrRECENT[0].settings.waiver_bid,wrRECENT[1].settings.waiver_bid)))>0?
                                                                "+":""
                                                        }
                                                        {roundToHundredth(percentageChange(wrRECENT[0].settings.waiver_bid,wrRECENT[1].settings.waiver_bid))}%
                                                </p>
                                            :<></>
                                        :p==="TE"?
                                            teRECENT&&teRECENT[0]&&teRECENT[1]?
                                                <p className='m-0' style={{color:
                                                    Number(roundToHundredth(percentageChange(teRECENT[0].settings.waiver_bid,teRECENT[1].settings.waiver_bid)))>0?
                                                    "#257c51":"#e02117"}}>
                                                        {
                                                            Number(roundToHundredth(percentageChange(teRECENT[0].settings.waiver_bid,teRECENT[1].settings.waiver_bid)))>0?
                                                                "+":""
                                                        }
                                                        {roundToHundredth(percentageChange(teRECENT[0].settings.waiver_bid,teRECENT[1].settings.waiver_bid))}%
                                                </p>
                                            :<></>
                                        :<></>
                                    }
                                </div>
                                <div className="col-sm-1">
                                    {
                                        p==="QB"?
                                            roundToHundredth(qbWaiver&&qbWaiver.reduce((r,c) => r + Number(c.settings.waiver_bid), 0)/qbWaiver.length)                                        
                                        :p==="RB"?
                                            roundToHundredth(rbWaiver&&rbWaiver.reduce((r,c) => r + Number(c.settings.waiver_bid), 0)/rbWaiver.length)                                        
                                        :p==="WR"?
                                            roundToHundredth(wrWaiver&&wrWaiver.reduce((r,c) => r + Number(c.settings.waiver_bid), 0)/wrWaiver.length)                                        
                                        :p==="TE"?
                                            roundToHundredth(teWaiver&&teWaiver.reduce((r,c) => r + Number(c.settings.waiver_bid), 0)/teWaiver.length)                                        
                                        :<></>
                                    }
                                </div>
                                <div className="col-sm-1">
                                    {
                                        p==="QB"?
                                            qbLOW                                            
                                        :p==="RB"?
                                            rbLOW
                                        :p==="WR"?
                                            wrLOW                                            
                                        :p==="TE"?
                                            teLOW
                                        :<></>
                                    }
                                </div>
                                <div className="col-sm-1">
                                    {
                                        p==="QB"?
                                            qbHIGH
                                        :p==="RB"?
                                            rbHIGH
                                        :p==="WR"?
                                            wrHIGH
                                        :p==="TE"?
                                            teHIGH
                                        :<></>
                                    }
                                </div>
                                <div className="col-sm-1">
                                    {
                                        p==="QB"?
                                            qbWaiver&&qbWaiver.length
                                        :p==="RB"?
                                            rbWaiver&&rbWaiver.length
                                        :p==="WR"?
                                            wrWaiver&&wrWaiver.length
                                        :p==="TE"?
                                            teWaiver&&teWaiver.length
                                        :<></>
                                    }
                                </div>
                                <div className="col-sm-2">
                                    {
                                        findTopSpender(qbWaiver)&&
                                        findTopSpender(rbWaiver)&&
                                        findTopSpender(wrWaiver)&&
                                        findTopSpender(teWaiver)?
                                            p==="QB"?
                                                <p className="m-0">{findTopSpender(qbWaiver).owner} ({findTopSpender(qbWaiver).pts})</p>
                                            :p==="RB"?
                                                <p className="m-0">{findTopSpender(rbWaiver).owner} ({findTopSpender(rbWaiver).pts})</p>
                                            :p==="WR"?
                                                <p className="m-0">{findTopSpender(wrWaiver).owner} ({findTopSpender(wrWaiver).pts})</p>
                                            :p==="TE"?
                                                <p className="m-0">{findTopSpender(teWaiver).owner} ({findTopSpender(teWaiver).pts})</p>
                                            :<></>
                                        :<></>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
