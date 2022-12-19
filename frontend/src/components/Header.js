import React from 'react'
import './Header.css'
import {useDispatch, useSelector} from "react-redux";
import {authActions} from '../store';
import {NavLink} from "react-router-dom";

const Header = () => {
    const isLoggedIn=useSelector(state=>state.isLoggedIn);
    const dispath=useDispatch();

    return(
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <p className='hi'>Blog App</p>

                <button class="navbar-toggler text-center" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span class="navbar-toggler-icon text-center"></span>
                </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
               { isLoggedIn && <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <NavLink class="nav-link active" to="/blogs" id='ij'>All Blogs</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink class="nav-link active" to="/myblogs">My Blogs</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink class="nav-link active" to="/blogs/add">Add Blog</NavLink>
                    </li>
                </ul>}
                
                <form class="form-inline">
                    { !isLoggedIn && <> 
                        <button class="btn btn-outline-light" type="button"><NavLink to='/auth'>LogIn</NavLink></button>
                        <button class="btn btn-outline-light" type="button"><NavLink href='/auth'>SignUp</NavLink></button> 
                    </>}
                    
                    {isLoggedIn && 
                        <button 
                        onClick={()=>dispath(authActions.logout())}
                        class="btn btn-outline-light" 
                        type="button">
                        <NavLink to='/auth'>
                        LogOut
                        </NavLink>
                        </button>}
                </form>
              </div>
            </nav>
        </>
    )
}

export default Header;
