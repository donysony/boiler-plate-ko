const {User} = require('../models/User');

let auth = (req, res, next)=>{
    //인증처리를 하는 곳
    console.log('auth실행')
    //순서 1. 클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;
    console.log(`token: ${token}`)
    // 2. 토큰을 복호화 한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        //user가 없다면
        //4. 유저가 없으면 인증 NO
        if(!user) return res.json({isAuth:false, error:true})
        //3. 유저가 있으면 인증 OK
        //user가 있다면
        req.token = token;
        req.user = user;

        //next를 하는 이유 : middlewead에서 다음으로 넘어갈 수 있도록
        next();
    })
}
//다른 파일에서도 사용가능하도록
module.exports = {auth};

