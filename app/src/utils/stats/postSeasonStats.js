import { getMatchups } from "./headToHeadStats";
import { roundToHundredth } from "./pointCalculations";

const getPostSeasonStats = (id, year, league, matchup) => {
    //CURRENT PLAYOFFS
    let inSeasonPlayoffHighestScore = 0;
    let inSeasonPlayoffPF;
    let inSeasonPlayoffPA;
    const inSeasonPlayoffBracket = league.brackets?.winner?.filter(match => match.t1 === Number(id) || match.t2 === Number(id));
    const inSeasonToiletBracket = league.brackets?.loser?.filter(match => Number(match.t1) === Number(id) || Number(match.t2) === Number(id)); 
    const inSeasonPlayoffAppearance = inSeasonPlayoffBracket?.length > 0 && inSeasonPlayoffBracket[0]?.l !== null && inSeasonPlayoffBracket[0]?.w !== null  ? true : false;
    const inSeasonPlayoffWins = inSeasonPlayoffBracket?.filter(match => match.w === Number(id))?.length || 0;
    const inSeasonPlayoffLosses = inSeasonPlayoffBracket?.filter(match => match.l === Number(id))?.length || 0;
    const playoffWeeks = inSeasonPlayoffBracket?.length;
    const inSeasonPlayoffMatches = matchup?.slice(14, 14 + playoffWeeks);
    const myTeamMatches = inSeasonPlayoffMatches?.map(week => week.find(team => team.roster_id === Number(id))).filter(team => team);
    const opponentPoints = inSeasonPlayoffMatches?.map(week => week.find(team => team.roster_id !== Number(id))).filter(team => team).map(team => team.points);

    if (myTeamMatches && Array.isArray(myTeamMatches)) {
        inSeasonPlayoffHighestScore = Math.max(...myTeamMatches.map(team => team.points));
    }    
    inSeasonPlayoffPF = myTeamMatches?.reduce((total, team) => total + team.points, 0);
    inSeasonPlayoffPA = roundToHundredth(opponentPoints?.reduce((total, points) => total + points, 0));

    //SELECTIVE PLAYOFFS
    let playoffBracket = [];
    let playoffAppearance;
    let playoffPF = 0;
    let playoffPA = 0;
    let playoffHighestScore = 0;
    let playoffWins = 0;
    let playoffLosses = 0;
    if(year !== league.season && year !== "All Time") {
        playoffBracket = league.history?.filter(szn => szn.year === year).map(l => l.league.brackets.winner.bracket.filter(m => m.t2 === Number(id) || m.t1 === Number(id)))[0];
        
        const weeklyScore = league.history?.filter(szn => szn.year === year).map(szn => getMatchups(id, szn.matchups))[0];
        const sliceStart = Number(year) > 2020 ? 14 : 13;
        const sliceEnd = playoffBracket?.length === 3 ? sliceStart + 3 : sliceStart + 2;

        const userScores = weeklyScore?.slice(sliceStart, sliceEnd)
            .map(m => m.filter(t => t.roster_id === Number(id))[0])
            .map(a => a && a.points);

        const opponentScores = weeklyScore?.slice(sliceStart, sliceEnd)
            .map(m => m.filter(t => t.roster_id !== Number(id))[0])
            .map(a => a && a.points);

        if (playoffBracket?.length === 0) {
            playoffHighestScore = 0;
            playoffPF = 0;
            playoffPA = 0;
        } else if (Array.isArray(userScores) && userScores.length > 0) {
            playoffHighestScore = roundToHundredth(Math.max(...userScores));
            playoffPF = roundToHundredth(userScores?.reduce((a, b) => +a + +b));
            playoffPA = roundToHundredth(opponentScores?.reduce((a, b) => +a + +b));
            playoffAppearance = playoffBracket?.length > 0 ? true : false;
            playoffWins = playoffBracket?.filter(m => m.w === Number(id))?.length;
            playoffLosses = playoffBracket?.filter(m => m.l === Number(id))?.length;
        }
    };
    // ALL TIME
    const allTimeStats = () => {
        const toiletBowls = league?.history?.map(season => { 
            let toiletBowl = 0;
            const bracket = season.league.brackets.loser.bracket.filter(match => Number(match.t1) === Number(id) || Number(match.t2) === Number(id));
            if(bracket.length === 3){
                if(Number(bracket[1].w) === Number(id) && Number(bracket[2].w) === Number(id)) {
                    toiletBowl ++;
                };
            } else if(bracket.length === 2){
                if(Number(bracket[0].w) === Number(id) && Number(bracket[1].w) === Number(id)){
                    toiletBowl ++;
                };
            };
            return toiletBowl;
        }).reduce((a,b) => {return +a + +b}) + (inSeasonToiletBracket?.length > 0 && inSeasonToiletBracket[2]?.w === Number(id) ? 1 : 0)
        ;
        
        const playoffRuns = league?.history?.map(season => {
            const playoffBracket = season.league.brackets.winner.bracket.filter(match => Number(match.t1) === Number(id) || Number(match.t2) === Number(id));
            if(playoffBracket.length > 0) {
                const weeklyScore =  league?.history?.filter(szn => szn.year === season.year).map(szn => getMatchups(id, szn.matchups))[0];

                return {
                    bracket: playoffBracket,
                    yr: season.year,
                    games: Number(season.year) > 2020 ?
                        weeklyScore.slice(14,17)
                    :
                        weeklyScore.slice(13,16) 
                };
            };
            return null;
        }).filter(y => y !== null);

        const finalsRecord = () => {
            let legacyFinalsRecord = playoffRuns?.map(s => {
                let w = 0;
                let l = 0;

                if(s.bracket.length === 3){
                    if(s.bracket[1].w === Number(id) && s.bracket[2].w === Number(id)) {
                        w++
                    } else if(s.bracket[1].w === Number(id) && s.bracket[2].l === Number(id)) {
                        l++
                    }
                } else if(s.bracket.length === 2) {
                    if(s.bracket[0].w === Number(id) && s.bracket[1].w === Number(id)) {
                        w++
                    } else if(s.bracket[0].w === Number(id) && s.bracket[1].l === Number(id)) {
                        l++
                    }
                }
                return {
                    w:w,
                    l:l
                }
            }).reduce((accumulator, currentValue) => {
                for (const key in currentValue) {
                    if (accumulator.hasOwnProperty(key)) {
                        accumulator[key] += currentValue[key];
                    } else {
                        accumulator[key] = currentValue[key];
                    }
                }
                return accumulator;
            }, {});

            if(inSeasonPlayoffBracket?.length > 0 && inSeasonPlayoffBracket[1]?.w === Number(id) && inSeasonPlayoffBracket[2]?.w === Number(id)) {
                legacyFinalsRecord.w ++;
            } else if(inSeasonPlayoffBracket?.length > 0 && inSeasonPlayoffBracket[1]?.w === Number(id) && inSeasonPlayoffBracket[2]?.l === Number(id)) {
                legacyFinalsRecord.l ++;
            };

            return legacyFinalsRecord;
        };
        const playoffAppearances = (playoffRuns?.length + (inSeasonPlayoffAppearance ? 1 : 0));            
        const totalPlayoffPF = roundToHundredth(playoffRuns?.length > 0 ? playoffRuns.map(m => m.games.map(g => g.filter(t => t.roster_id === Number(id))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})).reduce((a,b) => {return +a + +b}): 0 + inSeasonPlayoffPF)
        const totalPlayoffPA = roundToHundredth(playoffRuns?.length > 0 ? playoffRuns.map(m => m.games.map(g => g.filter(t => t.roster_id !== Number(id))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})).reduce((a,b) => {return +a + +b}): 0 + inSeasonPlayoffPA)
        const highestPlayoffScore = roundToHundredth(playoffRuns?.length > 0 ? playoffRuns.map(m => m.games.map(g => g.filter(t => t.roster_id === Number(id))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]).sort((a,b) => b - a)[0] : 0) > inSeasonPlayoffHighestScore ?
        playoffRuns.map(m => m.games.map(g => g.filter(t => t.roster_id === Number(id))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]).sort((a,b) => b - a)[0] : inSeasonPlayoffHighestScore
        const totalPlayoffGames = playoffRuns?.length > 0 ? playoffRuns?.map(s => s.bracket.length).reduce((a,b) => {return +a + +b}) : 0 + inSeasonPlayoffBracket?.length;
        const allTimePlayoffWins = (playoffRuns?.map(szn => szn.bracket.filter(match => match.w === Number(id)))?.map(szn => szn.length).reduce((acc, n) => acc + n, 0) || 0) + inSeasonPlayoffWins; 
        const allTimePlayoffLosses = (playoffRuns?.map(szn => szn.bracket.filter(match => match.l === Number(id)))?.map(szn => szn.length).reduce((acc, n) => acc + n, 0) || 0) + inSeasonPlayoffLosses;
        return {
            appearances: playoffAppearances,
            pf: totalPlayoffPF,
            pa: totalPlayoffPA,
            highestScore: highestPlayoffScore,
            totalGames: totalPlayoffGames,
            finals: {
                w: finalsRecord()?.w,
                l: finalsRecord()?.l,
            },
            wins: allTimePlayoffWins,
            losses: allTimePlayoffLosses,
            toiletBowls: toiletBowls,
        };
    }
    const postSeasonStats = 
        year === "All Time" ? allTimeStats() 
        : year === league.season ? {
            appearance: inSeasonPlayoffAppearance,
            bracket: inSeasonPlayoffBracket,
            pf: inSeasonPlayoffPF,
            pa: inSeasonPlayoffPA,
            highestScore: inSeasonPlayoffHighestScore,
            losses: inSeasonPlayoffLosses,
            totalGames: inSeasonPlayoffBracket?.length || 0,
            wins: inSeasonPlayoffWins,
        } : {
            appearance: playoffAppearance,
            bracket: playoffBracket,
            pf: playoffPF,
            pa: playoffPA,
            highestScore: playoffHighestScore,
            losses: playoffLosses,
            totalGames: playoffBracket?.length || 0,
            wins: playoffWins,
        };
    return postSeasonStats;
};

export default getPostSeasonStats;