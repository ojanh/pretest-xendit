import React, { Children } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import Home from './features/home/Home';
import {Router, Redirect} from '@reach/router';
import Register from './features/register/Register';
import { useSelector } from 'react-redux';
import { getAuth } from './app/authSlice';
import Message from './features/message/Message';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/login"/>
        <Register path="/register" />
        <ProtectedRoute component={Message} path="/" />
        
      </Router>
    </div>
  );
}

const ProtectedRoute = ({component: Component, ...rest}) => {
  const {isAuth, token} = useSelector(getAuth);
  
  return !isAuth ? <Redirect to="/login" noThrow/> : <Component {...rest} />;
}

export default App;
