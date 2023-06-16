import axios from 'axios';
import{
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';
// LoginPage에서 dispatch(loginUser(body))바디부분을 loginUser함수로 처리
export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login', dataToSubmit) // server에 request날림
    .then(response =>response.data) //서버에서 받은 데이터를 request에 저장

    return{
        // request를 reducer에 넘겨주는 작업
        type:"LOGIN_USER",
        payload : request
    }
}
export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit) // server에 request날림
    .then(response =>response.data) //서버에서 받은 데이터를 request에 저장

    return{
        // request를 reducer에 넘겨주는 작업
        type:"REGISTER_USER",
        payload : request
    }
}

export function auth(dataToSubmit){
    const request = axios.get('/api/users/auth') // get메소드니까 바디부분 제거
    .then(response =>response.data) //서버에서 받은 데이터를 request에 저장

    return{
        // request를 reducer에 넘겨주는 작업
        type:"AUTH_USER",
        payload : request
    }
}

