const {Schema , model} = require('mongoose')

const bloodDonationSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    hospitalLocation:{
        type:String,
        required:true
    },
    description:{
        type:String,
        reuired:true,
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active'
    },
    studentCollege: {
        type: Schema.Types.ObjectId,
        ref: 'College', 
        required: true
    },
    student:{
        type:Schema.Types.ObjectId,
        ref:'Student',
        required:true

    }
},{
    timestamps:true
})

module.exports = model('BloodDonation', bloodDonationSchema)