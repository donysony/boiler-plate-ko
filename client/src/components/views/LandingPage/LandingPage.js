import React, { useEffect } from 'react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom'; 
//LandingPage에 들어오자 마자
//실행
function LandingPage(props) {
    // const navigate = useNavigate();
    //1. useEffect훅을 사용. 컴포넌트가 마운트될 때 한번만 실행되는 비동기 요청 수행.
    useEffect(() => {
        // 2. axios.get('/api/hello') 호출. 서버의 /api/hello엔드포인트에 get요청보냄
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])

    //1. 로그아웃 버튼 클릭시 실행
    const onClickHandler = () => {
        //2. axios.get(`/api/users/logout`)호출. 서버의 /api/users/logout엔드포인트에 get요청 보냄
        axios.get(`/api/users/logout`)
            .then(response => {
                //확실히 로그아웃이 된것을 확인하기 위해 로그인 페이지로 이동
                //응답이 성공적인 경우 response.data.success === true
                if (response.data.success) {
                    //history가 'react-router-dom'을 이용해 사용중
                    //useNavigste훅을 사용하여 로그인 페이지로 이동
                    props.history.push("/login")
                    
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })


    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>

        </div>
    )
}

export default LandingPage