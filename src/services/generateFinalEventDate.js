
const convertIsoToMiliseconds = (string)=>{
    const myDate = new Date(string).getTime()
    const dateOffset = myDate.getTimezoneOffset() * 60 * 1000;
    return myDate - dateOffset
}


const generateFinalEventDate = async (model)=>{
    const modelData = await model.find()
    const dateFrequency = {}
    for (let data in modelData){
        const convertedData = convertIsoToMiliseconds(data).toString()
        if (convertedData in dateFrequency){
            dateFrequency[convertedData] += 1
        }else{
            dateFrequency[convertedData] = 1
        }
    }
    const milliseconds = Object.keys(dateFrequency).reduce((a, b) => dateFrequency[a] > dateFrequency[b] ? a : b)
    return new Date(milliseconds).toISOString()
}


module.exports = generateFinalEventDate
