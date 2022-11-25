const convertIsoToMiliseconds = (string)=>{
    const myDate = new Date(string).getTime()
    const dateOffset = myDate.getTimezoneOffset() * 60 * 1000;
    return myDate - dateOffset
}


