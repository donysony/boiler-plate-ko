const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength : 50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        //관리자와 일반 유저를 구분하기 위함
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})
const User = mongoose.model('User', userSchema)

module.exports = {User}