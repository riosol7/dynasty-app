const processTransactions = (transactions, players, owners) => {
    if (Array.isArray(transactions)) {
        const processedTransactions = [];

        for (const transaction of transactions) {
            const foundOwners = owners.filter(owner => transaction.roster_ids.includes(owner.roster_id));
            const foundCreator = foundOwners.find(owner => owner.user_id === transaction.creator);
            const foundPlayers = getPlayersData(transaction, players);

            processedTransactions.push({
                ...transaction,
                owners: foundOwners,
                creator: foundCreator?.display_name,
                players: foundPlayers,
            });
        }
        return processedTransactions;
    }
}

function getPlayersData(transaction, players) {
    const addedPlayerKeys = Object.keys(transaction.adds || {})
    const droppedPlayerKeys = Object.keys(transaction.drops || {})

    const addedPlayers = players.filter(player =>
        addedPlayerKeys.includes(player.player_id)
    );
    
    const droppedPlayers = players.filter(player =>
        droppedPlayerKeys.includes(player.player_id)
    );
    
    return { adds: addedPlayers, drops: droppedPlayers };
}

export default processTransactions;