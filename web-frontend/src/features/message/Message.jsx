import React, { useState } from 'react';
import { useNavigate } from '@reach/router';
import { useForm } from 'react-hook-form';
import style from './Message.module.scss';

const Message = () => {

    const navigate = useNavigate();
    const {register, handleSubmit,  errors, watch } = useForm()

  
    return (
    <div className="container-fluid">
       <div className="row d-flex justify-content-center align-content-center" style={{marginTop: "15%"}}>
            <div className="col-6 row mb-3">
                <div className="col-12 d-inline-flex px-0">
                    <div className="col-1 text-right">
                        <div><span class="iconify" data-icon="dashicons:arrow-up-alt" data-inline="false"></span></div>
                        <div>10</div>
                        <div><span class="iconify" data-icon="dashicons:arrow-down-alt" data-inline="false"></span></div>
                    </div>
                    <div className={`col-11 ${style['border-black']} ${style['background-white']}`}>
                        
                    </div>
                </div>

                <div className={`offset-1 col-11 px-0 mt-3`}>
                    <textarea name="comment" rows="3" placeholder="Enter your comment here..."
                        className={`form-control ${style['border-black']} ${style['center-placeholder']}`}></textarea>
                </div>
                <div className={`offset-1 col-11 mt-3 text-center`}>
                    <button className="btn btn-primary">Submit</button>
                </div>
                <div className={`col-12 my-3 text-center px-0`} >
                    <hr className={`${style['black-striped']}`} />
                </div>

                <div className="col-12 d-inline-flex px-0">
                    <div className="col-1 text-right">
                        <div><span class="iconify" data-icon="dashicons:arrow-up-alt" data-inline="false"></span></div>
                        <div>10</div>
                        <div><span class="iconify" data-icon="dashicons:arrow-down-alt" data-inline="false"></span></div>
                    </div>
                    <div className={`col-11 ${style['border-black']} ${style['background-white']}`}>
                        
                    </div>
                </div>
            </div>
           
           
        </div>
    
    </div>)
}

export default Message;