import React from "react";
import { Icon } from "@iconify/react";
import MarketPositions from "../components/market/MarketPositions";
import MarketActivity from "../components/market/MarketActivity";

export default function MarketUI({
    asc,
    currentPage,
    findLogo,
    handleOwner,
    handlePosition,
    handleShowPage,
    handleSort,
    league,
    nextPage,
    owner,
    pageNumbers,
    paginate,
    position,
    prevPage,
    qbWaiver,
    records,
    recordsPerPage,
    rbWaiver,
    roundToHundredth,
    setAsc,
    sort,
    teWaiver,
    toDateTime,
    waiverBids,
    waiverBidsDefault,
    wrWaiver,
}) {
  
    return (
        <div className="my-5">
            <div className="d-flex align-items-center justify-content-between py-2">
                <div className="d-flex align-items-center">
                    <Icon icon="ant-design:stock-outlined" style={{color:"#a9dfd8", fontSize:"1.1rem"}}/>
                    <p className="m-0 bold mx-1">Market</p>
                </div>
                <div id="LA" className="p-2">
                    <Icon icon="material-symbols:arrow-right-alt-rounded" style={{fontSize:"1.5rem",color:"#cbcbcb"}}/>
                </div>
            </div>
            <MarketPositions
                waiverBidsDefault={waiverBidsDefault}
                roundToHundredth={roundToHundredth}
                qbWaiver={qbWaiver}
                rbWaiver={rbWaiver}
                wrWaiver={wrWaiver}
                teWaiver={teWaiver}
            />
            <MarketActivity
                asc={asc}
                currentPage={currentPage}
                findLogo={findLogo}
                handleOwner={handleOwner}
                handlePosition={handlePosition}
                handleShowPage={handleShowPage}
                handleSort={handleSort}
                league={league}
                nextPage={nextPage}
                owner={owner}
                pageNumbers={pageNumbers}
                paginate={paginate}
                position={position}
                prevPage={prevPage}
                records={records}
                recordsPerPage={recordsPerPage}
                setAsc={setAsc}
                sort={sort}
                toDateTime={toDateTime}
                waiverBids={waiverBids}
            />
        </div>
    )
}