export const getSortedRecords = (records, sort, asc, currentPage, recordsPerPage) => {
    const lastIdx = currentPage * recordsPerPage;
    const firstIdx = lastIdx - recordsPerPage;

    return records.slice(0).sort((a, b) => {
        switch (sort) {
            case "DATE":
                return (asc ? a.created - b.created : b.created - a.created);
            case "BID":
                return (asc ? a.settings.waiver_bid - b.settings.waiver_bid : b.settings.waiver_bid - a.settings.waiver_bid);
            case "AGE":
                return (asc ? a.player.age - b.player.age : b.player.age - a.player.age);
            case "PLAYER":
                const nameA = a.player.full_name.toUpperCase();
                const nameB = b.player.full_name.toUpperCase();
                return (asc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA));
            default:
                return 0;
        }
    }).slice(firstIdx, lastIdx);
}