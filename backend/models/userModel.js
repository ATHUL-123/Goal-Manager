const mongoose =require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    },
    profileUrl: {
        type: String,
        default:''
    },
    email:{
        type:String,
        required:[true,'please add an email']
    },
    password:{
        type:String,
        required:[true,'please add a password']
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)