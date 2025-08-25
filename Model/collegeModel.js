
const {Schema, model} = require('mongoose')


//College Model

const collegeSchema = new Schema({
    name:{type:String,
        required: true,
        unique:true},
    city:{
        type:Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    emailExtension: {
        type: String,
        required: true
    },
    pincode:{
        type:String,
        required :true
    },
    departments:[{
        type:Schema.Types.ObjectId,
        ref: 'Dept'
    }]
},{
    timestamps: true 
})

module.exports = model("College",collegeSchema)