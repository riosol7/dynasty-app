import { logos } from "../assets/logos";

const findLogo = (team) => {
    if(team === null || undefined){
        return "FA";

    } else {

        let foundLogo = logos.filter(logo => logo[team]);
        return Object.values(foundLogo[0])[0];
    }
}

export default findLogo;