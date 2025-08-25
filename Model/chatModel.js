const {Schema,model} = require('mongoose')

const chatSchema = new Schema({
    participants:[{
        type:Schema.Types.ObjectId,
        ref:'Student',
        required:true
    }],
    messages:[{
        sender:{
            type:Schema.Types.ObjectId,
            ref:"Student",
            required:true
        },
        text:{
            type:String,
            required:true
        },
        timestamp:{
            type:Date,
            default:Date.now
        },
    }],
},{
    timestamps:true
})

module.exports = model('Chat', chatSchema)




// const chatSchema = new Schema({
//     sender:[{
//         type:Schema.Types.ObjectId,
//         ref:'Student',
//         required: true
//     }],
//     receiver:[{
//         type:Schema.Types.ObjectId,
//         ref:'Student',
//         required:true
//     }],
//     message:[{
//         type:String,
//         required:true
//     }]
// },{
//     timestamps:true
// })