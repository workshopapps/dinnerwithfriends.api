
const checkEventValidity = async(model,id)=>{
    const modelData = await model.findById(id)
    return modelData.published
}

module.exports = checkEventValidity

