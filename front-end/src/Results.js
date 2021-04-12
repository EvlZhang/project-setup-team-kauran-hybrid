import React from'react';
import MenuBar from './MenuBar';
import './Results.css';
import './MenuBar.css';
import './ClassModules.css';
import ClassModules from'./ClassModules';
import axios from "axios";
import {useState,useEffect} from'react';

const Results=(props)=>{
    const [probGetIn, setProbGetIn] = useState([]);
    useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      const result = await axios(
  
        // linking to the back-end instead of to mockaroo now
        'http://localhost:3000/results'
      );
      //console.log(result.data);
      // set the state variable
      // this will cause a re-render of this component
      setProbGetIn(result.data);
    }
  
    // fetch the data!
    fetchData();
  
  // the blank array below causes this callback to be executed only once on component load
  }, []);
  //console.log(probGetIn);

    return(
        <div>
            <div className = "menu">
                <MenuBar>

                </MenuBar>
            </div>
            <div className="results-page">

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             
                </link>
                <p>Your possibility of getting into this class is: {probGetIn}% {"\n"}

                    Here are some alternative classes.
                </p>
                <ClassModules page='results'>

                </ClassModules>
                <p> Would you like to login and store this search?</p>
                <p>

                    <a href="/Login" className="results-button">YES!</a>

                    <a href="/" className="results-button">NO! Go Back</a>
                
                </p>
            </div>
        </div>

    )

};

export default Results;
  