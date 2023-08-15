const handleRostersBySzn = (year, league, rosters) => {
  let foundSzn = [];

  if (year === league.season){
    foundSzn = rosters?.totalRoster?.sort((a,b) => {
      if(a.settings.wins === b.settings.wins) {
        return Number(b.settings.fpts + "." + b.settings.fpts_decimal) - Number(a.settings.fpts + "." + a.settings.fpts_decimal);
      } else {
        return b.settings.wins - a.settings.wins
      }
    }).map((roster, idx) => ({...roster, rank:idx+1}))

    return foundSzn
  
  } else {
    
    foundSzn = league.history.filter(szn => szn.year === year).map((szn) => 
      szn.rosters.sort((a,b) => {
        if (a.settings.wins === b.settings.wins) {
          return Number(b.settings.fpts + "." + b.settings.fpts_decimal) - Number(a.settings.fpts + "." + a.settings.fpts_decimal);
        } else {
          return b.settings.wins - a.settings.wins
        }
      }).map((roster, idx) => ({...roster, rank:idx+1}))
    )
  }

  return foundSzn[0];
};

export default handleRostersBySzn;