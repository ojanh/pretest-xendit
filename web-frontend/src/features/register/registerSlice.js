import Axios from "axios"
import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
      isRegistered: false
    },
    reducers: {
        setRegister: (state, {payload: isRegister}) =>{
            state.isRegistered = isRegister;
        }
    }
});

const {setRegister} = registerSlice.actions

export const doRegister = data => dispatch => {

    Axios.post('http://localhost:8080/register', data).then(
        dispatch(setRegister(true))
    )
}

export const getRegister = state => state.register;


export default registerSlice.reducer;
