import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";


export default function(state = {},action){
//reducer : 이전state과 현재의 것을 nextstate로 만듦
    switch(action.type){
        case LOGIN_USER:
            return{ ...state, loginSuccess : action.payload}
        case REGISTER_USER:
            return{...state, register:action.payload}
        case AUTH_USER:
            return{...state, userData:action.payload}
        default:
            return state;
    }
} 

//redux에서 사용되는 리듀서 함수의 일부