export const filterWaiverBidsByPosition = (bids, selectedPosition) => {
    return bids.filter(bid => bid?.player?.position === selectedPosition);
};