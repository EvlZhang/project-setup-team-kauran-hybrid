import logo from './logo.svg';
//import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './Home.css'
import LoginForm from'./LoginForm'
import { Link } from 'react-router-dom';
import "./MenuBar.css";
const MenuBar=()=>{
    return (
        
        <div classname="menu">
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             
            </link> 
            <div className="many-links"> 
            
                <Link to="/" className="menu-links"> Home
                {/* <button className="btn"><i className="fa fa-home"></i> Home</button>  */}
                </Link>

                <Link to="./Account" className="menu-links"> MyAccount
                {/* <button className="btn">My Account</button> */}
                </Link>
                
                <Link to="./Login" className="menu-links"> Login/Logout
                {/* <button className="btn">Login/Logout</button> */}
                </Link>

                {/* <button className="btn"><i class="fa fa-folder"></i> Folder</button> */}
            
            </div>
           

            <center>
            <Link to ="/">
            <img src={logo} className="App-logo" alt="logo" />
            </Link>
            
            <p>
                Waitlisted?
            </p>
            
            </center>
        </div>
        
    )
    
}
export default MenuBar;