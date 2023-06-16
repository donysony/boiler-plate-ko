const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
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
    password:{
        type:String,
        minlength:5
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
//비밀번호 암호화는 비밀번호가 변환될 때만 암호화 하도록
userSchema.pre('save',function(next){
    console.log('why dododododogfg')
    var user = this;
    console.log(this)

    if(user.isModified('password')){
        console.log('password modify')

        //비밀번호를 암호화시킨다
        bcrypt.genSalt(saltRounds,function(err, salt){
            if(err) return next(err);
            //생성했다면
            bcrypt.hash(user.password ,salt, function(err,hash){
                if(err) return next(err);
                user.password = hash
                //Store hash in your password DB
                next()
            });
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword,cb){
    //plainPassword 과 암호회된 비밀번호가 알치하는지 확인해야함
    console.log('compare() 실행')
    
    
    console.log(`plainPassword : ${plainPassword}`)
    
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        console.log(`결과 : ${isMatch}`)
        if(err) return cb(err),
        cb(null, isMatch)
    })

}

userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해 토큰생성
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken') //합침 secretToken를 넣었을 때 user._id가 나올 수 있도록 secretToken을 기억해줘야함
    //user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id  
    console.log('토큰 생성')


    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user) //save가 잘 동작하였다면 err은 없고 user정보만 전달
    })
}


userSchema.statics.findByToken = function(token, cb){
    var user = this;
    
    // user._id +'' = token
    //토큰을 decode 한다
    jwt.verify(token, 'secretToken',function(err, decode){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        //무얼 가지고 찾을 거냐 id, token
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })

}

const User = mongoose.model('User', userSchema)

module.exports = {User}