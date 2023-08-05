const findPlayer = (pID, players) => {
    let foundPlayer = players && players?.filter(p => p.player_id === pID)[0];
    return foundPlayer;
};

export default findPlayer;