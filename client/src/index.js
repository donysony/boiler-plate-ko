import React from 'react';
import ReactDOM from 'react-dom/client'; //createRoot()를 사용하기 위해
import './index.css'; //애플리케이션의 스타일을 정의하는 css파일
import App from './App'; //메인 컴포넌트인 App를 가져옴
import reportWebVitals from './reportWebVitals';//웹 애플리케이션의 성능 축정위해 사용되는 함수
import {Provider} from 'react-redux'; //Provider컴포넌트를 사용하여 애플리케이션에 Redux스토어 제공
import { applyMiddleware ,createStore} from 'redux';//redux의 createStore함수와 미들웨어를 사용하여 Redux스토어 생성
import promiseMiddlewear from 'redux-promise'; //미들웨어 적용
import ReduxThunk from 'redux-thunk'; //미들웨어 적용
import Reducer from './_reducers';

const createStoreWithMiddlewear = applyMiddleware(promiseMiddlewear,ReduxThunk)(createStore);



//Function Components의 경우 useMemo등 사용시 콘솔로그 출력 따라서 Function Components 사용시 제거 or Class Components권장
//ReactDOM.createRoot : React애플리케이션 랜더링
// createRoot는 React 18에서 새롭게 도입. 동시성 모드 지원
const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render를 사용하여 App component를 root에 렌더링
// Provider컴포넌트로 감싸져 있어 Redux스토어 사용 가능
//React.StrictMode를 사용하여 개발 모드에서 추가적인 검사 & 경고 활성화
root.render( 
  <React.StrictMode> 
  <Provider store={createStoreWithMiddlewear(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
    <App/>
  </Provider>
  </React.StrictMode>
);

/** 정리
 * Redux를 사용해 상태관리 수행하는 React 애플리케이션 초기화.
 * ReactDOM의 createRoot를 사용해 동시성모드 활용, 
 * Provider로 Redux스토어 제공하여 애플리케이션 전체에서 상태관리 수행
 * 
 * Redux스토어?
 * Redux에서 상태(state)를 저장하고 관리하는 중앙 데이터 저장소.
 * 애플리케이션의 상태를 하나의 객체로 표현하고, 액션에 따라 상태를 업데이트하는데 사용
 * 상태관리 : 애플리케이션의 상태를 하나의 객체로 저장하고 관리, 이 객체의 상태는 애플리케이션의 여러 컴포넌트에서 공유되어 사용
 * 액션처리 : 액션은 상태를 변경하기 위해 발생하는 이벤트. Redux 스토어는 액션을 받아 상태를 업데이트하는 리듀서 함수를 호출
 * 리듀서 함수 호출 : 리듀서 함수는 이전 상태와 액션을 받아서 새로운 상태를 반환하는 순수함수. Redux 스토어는 리듀서 함수를 호출하여 상태를 업데이트하고 새로운 상태를 저장
 * 구독과 알림 : Redux스토어는 상태가 업데이트 될 때마다 등록된 콜백함수들을 호출하여 알림을 보냄. 컴포넌트는 이 콜백 함수를 사용하여 상태변경에 따른 업데이트 작업을 수행할 수 있음
 * 
 * 장점 : Redux의 핵심요소. Redux의 기본원칙을 준수하여 상태를 관리. Redux 스토어를 사용하면 애플리케이션의 상태를 예측가능하게 만듦, 상태변경에 따른 작업 일관되게 처리함
 */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); // 함수 호출해 애플리케이션 성능 측정
