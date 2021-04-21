
import React,{useState,useEffect} from'react';
import axios from "axios";
import './ClassModules.css';
import {Link} from 'react-router-dom';
import ClassInfo from './ClassInfo';
import Course from "./Course";


function ClassModules(props){
  // const auth = props.auth;
  const [userHistory, setUserHistory] = useState([]);
  useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      let result;
      if(props.page!='accounts'){
        result = await axios(
  
          // linking to the back-end instead of to mockaroo now
          'http://localhost:3000/class_modules'
        );
      }
      else{
        result = await axios(
          'http://localhost:3000/class_modules/protected',{
            headers:{
              'auth':props.auth,
              'username':props.username
            }
          }
        );
      }

      console.log(result.data);
      // set the state variable
      // this will cause a re-render of this component
      setUserHistory(result.data);
    }
    fetchData();
    console.log(userHistory);
  }, []);
    if(props.page=='results'){
      return (
        
        <>

          <div className="ClassModules">
  
            {userHistory.map(item => (
              <Course page={props.page} key={item.courseNum,item.courseName} details={item} />
              // <Semester key={item.semester} details={item} />
            ))}
          </div>
        </>
      );
    }
    else if(props.page=='accounts'){
      if(!props.auth){
        return (
          <>
            <div className="ClassModules">
              {userHistory.map(item => (
                <Course page={props.page} key={item.courseNum} details={item} />
                // <Semester key={item.semester} details={item} />
              ))}
            </div>
          </>
        );
      }
      else{
        //console.log('User History ', userHistory[0]);
        const keyObj = {courseNum: userHistory[0].courseNum, waitlistPos: userHistory[0].waitlistPos};
        //console.log(keyobj);
        return (
          <>
            <div className="ClassModules" auth={props.auth}>
              {userHistory.map(item => (
                <Course page={props.page} key={keyObj} details={item} />
                // <Semester key={item.semester} details={item} />
              ))}
            </div>
          </>
        );
      }

    }
    else if(props.page=='professors'){
      return (
        <>
          <div className="ClassModules">
            {userHistory.map(item => (
              <Course page={props.page} key={item.courseNum} details={item} />
              // <Semester key={item.semester} details={item} />
            ))}
          </div>
        </>
      );
    }
    

}

export default ClassModules