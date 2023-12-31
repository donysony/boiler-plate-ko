import React, { useEffect } from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action'
import { useNavigate } from 'react-router-dom';
export default function(SpecificComponent, option, adminRoute = null){

//null  => 아무나 출입 가능
//true  => 로그인한 유저만 출입 가능
//false => 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props){
        const dispatch =  useDispatch();
        let navigate = useNavigate()
        useEffect(()=>{
            dispatch(auth()).then(response => {
                console.log("객체 : ",response)
                console.log(response.payload.isAuth)
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option) {
                        // props.history.push('/login')
                        navigate('/login')
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        // props.history.push("/")
                        navigate('/')
                    }else{
                        if(option === false)
                        // props.history.push('/')
                        navigate('/')
                    }
                }
            })
            
        },[])
        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}