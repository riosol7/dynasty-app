import findOwner from "./owner/findOwner";
import findPlayer from "./player/findPlayer";

const processWaiverBids = (transactions, owners, players, current) => {
    if (!owners || owners.length < 1) {
        return [];
    }
    if (!current) {
        return (
            // transactions is league.history //
            transactions &&
            players &&
            owners &&
            owners.length > 1 &&
            transactions.map((history) => {
                const transactions = history.transactions.filter((t) =>
                    t.settings &&
                    t.settings.waiver_bid &&
                    t.settings.waiver_bid !== null &&
                    t.status === "complete"
                );
                return transactions.map((t) => {
                    const creator = findOwner(t.creator, owners, "uID");
                    const player = findPlayer(Object.keys(t.adds)[0], players);
                    return { ...t, creator: creator?.display_name || "", player };
                });
            }).flat()
        );
    } else {
        return (
            transactions &&
            transactions.filter((t) =>
                t.settings &&
                t.settings.waiver_bid &&
                t.settings.waiver_bid !== null &&
                t.status === "complete"
            ).map((t) => {
                const creator = findOwner(t.creator, owners, "uID");
                const player = findPlayer(Object.keys(t.adds)[0], players);
                return { ...t, creator: creator?.display_name || "", player };
            })
        );
    }
};

export default processWaiverBids