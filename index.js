const express = require('express')
const app = express()
const port = 5000
//body-parser도 가져온다
const bodyParser = require('body-parser');
const config = require('./config/key');

//만들어둔 User 스키마를 가져온다
const {User} = require("./models/User");
//body-parser은 클라이언트에서 작성한 정보를 가져올 수 있도록 하는건데 옵션을 줌
//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있도록
app.use(bodyParser.urlencoded({extended:true}));
//json타입을 분석해서 가져올 수 있도록
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology:true
}).then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World! node 실행~ 과연!!!! 연결이 잘 되었는가?')
})

app.post('/register',(req, res) => {
    //회원 가입 시 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다

    //코드를 DB에 넣기 위해서 아래와 같이 객체 선언 body-parser를 이횽해 req.body로 정보를 받음
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success:true
        })
    })//mongoDB의 메소드
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})