//City Model 
const {Schema, model} = require('mongoose')

//createCity


 const citySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
 })

module.exports = model('City', citySchema)