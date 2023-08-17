const processRosters = (rosters, players, owners) => {
  if (rosters && players && owners && owners.length > 1 && players.length > 1 ) {
    const uploadPlayersToRosters = rosters.map(roster => {
      const foundOwner = owners.find(owner => owner.roster_id === roster.roster_id);
      const foundPlayers = players.filter(player => roster.players.includes(player.player_id));
      const qbFiltered = foundPlayers.filter(player => player.position === "QB").sort((a, b) => {
        return (isNaN(b.rating) ? 0 : parseInt(b.rating)) - (isNaN(a.rating) ? 0 : parseInt(a.rating));
      });

      const qbTotal = qbFiltered.reduce((total, player) => {
        return total + (isNaN(player.rating) ? 0 : parseInt(player.rating));
      }, 0);

      const rbFiltered = foundPlayers.filter(player => player.position === "RB").sort((a, b) => {
          return (isNaN(b.rating) ? 0 : parseInt(b.rating)) - (isNaN(a.rating) ? 0 : parseInt(a.rating));
      });
      const rbTotal = rbFiltered.reduce((total, player) => {
        return total + (isNaN(player.rating) ? 0 : parseInt(player.rating));
      }, 0);

      const wrFiltered = foundPlayers.filter(player => player.position === "WR").sort((a, b) => {
        return (isNaN(b.rating) ? 0 : parseInt(b.rating)) - (isNaN(a.rating) ? 0 : parseInt(a.rating));
      });
      const wrTotal = wrFiltered.reduce((total, player) => {
        return total + (isNaN(player.rating) ? 0 : parseInt(player.rating));
      }, 0);

      const teFiltered = foundPlayers.filter(player => player.position === "TE").sort((a, b) => {
        return (isNaN(b.rating) ? 0 : parseInt(b.rating)) - (isNaN(a.rating) ? 0 : parseInt(a.rating));
      });
      const teTotal = teFiltered.reduce((total, player) => {
        return total + (isNaN(player.rating) ? 0 : parseInt(player.rating));
      }, 0);
    
      let teamTotal = qbTotal + rbTotal + wrTotal + teTotal;
      return {
        ...roster,
        players: foundPlayers,
        owner: foundOwner,
        // starters: foundStarters,
        // reserve: foundReserve,
        // taxi: foundTaxi,
        kct: {
          owner: foundOwner,
          teamTotal: teamTotal,
          qb: {
              total: qbTotal,
              players: qbFiltered,
          },
          rb: {
              total: rbTotal,
              players: rbFiltered,
          },
          wr: {
              total: wrTotal,
              players: wrFiltered,
          },
          te: {
              total: teTotal,
              players: teFiltered,
          },
        },
      };
    })

    return {
      totalRoster: uploadPlayersToRosters.sort((a,b) => { if (a.settings.wins === b.settings.wins) { return (b.settings.fpts) - (a.settings.fpts);} else { return b.settings.wins - a.settings.wins;}}).map((team, i) => ({...team, rank:i+1})),
      teamRank: uploadPlayersToRosters.sort((a, b) => parseFloat(b.kct.teamTotal) - parseFloat(a.kct.teamTotal)).map((roster, idx) => { return { kct: roster.kct, rank: idx + 1, roster_id: roster.roster_id } }),
      qbRank: uploadPlayersToRosters.sort((a, b) => parseFloat(b.kct.qb.total) - parseFloat(a.kct.qb.total)).map((roster, idx) => { return { kct: roster.kct, rank: idx + 1, roster_id: roster.roster_id } }),
      rbRank: uploadPlayersToRosters.sort((a, b) => parseFloat(b.kct.rb.total) - parseFloat(a.kct.rb.total)).map((roster, idx) => { return { kct: roster.kct, rank: idx + 1, roster_id: roster.roster_id } }),
      wrRank: uploadPlayersToRosters.sort((a, b) => parseFloat(b.kct.wr.total) - parseFloat(a.kct.wr.total)).map((roster, idx) => { return { kct: roster.kct, rank: idx + 1, roster_id: roster.roster_id } }),
      teRank: uploadPlayersToRosters.sort((a, b) => parseFloat(b.kct.te.total) - parseFloat(a.kct.te.total)).map((roster, idx) => { return { kct: roster.kct, rank: idx + 1, roster_id: roster.roster_id } }),
    }
  } else return []
}

export default processRosters;