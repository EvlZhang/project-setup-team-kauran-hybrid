import React from'react';
import ReactDOM from 'react-dom';
import MenuBar from './MenuBar';
import './Account.css';
import './MenuBar.css';
import './ClassModules.css';
import ClassModules from'./ClassModules';
import {Link,Switch} from 'react-router-dom';

const Account = (props) => {
    //below is your authenticated token!
    //console.log(props.history.location.auth);
    if(props.history.location.auth){
        return (
            <div>
                <div className = "menu">
                   <MenuBar>
       
                   </MenuBar>
                   </div>
           <div className = "account-page">
                   
                   {/* <p>
                     Waitlisted?
                   </p> */}
                   <p>
                       <ClassModules page='accounts' auth={props.history.location.auth}>
       
                       </ClassModules>
                   </p>
                   
               </div>
            </div>
               
        )
    }
    else{
        return(
            <div>
                <div className = "menu">
                   <MenuBar>
       
                   </MenuBar>
                   </div>
           <div className = "account-page">
                   
                   {/* <p>
                     Waitlisted?
                   </p> */}
                   <p>
                        You're not logged in!
                   </p>
                   
               </div>
            </div>
        )
    }
    
    
}
export default Account