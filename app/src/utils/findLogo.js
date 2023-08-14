import { Logo } from "../constants";

const findLogo = (team) => {
    if(team === null || team === undefined){
        return "FA";

    } else {
        const foundLogo = Logo.filter(logo => logo[team]);
        return Object.values(foundLogo[0])[0];
    }
}

export default findLogo;