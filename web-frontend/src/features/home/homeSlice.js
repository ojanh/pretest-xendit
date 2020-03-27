import React from 'react'
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuth } from '../../app/authSlice';

  

  export const doLogin = (username, password) => dispatch => {
    axios.post('http://localhost:8080/login', {
        email: username,
        password
    }).then(res=>{

        dispatch(setAuth({  
            isAuth: true
        }))
    }, err => {
        
        dispatch(setAuth({  
            isAuth: false
        }))
    })
  };
  