const {Schema, model} = require('mongoose')

const roomSchema = new Schema ({
    noOfVacancy :{
        type:Number,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    rent:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Available','Occupied'],
        dafault:"Available"
    },
    college:{
        type:Schema.Types.ObjectId,
        ref:'College',
        required:true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student', // Assuming the collection for students is `Student`
        required: true, // Ensure this is linked to the student creating the room
      },
    

},{
    timestamps:true
})

module.exports = model('Rooms', roomSchema)






/* No of vacancy
Description
Rent
Status*/