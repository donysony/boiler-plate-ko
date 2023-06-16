import {combineReducers} from 'redux';
import user from './user_reducer';//인증에 관한..
// import comment from './comment_reducer';//댓글에 관한..

//reducer들을 combineReducers로 묶어 rootReducer에서 하나로 합침
const rootReducer = combineReducers({
    user,
    //comment,
})
export default rootReducer;

//리듀서를 여러개 사용하는 이유 : 애플리케이션의 상태가 복잡하고 다양한 부분으로 나뉘어져 있을 수 있기 때문
// 각 리듀서는 해당하는 부분의 상태만을 처리.
//combineReducers를 사용하여 이들을 하나로 합치면 전체 애플리케이션의 상태를 관리할 수 있음

//이렇게 루트 리듀서를 생성하고 내보내면, Redux스토어를 생성할 때 사용됨.
//Redux스토어는 루트 리듀서를 통해 애플리케이션의 전체상태를 관리