import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import './Header.css'

const BlogDetails = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState();
    const id = useParams().id;
    console.log(id);
    const [inputs, setInputs] = useState({});
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const fetchDetails = async () => {
      const res = await axios
        .get(`http://localhost:5000/api/blog/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };
    useEffect(() => {
      fetchDetails().then((data) => {
        setBlog(data.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          imageURL:data.blog.image,
        });
      });
    }, [id]);
    const sendRequest = async () => {
      const res = await axios
        .put(`http://localhost:5000/api/blog/update/${id}`, {
          title: inputs.title,
          description: inputs.description,
        })
        .catch((err) => console.log(err));
  
      const data = await res.data;
      return data;
    };
    console.log(blog);
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs);
      sendRequest()
        .then((data) => console.log(data))
        .then(() => navigate("/myBlogs/"));
    };

    return (<div>
        { inputs &&
        <form className='frm' onSubmit={handleSubmit}>
            <input  type="text" name='title' onChange={handleChange} value={inputs.title} placeholder='Enter the title' required/>
            <textarea placeholder='Enter your content'name='description' onChange={handleChange} value={inputs.description} cols="120" rows="10" required></textarea>
            {/* <input type="text" name='imageURL' onChange={handleChange} value={inputs.imageURL} placeholder='Enter image url' required/> */}
            <button type='submit'>Update Now</button>
        </form>
        }
     </div>
    )
}

export default BlogDetails
