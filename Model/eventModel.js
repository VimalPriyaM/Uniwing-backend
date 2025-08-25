const {Schema,model} = require('mongoose')

const eventSchema = new Schema ({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true

    },
    endDate:{
        type:Date,
        required:true
    },
    timeFrom:{
        type:String,
        required:true
    },
    timeTo:{
        type:String,
        required:true
    },
    range:{
        type:String,
        enum:['Inter-Intra College', 'Intra-Intra Dept'],
        required:true
    },
    image:[{
        type:String,
    }],
    college:{
        type:Schema.Types.ObjectId,
        ref:'College',
        required:true
    },
    student:{
        type:Schema.Types.ObjectId,
        ref:'Student',
        required:true
    }
},{
    timestamps:true
})

module.exports = model('Event',eventSchema)