const getInitials = (name) => {
  if (name !== undefined) {
    const splitName = name.split(" ");
    return splitName[0].charAt(0) + ". " + splitName[1];
  }
};

export default getInitials