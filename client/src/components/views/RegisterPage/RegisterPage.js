import React, { useState } from 'react'
//dispatch를 이용해 action을 취할 수 있도록
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import {useNavigate} from 'react-router-dom';
import Auth from '../../../hoc/auth';

function RegisterPage(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setComfirmPassword] = useState("")
  
  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event)  =>{
    setComfirmPassword(event.currentTarget.value)
  }
  const onEmailHandler = (event) => {
      setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); //해주는 이유? 페이지 리프레쉬 방지
    console.log('Email',Email);
    console.log('pw',Password);
    console.log('name :',Name);

    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다')
    }

    let body = {
        email: Email,
        password: Password,
        name : Name
    }
//dispatch를 사용해 action을 취할것임
//email : abcd@naver.com
//pw : 1234567
    dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
              navigate('/login')
              // props.history.push("/login")
            } else{
              alert("faild to sign up")
            }
        })
      }

  return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height: '100vh'
    }}>
        <form style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={onSubmitHandler}
        >
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            <label>Confirm Password </label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
            <br />
            <button type="submit">
                회원가입
            </button>
        </form>
    </div>
)
}


export default Auth(RegisterPage, false)

