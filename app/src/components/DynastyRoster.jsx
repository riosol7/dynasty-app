import React,{useState} from 'react';
import { Icon } from '@iconify/react';
import {logos} from "../assets/logos";
import age from "../assets/age.png";
export default function Roster(props) {
    const owner = props.owner
    const rosters = props.rosters
    const roundToHundredth = props.roundToHundredth
    const findPlayer = props.findPlayer
    const isOdd = props.isOdd

    const [showQBs, setShowQBs] = useState(false)
    const [qbArrow, setQbArrow] = useState(true)
    const [showRBs, setShowRBs] = useState(false)
    const [rbArrow, setRbArrow] = useState(true)
    const [showWRs, setShowWRs] = useState(false)
    const [wrArrow, setWrArrow] = useState(true)
    const [showTEs, setShowTEs] = useState(false)
    const [teArrow, setTeArrow] = useState(true)

    const showMoreQBs = () => {
        setShowQBs(!showQBs)
        setQbArrow(!qbArrow)
    }
    const showMoreRBs = () => {
        setShowRBs(!showRBs)
        setRbArrow(!rbArrow)
    }
    const showMoreWRs = () => {
        setShowWRs(!showWRs)
        setWrArrow(!wrArrow)
    }
    const showMoreTEs = () => {
        setShowTEs(!showTEs)
        setTeArrow(!teArrow)
    }
 
    function qbRankings (roster) {
        let foundTeam = rosters.qbRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }
    function rbRankings (roster) {
        let foundTeam = rosters.rbRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }
    function wrRankings (roster) {
        let foundTeam = rosters.wrRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }
    function teRankings (roster) {
        let foundTeam = rosters.teRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }
    function getTopQB(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topQB = foundTeam.kct.qb.players[0]
        return topQB
    }
    function getTopRB(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topRB = foundTeam.kct.rb.players[0]
        return topRB
    }
    function getTopWR(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topWR = foundTeam.kct.wr.players[0]
        return topWR
    }
    function getTopTE(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topTE = foundTeam.kct.te.players[0]
        return topTE
    }
    let findLogo = (team) => {
        let foundLogo = logos.filter(logo => logo[team])
        return Object.values(foundLogo[0])[0]
    }
    return (
        <div id="scrollBar" style={{height:"450px", minWidth:"390px", overflow:"auto", background:"black"}}>
            <div className="">
                <div className="d-flex align-items-center justify-content-between mt-3">
                    <div className="d-flex align-items-center" style={{minWidth:"155px"}}>
                        {   
                            qbArrow ?
                                <Icon
                                    icon='akar-icons:circle-chevron-down'
                                    onClick={() => showMoreQBs()}
                                    style={{
                                        fontSize:'1.1rem',
                                        color:"#c9cfd1",
                                        background:"black",
                                        borderRadius:"50%"
                                    }}
                                />
                            :
                                <Icon
                                    onClick={() => showMoreQBs()}
                                    icon='akar-icons:circle-chevron-up'
                                    style={{
                                        fontSize:'1.1rem',
                                        color:"#c9cfd1",
                                        background:"black",
                                        borderRadius:"50%"
                                    }}
                                />
                        }
                        <div className="m-0 mx-2 d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                <p className="m-0">{owner.kct.qb.players.length}</p>
                            </div>  
                            <p className="mx-2 m-0"> | </p>
                            <p className="m-0 bold" style={{fontSize:"16px",color:"#f8296d", marginRight:"6px"}}>QB</p> 
                            <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{qbRankings(owner)}</p> 
                        </div>
                    </div>
                    <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                        <div className="d-flex align-items-center" style={{minWidth:"85px"}}>
                            <div style={{}}>
                                <img src={age} alt="age" style={{marginRight:"2px"}}/>
                            </div>
                            <p className="m-0 mx-1 d-flex align-items-center">
                                {roundToHundredth(owner.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.qb.players.length)}
                            </p>
                        </div>
                        <div className="d-flex align-items-center" style={{minWidth:"85px"}}>
                            <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                            <p className="m-0">{owner.kct.qb.total}</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    { 
                        showQBs ? 
                            owner.kct.qb.players.map((player, i) =>
                                <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                    <div style={{width:"30px"}} className="text-center">
                                        {   
                                            i === 0?
                                                <Icon icon="bxs:star" style={{}} />
                                            :
                                                <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                        }
                                    </div>
                                    <div className="mx-2">
                                        <div className="smallHeadShot"
                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                player.player_id}.jpg)`,
                                            }}>
                                                <div className="displayOwnerLogoSM">
                                                <img style={{width:"2.5em"}} alt="avatar" src={findLogo(player.team).l}/></div>
                                        </div> 
                                    </div>
                                    <div className="mx-2" style={{fontSize:".9rem"}}>
                                        <p className="m-0 bold">{player.player}</p>
                                        <p className="m-0"style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id).number} {player.position} - {player.team}</p>
                                        <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                            <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                            <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                age <span style={
                                                    player.age < "25" ?
                                                        {color:"#42f3e9"}
                                                    : player.age < "30"?
                                                        {color:"#3cf20a"}
                                                    : player.age < "33"?
                                                        {color:"#f2c306"}
                                                    : player.age < "35"?
                                                        {color:"#f26307"}
                                                    : player.age < "50"?
                                                        {color:"#e9230b"}
                                                    :   {color:"white"} 
                                                }>{player.age}</span>
                                            </p>
                                            <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                {/* <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8", fontSize:"1.1em"}}/> */}
                                                <p className="m-0 mx-1">{player.rating}</p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                {/* <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8", fontSize:"1.1em"}}/> */}
                                                <p className="m-0 mx-1">428</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                            <div className="d-flex align-items-center my-4">
                                <div style={{width:"30px"}} className="">
                                    <Icon icon="bxs:star" style={{}} />
                                </div>
                                <div className="d-flex justify-content-center align-items-center" style={{background:findLogo(getTopQB(owner.kct.owner.display_name).team).bgColor, width:"120px", height:"120px", borderRadius:"40px"}}>
                                    <div className="smallHeadShot"
                                        style={{borderRadius:"40px",backgroundSize:"cover",width:"110px",height:"110px",backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                            getTopQB(owner.kct.owner.display_name).player_id}.jpg)`,
                                        }}>
                                            {/* <div style={{position:"absolute", border:"2px solid green", bottom:"0px", marginLeft:"3em"}} className="displayOwnerLogoSM text-center">
                                                <Icon icon="bxs:star" style={{}} />
                                            </div> */}
                                            <div className="" style={{position:"relative", left:"70px", top:"70px"}}> 
                                                <img style={{width:"4em"}} alt="avatar" src={findLogo(getTopQB(owner.kct.owner.display_name).team).l}/>
                                            </div>
                                    </div>
                                </div>
                                <div className="mx-2" style={{fontSize:"1em"}}>
                                    <p className="m-0 bold">{getTopQB(owner.kct.owner.display_name).player}</p>
                                    <div className="d-flex align-items-center">
                                        <div className="">
                                            <p className="m-0" style={{fontSize:"10.5px", color:"#cbcbcb"}}>#{findPlayer(getTopQB(owner.kct.owner.display_name).player_id).number} {getTopQB(owner.kct.owner.display_name).position} - {getTopQB(owner.kct.owner.display_name).team}</p>
                                            
                                        </div>
                                    </div>

                                   
                                    <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                        <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                        <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                            age <span style={
                                                getTopQB(owner.kct.owner.display_name).age < "25"?
                                                    {color:"#42f3e9"}
                                                : getTopQB(owner.kct.owner.display_name).age < "30"?
                                                    {color:"#3cf20a"}
                                                : getTopQB(owner.kct.owner.display_name).age < "33"?
                                                    {color:"#f2c306"}
                                                : getTopQB(owner.kct.owner.display_name).age < "35"?
                                                    {color:"#f26307"}
                                                : getTopQB(owner.kct.owner.display_name).age < "50"?
                                                    {color:"#e9230b"}
                                                :   {color:"white"}
                                            }>{getTopQB(owner.kct.owner.display_name).age}</span>
                                        </p>
                                        <div className="d-flex align-items-center" style={{minWidth:"90px"}}>
                                            <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                            {/* <Icon icon="fluent:tag-16-filled" style={{color:"#a9dfd8", fontSize:"1.1em"}}/> */}
                                            <p className="m-0 mx-1">{getTopQB(owner.kct.owner.display_name).rating}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>                          
            </div>
            <div className="">
                <div className="d-flex align-items-center pt-2" style={{}}>
                    <div className="d-flex align-items-center" style={{minWidth:"155px"}}>
                        { 
                            rbArrow ?
                                <Icon
                                    icon='akar-icons:circle-chevron-down'
                                    onClick={() => showMoreRBs()}
                                    style={{
                                        fontSize:'1.1rem',
                                        color:"#c9cfd1",
                                        background:"black",
                                        borderRadius:"50%"
                                    }}
                                />
                            :
                                <Icon
                                    onClick={() => showMoreRBs()}
                                    icon='akar-icons:circle-chevron-up'
                                    style={{
                                        fontSize:'1.1rem',
                                        color:"#c9cfd1",
                                        background:"black",
                                        borderRadius:"50%"
                                    }}
                                />
                        }
                        <div className="m-0 mx-2 d-flex align-items-center"> 
                            <div className="d-flex align-items-center">
                                <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                <p className="m-0">{owner.kct.rb.players.length}</p>
                            </div>  
                            <p className="mx-2 m-0"> | </p>
                            <p className="m-0 bold" style={{fontSize:"16px",color:"#36ceb8", marginRight:"6px"}}>RB</p> 
                            <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{rbRankings(owner)}</p> 
                        </div>
                    </div>
                    <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                        <div className="d-flex align-items-center" style={{minWidth:"85px"}}>
                            <div style={{}}>
                                <img src={age} alt="age" style={{marginRight:"2px"}}/>
                            </div>
                            <p className="m-0 mx-1 d-flex align-items-center">
                                {roundToHundredth(owner.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.rb.players.length)}
                            </p>
                        </div>
                        <div className="d-flex align-items-center" style={{minWidth:"85px"}}>
                            <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"2px"}}/>
                            <p className="m-0">{owner.kct.rb.total}</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    { 
                        showRBs ? 
                            owner.kct.rb.players.map((player, i) =>
                                <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                    <div style={{width:"30px"}} className="text-center">
                                        { 
                                            i === 0?
                                                <Icon icon="bxs:star" style={{}} />
                                            :
                                            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                        }
                                    </div>
                                    <div className="mx-2">
                                        <div className="smallHeadShot"
                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                player.player_id}.jpg)`,
                                            }}>
                                            <div className="displayOwnerLogoSM">
                                                <img style={{width:"2.5em"}} alt="avatar" src={findLogo(player.team).l}/>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="mx-2" style={{fontSize:".9rem"}}>
                                        <p className="m-0 bold">{player.player}</p>
                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id).number} {player.position} - {player.team}</p>
                                        <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                            <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                            <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                age <span style={
                                                    player.age < "24"?
                                                        {color:"#42f3e9"}
                                                    :  player.age < "26"?
                                                        {color:"#3cf20a"}
                                                    : player.age < "27" ?
                                                        {color:"#f2c306"}
                                                    : player.age < "28" ?
                                                        {color:"#f26307"}
                                                    : player.age < "35" ?
                                                        {color:"#e9230b"}
                                                    :   {color:"white"} 
                                                }>{player.age}</span>
                                            </p>
                                            <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                <p className="m-0 mx-1">{player.rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                            <div className="d-flex align-items-center my-4">
                                <div style={{width:"30px"}} className="text-center">
                                    <Icon icon="bxs:star" style={{}} />
                                </div>
                                <div className="mx-2">
                                    <div className="smallHeadShot"
                                        style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                            getTopRB(owner.kct.owner.display_name).player_id}.jpg)`,
                                        }}>
                                            <div className="displayOwnerLogoSM"> 
                                            <img style={{width:"2.5em"}} alt="avatar" src={findLogo(getTopRB(owner.kct.owner.display_name).team).l}/></div>
                                    </div>
                                </div>
                                <div className="mx-2" style={{fontSize:".9rem"}}>
                                    <p className="m-0 bold">{getTopRB(owner.kct.owner.display_name).player}</p>
                                    <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopRB(owner.kct.owner.display_name).player_id).number} {getTopRB(owner.kct.owner.display_name).position} - {getTopRB(owner.kct.owner.display_name).team}</p>
                                    <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                        <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                        <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                            age <span style={
                                                getTopRB(owner.kct.owner.display_name).age < "24" ?
                                                    {color:"#42f3e9"}
                                                :  getTopRB(owner.kct.owner.display_name).age < "26" ?
                                                    {color:"#3cf20a"}
                                                : getTopRB(owner.kct.owner.display_name).age < "27" ?
                                                    {color:"#f2c306"}
                                                : getTopRB(owner.kct.owner.display_name).age < "28" ?
                                                    {color:"#f26307"}
                                                : getTopRB(owner.kct.owner.display_name).age < "35" ?
                                                    {color:"#e9230b"}
                                                :   {color:"#3cf20a"}
                                            }>{getTopRB(owner.kct.owner.display_name).age}</span>
                                        </p>
                                        <div className="d-flex align-items-center" style={{width:"90px"}}>
                                            <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                            <p className="m-0 mx-1">{getTopRB(owner.kct.owner.display_name).rating}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }   
                </div>                          
            </div>
            <div className="">
                <div className="d-flex align-items-center pt-2">
                    <div className="d-flex align-items-center" style={{minWidth:"155px"}}>
                        { 
                            wrArrow ?
                                <Icon
                                    icon='akar-icons:circle-chevron-down'
                                    onClick={() => showMoreWRs()}
                                    style={{
                                        fontSize:'1.1rem',
                                        color:"#c9cfd1",
                                        background:"black",
                                        borderRadius:"50%"
                                    }}
                                />
                            :
                                <Icon
                                    onClick={() => showMoreWRs()}
                                    icon='akar-icons:circle-chevron-up'
                                    style={{
                                        fontSize:'1.1rem',
                                        color:"#c9cfd1",
                                        background:"black",
                                        borderRadius:"50%"
                                    }}
                                />
                        }
                        <div className="m-0 mx-2 d-flex align-items-center"> 
                            <div className="d-flex align-items-center">
                                <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.wr.players.length}</p>
                            </div>
                            <p className="mx-2 m-0"> | </p>
                            <p className="m-0 bold" style={{fontSize:"16px",color:"#58a7ff", marginRight:"6px"}}>WR</p> 
                            <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{wrRankings(owner)}</p> 
                        </div>
                    </div>
                    <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                        <div className="d-flex align-items-center" style={{width:"85px"}}>
                            <div style={{}}>
                                <img src={age} alt="age" style={{marginRight:"2px"}}/>
                            </div>
                            <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                {roundToHundredth(owner.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.wr.players.length)}
                            </p>
                        </div>
                        <div className="d-flex align-items-center" style={{width:"85px"}}>
                            <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                            <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.wr.total}</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    { 
                        showWRs ? 
                            owner.kct.wr.players.map((player, i) =>
                                <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                    <div style={{width:"30px"}} className="text-center">
                                    { i === 0?
                                        <Icon icon="bxs:star" style={{}} />
                                    :
                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                    }
                                    </div>
                                    <div className="mx-2">
                                        <div className="smallHeadShot"
                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                player.player_id}.jpg)`,
                                            }}>
                                                <div className="displayOwnerLogoSM">
                                                <img style={{width:"2.5em"}} alt="avatar" src={findLogo(player.team).l}/></div>
                                        </div> 
                                    </div>
                                    <div className="mx-2" style={{fontSize:".9rem"}}>
                                        <p className="m-0 bold">{player.player}</p>
                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id).number} {player.position} - {player.team}</p>
                                        <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                            <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                            <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                age <span style={
                                                    player.age < "24"?
                                                        {color:"#42f3e9"}
                                                    : player.age < "28"?
                                                        {color:"#3cf20a"}
                                                    : player.age < "29"?
                                                        {color:"#f2c306"}
                                                    : player.age < "30"?
                                                        {color:"#f26307"}
                                                    : player.age < "35"?
                                                        {color:"#e9230b"}
                                                    : {color:"white"}
                                                }>{player.age}</span>
                                            </p>
                                            <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                <p className="m-0 mx-1">{player.rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                            <div className="d-flex align-items-center my-4">
                                <div style={{width:"30px"}} className="text-center">
                                    <Icon icon="bxs:star" style={{}} />
                                </div>
                                <div className="mx-2">
                                    <div className="smallHeadShot"
                                        style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                            getTopWR(owner.kct.owner.display_name).player_id}.jpg)`,
                                        }}>
                                            <div className="displayOwnerLogoSM"> 
                                            <img style={{width:"2.5em"}} alt="avatar" src={findLogo(getTopWR(owner.kct.owner.display_name).team).l}/></div>
                                    </div>
                                </div>
                                <div className="mx-2" style={{fontSize:".9rem"}}>
                                    <p className="m-0 bold">{getTopWR(owner.kct.owner.display_name).player}</p>
                                    <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopWR(owner.kct.owner.display_name).player_id).number} {getTopWR(owner.kct.owner.display_name).position} - {getTopWR(owner.kct.owner.display_name).team}</p>
                                    <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                        <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                        <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                            age <span style={
                                                getTopWR(owner.kct.owner.display_name).age < "24"?
                                                    {color:"#42f3e9"}
                                                : getTopWR(owner.kct.owner.display_name).age < "28"?
                                                    {color:"#3cf20a"}
                                                : getTopWR(owner.kct.owner.display_name).age < "29"?
                                                    {color:"#f2c306"}
                                                : getTopWR(owner.kct.owner.display_name).age < "30"?
                                                    {color:"#f26307"}
                                                : getTopWR(owner.kct.owner.display_name).age < "35"?
                                                    {color:"#e9230b"}
                                                : {color:"white"}
                                            }>{getTopWR(owner.kct.owner.display_name).age}</span>
                                        </p>
                                        <div className="d-flex align-items-center" style={{width:"90px"}}>
                                            <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                            <p className="m-0 mx-1">{getTopWR(owner.kct.owner.display_name).rating}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>                          
            </div>
            <div className="">
                <div className="d-flex align-items-center pt-2">
                    <div className="d-flex align-items-center" style={{minWidth:"155px"}}>
                        { 
                            teArrow ?
                                <Icon
                                    icon='akar-icons:circle-chevron-down'
                                    onClick={() => showMoreTEs()}
                                    style={{
                                        fontSize:'1.1rem',
                                        color:"#c9cfd1",
                                        background:"black",
                                        borderRadius:"50%"
                                    }}
                                />
                            :
                                <Icon
                                    onClick={() => showMoreTEs()}
                                    icon='akar-icons:circle-chevron-up'
                                    style={{
                                        fontSize:'1.1rem',
                                        color:"#c9cfd1",
                                        background:"black",
                                        borderRadius:"50%"
                                    }}
                                />
                        }
                        <div className="m-0 mx-2 d-flex align-items-center"> 
                            <div className="d-flex align-items-center">
                                <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.te.players.length}</p>
                            </div>
                            <p className="mx-2 m-0"> | </p>
                            <p className="m-0 bold" style={{fontSize:"16px",color:"#faae58", marginRight:"6px"}}>TE</p> 
                            <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{teRankings(owner)}</p> 
                        </div>
                    </div>
                    <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                        <div className="d-flex align-items-center" style={{minWidth:"85px"}}>
                            <div style={{}}>
                                <img src={age} alt="age" style={{marginRight:"4px"}}/>
                            </div>
                            <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                {roundToHundredth(owner.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.te.players.length)}
                            </p>
                        </div>
                        <div className="d-flex align-items-center" style={{minWidth:"85px"}}>
                            <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                            <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.te.total}</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    { 
                        showTEs ? 
                            owner.kct.te.players.map((player, i) =>
                                <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                    <div style={{width:"30px"}} className="text-center">
                                    { 
                                        i === 0?
                                            <Icon icon="bxs:star" style={{}} />
                                        :
                                            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                    }
                                    </div>
                                    <div className="mx-2">
                                        <div className="smallHeadShot"
                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                player.player_id}.jpg)`,
                                            }}>
                                                <div className="displayOwnerLogoSM">
                                                <img style={{width:"2.5em"}} alt="avatar" src={findLogo(player.team).l}/></div>
                                        </div> 
                                    </div>
                                    <div className="mx-2" style={{fontSize:".9rem"}}>
                                        <p className="m-0 bold">{player.player}</p>
                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id).number} {player.position} - {player.team}</p>
                                        <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                            <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                            <p className="m-0" style={{color:"#b0b0b2" , width:"65px"}}>
                                                age <span style={
                                                    player.age < "25"?
                                                        {color:"#42f3e9"}
                                                    : player.age < "28"?
                                                        {color:"#3cf20a"}
                                                    : player.age < "30"?
                                                        {color:"#f2c306"}
                                                    : player.age < "31"?
                                                        {color:"#f26307"}
                                                    : player.age < "37"?
                                                        {color:"#e9230b"}
                                                    :{color:"white"}}>{player.age}</span>
                                            </p>
                                            <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                <p className="m-0 mx-1">{player.rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                            <div className="d-flex align-items-center my-4">
                                <div style={{width:"30px"}} className="text-center">
                                    <Icon icon="bxs:star" style={{}} />
                                </div>
                                <div className="mx-2">
                                    <div className="smallHeadShot"
                                        style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                            getTopTE(owner.kct.owner.display_name).player_id}.jpg)`,
                                        }}>
                                            <div className="displayOwnerLogoSM"> 
                                            <img style={{width:"2.5em"}} alt="avatar" src={findLogo(getTopTE(owner.kct.owner.display_name).team).l}/></div>
                                    </div>
                                </div>
                                <div className="mx-2" style={{fontSize:".9rem"}}>
                                    <p className="m-0 bold">{getTopTE(owner.kct.owner.display_name).player}</p>
                                    <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopTE(owner.kct.owner.display_name).player_id).number} {getTopTE(owner.kct.owner.display_name).position} - {getTopTE(owner.kct.owner.display_name).team}</p>
                                    <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                        <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                        <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                            age <span style={
                                                getTopTE(owner.kct.owner.display_name).age < "25"?
                                                    {color:"#42f3e9"}
                                                : getTopTE(owner.kct.owner.display_name).age < "28"?
                                                    {color:"#3cf20a"}
                                                : getTopTE(owner.kct.owner.display_name).age < "30"?
                                                    {color:"#f2c306"}
                                                : getTopTE(owner.kct.owner.display_name).age < "31"?
                                                    {color:"#f26307"}
                                                : getTopTE(owner.kct.owner.display_name).age < "37"?
                                                    {color:"#e9230b"}
                                                : {color:"white"}
                                            }>{getTopTE(owner.kct.owner.display_name).age}</span>    
                                        </p>
                                        <div className="d-flex align-items-center" style={{width:"90px"}}>
                                            <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                            <p className="m-0 mx-1">{getTopTE(owner.kct.owner.display_name).rating}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>                          
            </div>
        </div>
    )
}
