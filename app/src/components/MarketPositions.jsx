import React from 'react';
import PositionChart from './charts/PositionChart';

export default function MarketPositions({
    rbWaiver,
    roundToHundredth,
    qbWaiver,
    teWaiver,
    waiverBidsDefault,
    wrWaiver,
}) {
    const positionNames = ["QB", "RB", "WR", "TE"];

    function findLowestBid(waiverData) {
        return waiverData?.sort((a, b) => a.settings.waiver_bid - b.settings.waiver_bid)[0]?.settings?.waiver_bid;
    }

    function findHighestBid(waiverData) {
        return waiverData?.sort((a, b) => b.settings.waiver_bid - a.settings.waiver_bid)[0]?.settings?.waiver_bid;
    }

    function findMostRecentWaivers(waiverData) {
        return waiverData?.sort((a, b) => b.created - a.created);
    }

    function calculatePercentageChange(newValue, ogValue) {
        if (ogValue === undefined || typeof newValue !== 'number' || typeof ogValue !== 'number' || ogValue === 0) {
            return 0;
        }
        return ((newValue - ogValue) / ogValue) * 100;
    }

    function findTopSpender(positionWaiver) {
        if (positionWaiver !== undefined) {
            return Object.entries(
                positionWaiver.reduce((acc, team) => {
                    acc[team.creator] = acc[team.creator] || [];
                    acc[team.creator].push(team);
                    return acc;
                }, Object.create(null))
            ).map((o) => {
                return {
                    owner: o[0],
                    pts: o[1].reduce((a, b) => a + b.settings.waiver_bid, 0),
                };
            }).sort((a, b) => b.pts - a.pts)[0];
        }
    }

    return (
        <div className="py-3">
            <div className="d-flex align-item-center bold pb-3" style={{ fontSize: ".7rem", color: "#7d91a6", borderBottom: "3px solid #2a2c3e" }}>
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
        <div>
            {positionNames.map((position, i) => (
                <div key={i} style={{ border: "#2a2c3e", fontSize: "14px", color: "white", borderBottom: i === positionNames.length - 1 ? "" : "1px solid #2a2c3e" }} className="py-3 d-flex align-items-center">
                    <div className="col-sm-1">
                        <div style={{
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            textAlign: "center",
                            alignItems: "center",
                            borderRadius: "12px",
                        }} className={ position === "QB" ? "box1" : position === "RB" ? "box2" : position === "WR" ? "box3" : position === "TE" ? "box4" : <></>}>
                            <p className="m-0 bold" style={{ color: "white", width: "100%" }}>{position}</p>
                        </div>
                    </div>
                    {/* TREND */}
                    <div className="d-flex align-items-center col-sm-3">
                        <PositionChart waiverBidsDefault={waiverBidsDefault} position={position} roundToHundredth={roundToHundredth} />
                    </div>
                    {/* LAST PRICE */}
                    <div className="col-sm-1">
                        {findMostRecentWaivers(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver)?.[0]?.settings?.waiver_bid}
                    </div>
                    {/* % CHANGE */}
                    <div className="col-sm-1">
                        {findMostRecentWaivers(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver)?.[0] &&
                        findMostRecentWaivers(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver)?.[1] ? (
                            <p className="m-0" style={{color: Number(roundToHundredth(calculatePercentageChange(
                                    findMostRecentWaivers(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver)?.[0]?.settings?.waiver_bid,
                                    findMostRecentWaivers(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver)?.[1]?.settings?.waiver_bid
                                ))) > 0 ? "#257c51" : "#e02117",}}>
                                { Number(roundToHundredth(calculatePercentageChange(
                                    findMostRecentWaivers(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver)?.[0]?.settings?.waiver_bid,
                                    findMostRecentWaivers(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver)?.[1]?.settings?.waiver_bid
                                ))) > 0? "+": ""}
                                { roundToHundredth(calculatePercentageChange(
                                    findMostRecentWaivers(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver)?.[0]?.settings?.waiver_bid,
                                    findMostRecentWaivers(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver)?.[1]?.settings?.waiver_bid
                                ))} %
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                    {/* AVG */}
                    <div className="col-sm-1">
                        {position === "QB" ? roundToHundredth(qbWaiver && qbWaiver.reduce((r, c) => r + Number(c.settings.waiver_bid), 0) / qbWaiver.length)
                        : position === "RB"? roundToHundredth(rbWaiver && rbWaiver.reduce((r, c) => r + Number(c.settings.waiver_bid), 0) / rbWaiver.length)
                        : position === "WR"? roundToHundredth(wrWaiver && wrWaiver.reduce((r, c) => r + Number(c.settings.waiver_bid), 0) / wrWaiver.length)
                        : position === "TE"? roundToHundredth(teWaiver && teWaiver.reduce((r, c) => r + Number(c.settings.waiver_bid), 0) / teWaiver.length)
                        : <></>}
                    </div>
                    {/* LOW */}
                    <div className="col-sm-1">
                        {position === "QB" ? findLowestBid(qbWaiver) : position === "RB" ? findLowestBid(rbWaiver) : position === "WR" ? findLowestBid(wrWaiver) : findLowestBid(teWaiver)}
                    </div>
                    {/* HIGH */}
                    <div className="col-sm-1">
                        {position === "QB" ? findHighestBid(qbWaiver) : position === "RB" ? findHighestBid(rbWaiver) : position === "WR" ? findHighestBid(wrWaiver) : findHighestBid(teWaiver)}
                    </div>
                    {/* TRANSACTIONS */}
                    <div className="col-sm-1">
                        {position === "QB" ? qbWaiver && qbWaiver.length : position === "RB" ? rbWaiver && rbWaiver.length : position === "WR" ? wrWaiver && wrWaiver.length : teWaiver && teWaiver.length}
                    </div>
                    {/* TOP SPENDER */}
                    <div className="col-sm-2">
                        {findTopSpender(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver) && (
                            <p className="m-0">
                                {findTopSpender(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver).owner} (
                                {findTopSpender(position === "QB" ? qbWaiver : position === "RB" ? rbWaiver : position === "WR" ? wrWaiver : teWaiver).pts})
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}