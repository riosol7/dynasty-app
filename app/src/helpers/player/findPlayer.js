const findPlayer = (id, players) => {
    let foundPlayer = players && players?.find(p => p.player_id === id);
    return foundPlayer;
};

export default findPlayer;