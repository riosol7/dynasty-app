const handleRostersBySzn = (yr, league, rosters) => {
    let foundSzn=[];
    if(yr === league.season){
      foundSzn = rosters?.totalRoster?.sort((a,b) => {
        if(a.settings.wins === b.settings.wins) {
          return Number(b.settings.fpts + "." + b.settings.fpts_decimal) - Number(a.settings.fpts + "." + a.settings.fpts_decimal);
        } else {
          return b.settings.wins - a.settings.wins
        }
      }).map((roster, idx) => ({...roster, rank:idx+1}))
    } else {
      foundSzn = league.history.filter(l => l.year === yr).map((l,) => 
        l.rosters.sort((a,b) => {
          if (a.settings.wins === b.settings.wins) {
            return Number(b.settings.fpts + "." + b.settings.fpts_decimal) - Number(a.settings.fpts + "." + a.settings.fpts_decimal);
          } else {
            return b.settings.wins - a.settings.wins
          }
        }).map((roster, idx) => ({...roster, rank:idx+1}))
      )
    }
    return foundSzn;
};

export default handleRostersBySzn;