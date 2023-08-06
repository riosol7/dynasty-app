import React from 'react';
import LeagueActivity from './LeagueActivity';

const MODAL_STYLES = {
    position: 'fixed',
    top: '0%',
    right: '0%',
    width:'16em',
    background: "black",
    borderRadius:'5px',
    height:"100%",
    zIndex: 9999
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex:9999
}
export default function RightSideBar({
    activityBar,
    league,
    loadLeague,
    loadTransactions,
    owners,
    players,
    setActivityBar,
    toDateTime,
    transactions,
}) {

    if(!activityBar) return null
    return (
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <LeagueActivity
                    activityBar={activityBar}
                    loadLeague={loadLeague}
                    league={league}
                    loadTransactions={loadTransactions}
                    owners={owners}
                    players={players}
                    setActivityBar={setActivityBar}
                    toDateTime={toDateTime}
                    transactions={transactions}
                />
            </div>
        </div>
        
    )
}
