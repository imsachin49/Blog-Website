import React from 'react';
import './Header.css';
import { useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const AddBlog = () => {
    const Navigate=useNavigate();
    const [inputs,setInputs]=useState({
        title:"",
        description:"",
        imageURL:""
    });

    const handleChange=(e)=>{
        setInputs((prevstate)=>({
            ...prevstate,
            [e.target.name]:e.target.value,
        }));
    };

    const sendRequest=async()=>{
        const res=await axios.post("http://localhost:5000/api/blog/add",{
            title:inputs.title,
            description:inputs.description,
            image:inputs.imageURL,
            user:localStorage.getItem("userId"),
        }).catch(err=>console.log(err.res.data)); //err only
        const data=await res.data;
        return data;
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>Navigate("/blogs"))
                     .then((data)=>console.log(data))
    }

    return (
        <>
            <div className='whole'>
            <form className='frm' onSubmit={handleSubmit}>
                <input  type="text" name='title' onChange={handleChange} value={inputs.title} placeholder='Enter the title' required/>
                <textarea placeholder='Enter your content'name='description' onChange={handleChange} value={inputs.description} cols="120" rows="10" required></textarea>
                <input type="text" name='imageURL' onChange={handleChange} value={inputs.imageURL} placeholder='Enter image url' required/>
                <button type='submit'>Add Now</button>
            </form> 
            </div>   
        </>
    )
}

export default AddBlog
