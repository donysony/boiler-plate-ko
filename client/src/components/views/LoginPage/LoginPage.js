import React, { useState } from 'react'
import Axios from 'axios'
//dispatch를 이용해 action을 취할 수 있도록
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom';
function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

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

    let body = {
        email: Email,
        password: Password
    }
//dispatch를 사용해 action을 취할것임

        dispatch(loginUser(body))
        .then(response => {
            if (response.payload.loginSuccess) {
                props.history.push('/') //리액트에서 페이지 이동시 props.history.push('/')사용
            } else {
                alert('Error˝')
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
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            <br />
            <button type="submit">
                Login
            </button>
        </form>
    </div>
)
}

export default LoginPage
