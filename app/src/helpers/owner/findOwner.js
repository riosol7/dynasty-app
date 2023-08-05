const findOwner = (id, owners, type) => {
    if (owners && owners.length > 1) {
        if (type === "uID") {
            return owners.find(owner => owner.user_id === id);
        } else if (type === "rID") {
            return owners.find(owner => owner.roster_id === id);
        }
    } 
}

export default findOwner