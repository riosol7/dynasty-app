import React, {useState} from 'react';
import Transaction from './Transaction';
import { Icon } from '@iconify/react';

const TAG_STYLE = {
    borderRadius:"25px",
    background:"black",
    border:"2px solid #111111",
    paddingInline:"12px",
    paddingTop:"6px",
    paddingBottom:"6px",
    display:"flex",
    alignItems:"center",
    fontSize:"1em"
}

export default function LeagueActivity({
    activityBar,
    league,
    loadLeague,
    loadTransactions,
    owners,
    players,
    setActivityBar,
    toDateTime,
    transactions,
}) {

    const [filterBtn, setFilterBtn] = useState(false)
    const [sortBtn, setSortBtn] = useState(false)

    const handleFilterBtn = () => {
        if(sortBtn === true){
            setSortBtn(false)
            setFilterBtn(!filterBtn)
        } else {
            setFilterBtn(!filterBtn)
        }
    }
    const handleSortBtn = () => {
        if(filterBtn === true){
            setFilterBtn(false)
            setSortBtn(!sortBtn)
        } else {
            setSortBtn(!sortBtn)
        }
    }

  return (
    <div className="col">
        <div className="pt-2">
            <div className="mt-4">
                <div className="d-flex justify-content-between align-items-top px-3">
                    <div className="d-flex align-items-center">
                        <Icon icon="fe:activity" style={{color:"#a9dfd8",fontSize:"1.5rem"}}/>
                        <p className="m-0 mx-1 bold" style={{}}>League Activity</p>
                    </div>
                    <div className="">
                        <Icon icon="octicon:x-circle-fill-24" style={{fontSize:"1em", color:"#f25b57"}}onClick={() => setActivityBar(!activityBar)}/>
                        {/* <Icon icon="akar-icons:more-horizontal" style={{fontSize:"1.5rem", color:"#b0b0b2"}}/> */}
                    </div>
                </div>
                <div className="mt-4 d-flex align-items-center flex-wrap" style={{fontSize:"14px"}}>
                    <div className="col d-flex align-items-center  justify-content-center" onClick={() => handleFilterBtn()} style={ 
                        filterBtn === true ? {
                            background:"#111111",
                            border:"1px solid #111111",
                            paddingTop:"8px",
                            paddingBottom:"8px",
                        } : {
                            background:"black",
                            border:"1px solid #111111",
                            paddingTop:"8px",
                            paddingBottom:"8px",
                    }}>
                        <Icon icon="material-symbols:filter-list-rounded" style={{marginRight:"4px", color:"#a9dfd8"}}/>
                        <p className="m-0">Filter</p>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center" onClick={() => handleSortBtn()} style={
                        sortBtn === true ? {
                            background:"#111111",
                            border:"1px solid #111111",
                            paddingTop:"8px",
                            paddingBottom:"8px",
                        } : {
                            background:"black",
                            border:"1px solid #111111",
                            paddingTop:"8px",
                            paddingBottom:"8px",
                    }}>
                        <Icon icon="uil:sort" style={{marginRight:"4px", color:"#a9dfd8"}}/>
                        <p className="m-0">Sort by</p>
                    </div>
                </div>
                <div style={{fontSize:"13px"}}>
                    {
                        filterBtn === true ?
                            <div className="py-2 pb-3" style={{zIndex:"5", position:"absolute", background:"#111111", width:"100%"}}>
                                <div className="d-flex align-items-center flex-wrap">
                                    {/* <Icon icon="ic:round-keyboard-arrow-left" style={{fontSize:"24px"}}/> */}
                                    <div className="m-1" style={TAG_STYLE}>
                                        <Icon icon="ri:exchange-line" style={{color:"#a9dfd8", marginRight:"4px", fontSize:"18px"}}/>
                                        <p className="m-0">Trades</p>
                                    </div>
                                    <div className="m-1"  style={TAG_STYLE}>
                                        <Icon icon="material-symbols:edit-document-rounded" style={{color:"#a9dfd8", marginRight:"4px", fontSize:"18px"}}/>
                                        <p className="m-0">Waivers</p>
                                    </div>
                                    <div className="m-1" style={TAG_STYLE}>
                                        <Icon icon="ph:user-circle-plus-fill" style={{color:"#a9dfd8", marginRight:"4px", fontSize:"18px"}}/>
                                        <p className="m-0">Adds</p>
                                    </div>
                                    <div className="m-1" style={TAG_STYLE}>
                                        <Icon icon="ph:user-circle-minus-fill" style={{color:"#a9dfd8", marginRight:"4px", fontSize:"18px"}}/>
                                        <p className="m-0">Drops</p>
                                    </div>
                                    {/* <Icon icon="ic:round-keyboard-arrow-right" style={{fontSize:"24px"}}/> */}
                                </div>
                                <div className="my-3 d-flex justify-content-between">
                                {
                                    loadLeague ? <p className="m-0">Loading</p>:
                                        <div className="mx-2">
                                            <select className="text-center py-2" style={{borderRadius:"6px 0px 0px 6px", border:"0px solid #3bdbba", background:"black", color:"white", paddingInline:"1.87em"}}>
                                                <option>All owners</option>
                                                {
                                                    league.owners.map((owner, i) => 
                                                        <option key={i}>
                                                            {owner.display_name}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                            <select className="text-center py-2" style={{borderRadius:"0px 6px 6px 0px", border:"0px solid #3bdbba", background:"black", color:"white", paddingInline:"1em"}}>
                                                <option>{league.season}</option>
                                                {
                                                    league.history.map((l, i) => 
                                                        <option key={i}>{l.year}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                }
                                </div>
                                <div className="d-flex justify-content-center text-center">
                                    <p className="m-0 p-2" style={{width:"230px",border:"none", background:"#a9dfd8", borderRadius:"4px", color:"black"}}>Show {} results</p>
                                </div>
                            </div>
                        : sortBtn === true ?
                            <div className="px-2" style={{width:"100%",zIndex:"5", position:"absolute", background:"#111111"}}>
                                <div className="my-4 d-flex justify-content-between">
                                    <label>Most Recent</label>
                                    <input type="radio" checked="checked" style={{color:"red"}}/>
                                </div>
                                <div className="my-4 d-flex justify-content-between">
                                    <label>Oldest</label>
                                    <input type="radio"/>
                                </div>
                            </div>
                        : <></>
                    }
                </div>
            </div>
            <div id="leftScrollBar" style={{height:"850px", maxWidth:"100%", overflow:"auto", direction:"rtl"}}>
                <div>
                    <Transaction
                        loadTransactions={loadTransactions}
                        owners={owners}
                        players={players}
                        toDateTime={toDateTime}
                        transactions={transactions}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
