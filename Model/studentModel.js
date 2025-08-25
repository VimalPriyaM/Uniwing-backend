const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const studentSchema = new Schema({
    name:{type:String,
        required: true
    },
    college:{type:Schema.Types.ObjectId,
        ref: 'College',
        required:true,
    },
    department:{
        type:Schema.Types.ObjectId,
        ref:'Dept',
        required:true,

    },
    mobileNo:{type:String,
        required:true
    },
    email:{type:String,
        required:true,
        unique:true
    },
    gender:{type:String,
        required:true
    },
    password:{type: String,
        required:true
    },
},{
    timestamps : true
})



studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);
    next();
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = model('Student', studentSchema)