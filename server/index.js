const express = require('express')
const app = express()
//body-parser도 가져온다
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('../server/config/key');
const {auth} = require('../server/middlewear/auth');

//만들어둔 User 스키마를 가져온다
const {User} = require("../server/models/User");
//body-parser은 클라이언트에서 작성한 정보를 가져올 수 있도록 하는건데 옵션을 줌
//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있도록
app.use(bodyParser.urlencoded({extended:true}));
//json타입을 분석해서 가져올 수 있도록
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology:true, useCreateIndex : true
}).then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err))
app.get('/', (req, res) => {
    res.send('Hello World! node 실행~ 과연!!!! 연결이 잘 되었는가? 변경사항')
})

app.get('/api/hello', (req, res) => {res.send('Hello World!~~ ')})
app.post('/api/users/register',(req, res) => {
    //회원 가입 시 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다
    console.log('register호출')
    //코드를 DB에 넣기 위해서 아래와 같이 객체 선언 body-parser를 이용해 req.body로 정보를 받음
    const user = new User(req.body)
    
    console.log('user객체 생성')
    user.save((err, userInfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success:true
        })
    })//mongoDB의 메소드
})



//로그인 라우터 만들기
app.post('/api/users/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    console.log('login start')
    console.log(`email : ${req.body.email}`)
    
    //User객체를 가져와 몽고DB가 제공하는 메소드 findOne사용, 매개변수1 : 매개변수로 찾고자하는 요청된 이메일 넣기, 매개변수2:콜백함수
    User.findOne({ email: req.body.email }, (err, user) => {
        
        //만약 이 User안에 매개변수1(이메일)을 가진 유저가 한명도 없다면 if문실행  
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        console.log('이메일을 가진 user존재함')
        //유저가 있다면 -> comparePassword()메소드생성 2가지 argument넣어줌
        // 1 : 비번, 2: 콜백함수 (비밀번호가 일치할경우 isMatch)
        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        console.log(`요청받은 비밀번호는 : ${req.body.password}`)
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            console.log('err',err)    
            
            console.log('isMatch',isMatch)
            
            if (!isMatch)
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
            
        })
        //비밀번호 까지 맞다면 토큰을 생성하기.
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err); //에러메시지도 함께 전달
            
            // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
            res.cookie("x_auth", user.token)
            .status(200) //성공
            .json({ loginSuccess: true, userId: user._id })
        })
    })
}) 

// middlewear 만들기
//auth : middlewear ? 요청을 받은 후 중간에서 작업해주는 것
// role : 1 admin , role : 2 특정 부서 어드민
// role : 0 일반유저, role :0이 아니면 관리자
app.get('/api/users/auth', auth, (req,res)=>{
    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authenication이 true라는 말
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email:req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })
})


//로그아웃 라우터 만들기
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        {_id:req.user._id}, //middlewear에서 가져와서 찾음 id, token 지워줌
        {token : ""},
        (err, user) => {
            if(err) return res.json({success : false, err});
            return res.status(200).send({
                success : true
            })
        })
    })
    
    
    
    const port = 5000
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })