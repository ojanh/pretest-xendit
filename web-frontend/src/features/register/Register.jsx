import React, { useState } from 'react';
import { useNavigate } from '@reach/router';
import { useForm } from 'react-hook-form';

const Register = () => {

    const navigate = useNavigate();
    const {register, handleSubmit,  errors, watch } = useForm()

  

    const doLogin = data => {
        console.log(data)
        
    }
    console.log(errors);
    
    return (
        <div className="container-fluid">
        <div className="row d-flex justify-content-center align-content-center" style={{marginTop: "15%"}}>
            <div className="col-6 text-center">
                <div>
                    <h3>Register</h3>
                </div>
                <form onSubmit={handleSubmit(doLogin)}>
                    <div className="form-group col-3 mx-auto">
                       
                        <input type="text" name="username" placeholder="Username" className="form-control" 
                            ref={register({required: true})}/>
                        {errors.username &&  <div className="invalid-feedback"> Username is Required! </div>}
                   
                      
                    </div>
                    <div className="form-group col-3 mx-auto">
                        <input type="password" name="password" placeholder="password" className="form-control" 
                             ref={register({required: true})}/>
                        {errors.password && <div className="invalid-feedback"> Password is Required </div>}
                    </div>

                    <div className="form-group col-3 mx-auto">
                        <input type="password" name="confirmPassword" placeholder="password" className="form-control" 
                             ref={register({required: true, validate: value => {
                                const watchPassword = watch('password');

                                return watchPassword === value;
                             } })}/>
                        {errors?.confirmPassword?.type === 'required' && <div className="invalid-feedback"> Password is Required </div>}
                        {errors?.confirmPassword?.type === 'validate' && <div className="invalid-feedback"> Confirm Password not matched </div>}
                    </div>

                    <div>
                        <button className="btn btn-primary" type="submit">Register</button>
                    </div>
                </form>
                <div className="mt-3">
                    <button className="btn btn-primary" onClick={()=>navigate('/')}>Back to Login</button>
                </div>
            </div>
        </div>
    </div>)
}

export default Register;