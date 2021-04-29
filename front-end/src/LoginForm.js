import React,{useState} from'react';
import './LoginForm.css'
import { useHistory } from 'react-router-dom';
import Results from './Results';
import axios from 'axios';

//import "../back-end/app.js";
const LoginForm=(props)=> {

    
    const [email,setEmail]=useState("Enter your email");
    const [position,setPosition]=useState("Enter your waitlist position");
    const [number,setNumber]=useState("Enter your class number");
    const [submit, setSubmit]=useState();
    const [machineRe,setMachineRe]=useState([]);
    const history=useHistory();
    const handleChange = ({ target }) => {
      setEmail( target.value );
    };
    const handlePosition=({target})=>{
        setPosition(target.value);
    };
    const handleNumber=({target})=>{
        setNumber(target.value)
    };
    const handleClickEmail = (e) => {
      setEmail('');
    };
    const handleClickNumber = () => {
      setNumber('');
    };
    const handleClickPos = () => {
      setPosition('');
    };
    const  handleClickSubmit =async() =>{
      
      {
        
            await axios.post('http://localhost:3000/home_login',{
              
              email:email,
              position:position,
              number:number
              }
            );
          
      }

    };

    //render() {
      return (
        <React.Fragment>

            <form action="home_login" method ="POST" className="box">
              <p>
                {/* <label htmlFor="email">Email</label> */}
                  <input className="inputs"
                  type="email"
                  name="email"
                  value={email}

                  onChange={handleChange}
                  onClick={handleClickEmail}
                  />
              </p>
            
              <p>
              {/* <label htmlFor="position">position</label> */}
                  <input className="inputs"
                  type="position"
                  name="position"
                  value={position}

                  onChange={handlePosition}
                  onClick={handleClickPos}
                  />
              </p>

              <p>
                {/* <label htmlFor="number">number</label> */}
                <input className="inputs"
                type="2"
                name="number"
                
                value={number}

                onChange={handleNumber}
                onClick={handleClickNumber}
                />
              </p>          

              <center>
             
                <a href="/Results" className="goButton" onClick={handleClickSubmit}>
                  Let's Hop  
                      
                </a>
                
              </center>

            </form>

        </React.Fragment>

      );
    
    //}
   }
export default LoginForm