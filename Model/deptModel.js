
const {Schema, model} = require('mongoose')


//Department Model

const deptSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
    // college:{
    //     type:Schema.Types.ObjectId,
    //     ref:'College'

    // }
},{
    timestamps:true
})

module.exports = model('Dept', deptSchema)  