const {Schema , model, SchemaTypes} = require('mongoose')

const productSchema = new Schema ({
    productCode : {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    images:[{type:String}],
    price:{
        type:Number,
        required:true
    },
    status:{type:String,
        enum:['active','inactive'],
        default:'active'
    },
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
    }

)

module.exports = model('Product',productSchema)













// name: { type: String, required: true },
// description: { type: String, required: true },
// price: { type: Number, required: true },
// quantity: { type: Number, required: true },  // Stock quantity
// status: { type: String, default: 'active', enum: ['active', 'inactive'] } // Active or inactive status