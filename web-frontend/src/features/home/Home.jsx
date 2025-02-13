import React, { useState } from 'react';
import { useNavigate } from '@reach/router';
import {useForm} from 'react-hook-form';
import {setAuth, getAuth} from '../../app/authSlice';
import { doLogin } from './homeSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


const Home = () => {
    const navigate = useNavigate();
    const {register, handleSubmit,  errors } = useForm()
    const dispatcher = useDispatch();

    const {isAuth} = useSelector(getAuth);

    const loginFunc = data => {
        console.log(data);
        
        dispatcher(doLogin(data.username, data.password));
    }

    useEffect(()=>{
       if (isAuth){
           console.log(isAuth);
           
           navigate('/');
       } 
    }, [isAuth]);
   
    return (
    <div className="container-fluid">
        <div className="row d-flex justify-content-center align-content-center" style={{marginTop: "15%"}}>
            <div className="col-6 text-center">
                <div>
                    <h3>Login</h3>
                </div>
                <form onSubmit={handleSubmit(loginFunc)}>
                    <div className="form-group col-3 mx-auto">
                        <div className="row">
                            <input type="text" name="username" placeholder="Username" className="form-control" 
                                ref={register({required: true})}/>
                            {errors.username &&  <div className="invalid-feedback"> Username is Required! </div>}
                        </div>
                      
                    </div>
                    <div className="form-group col-3 mx-auto">
                        <input type="password" name="password" placeholder="password" className="form-control" 
                             ref={register({required: true})}/>
                        {errors.password && <div className="invalid-feedback"> Password is Required! </div>}
                    </div>

                    <div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
                <div className="mt-3">
                    <button className="btn btn-primary" onClick={()=>{navigate('/register')}}>Register</button>
                </div>
            </div>
        </div>
    </div>)
}

export default Home;