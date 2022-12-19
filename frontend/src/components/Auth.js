import React, { useState } from 'react';
import "./Header.css";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authActions} from "../store";

const Auth = () => {
    const navigate=useNavigate();
    const dispath=useDispatch();
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:""
    })
    const [isSignup,setIsSignup]=useState(false);

    const handleChange=(e)=>{
        setInputs((prevstate)=>({
            ...prevstate,
            [e.target.name]:e.target.value,
        }));
    };

    const sendRequest=async(type="login")=>{
        const res=await axios.post(`http://localhost:5000/api/user/${type}`,{
            name:inputs.name,
            email:inputs.email,
            password:inputs.password
        }).catch(err=>console.log(err.message))
    
        const data=await res.data;
        // console.log(res);
        return data;
    }
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs);
        if(isSignup){
            sendRequest("signup")
                .then((data)=>localStorage.setItem("userId",data.user._id))
                .then(()=>dispath(authActions.login()))
                .then(()=>navigate("/blogs"))
                .then((data)=>console.log(data));
        }else{
            sendRequest()
                .then((data)=>localStorage.setItem("userId",data.user._id))
                .then(()=>dispath(authActions.login()))
                .then(()=>navigate("/blogs"))
                .then(data=>console.log(data));
        }
    };

    return (
        <div>
        <br />
            <div className='my'>
            <form className='form' onSubmit={handleSubmit}>
                <h1>{!isSignup ? "Login" :"SignUp"}</h1>
                {isSignup && 
                <input 
                    name='name' 
                    type="text" 
                    placeholder='Enter Your Name'
                    value={inputs.name} 
                    onChange={handleChange} 
                    required
                />}
                <input 
                    name='email' 
                    type="email" 
                    placeholder='Enter Email' 
                    value={inputs.email} 
                    onChange={handleChange} 
                    required
                />
                <input 
                    name='password' 
                    type="password" 
                    placeholder='Password' 
                    value={inputs.password} 
                    onChange={handleChange} 
                    required
                />
                <button type='submit' className='sub'>Submit</button><br /> 
                <p onClick={()=>{setIsSignup(!isSignup)}}>
                    <a href="#"> {!isSignup ? "New User Click to signup" : "Click for Login page."} </a>
                </p>
            </form>
            </div>
        </div>
    )
}

export default Auth
