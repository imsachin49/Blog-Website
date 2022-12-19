import React from 'react'
import './Header.css'
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
      navigate(`/myBlogs/${id}`);
    };

    const deleteRequest = async () => {
      const res = await axios
        .delete(`http://localhost:5000/api/blog/${id}`)
        .catch((err) => console.log(err));
        const data = await res.data;
        return data;
      };
      
      const handleDelete = () => {
      alert("deleting the blog");
      deleteRequest()
        .then(() => navigate("/"))
        .then(() => navigate("/blogs"));
    };

    console.log(title,isUser);
    return (
        <>
            <div class="card">
                {isUser &&
                    <div className='top'>
                        <h2 class="card-title">{title}</h2>
                        <img onClick={handleEdit} id='edit' src='https://cdn-icons-png.flaticon.com/512/1828/1828911.png' height="20px" alt='njhgcf'/>
                        <img onClick={handleDelete} id='delete' src='https://cdn-icons-png.flaticon.com/128/8102/8102162.png' height="20px" alt='hhgdf'/>
                    </div>
                }
                <img class="card-img-top" src={imageURL} alt="Cards-cap" width="100px"/>
                <div class="card-body">
                  <p class="card-text"><b>{userName}</b> {": "} {description}</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div> 
        </>
    )
}

export default Blog


