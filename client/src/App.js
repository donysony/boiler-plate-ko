import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {
  return (




//해당하는 컴포넌트 , 3가지 옵션(null, false, true)에 맞게 넣어주기
    // <Router>
      
    //   <Routes>
    //   <Route path="/" element={<Auth component={LandingPage} options="null"/>}/> 
    //   <Route path="/login" element={<Auth component ={LoginPage} options="false"/>} />
    //   <Route path="/register" element={< Auth component={RegisterPage} options="false"/>} />

    //   </Routes>
    // </Router>

<Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>


  );
}

export default App;
