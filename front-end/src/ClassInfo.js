import React,{useState,useEffect} from'react';
import MenuBar from './MenuBar';
import './ClassInfo.css';
import './MenuBar.css';
import {useHistory,useLocation} from 'react-router-dom';
import ClassDetail from './ClassDetail';
import axios from "axios";

function ClassInfo(props){
  // const location = useLocation();
  const history = useHistory();
    
    const [classinfo, setClassInfo] = useState([]);
    // const class_info = [classinfo];
    useEffect(() => {
      console.log(history.location.state)
      const details = history.location.state.detail
      // console.log(location.history)
      // a nested function that fetches the data
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        await axios(
          // retrieving some mock data about animals for sale
          // `http://waitlisthopper.com:3000/class_info?section=${details.sections[0].secCode}&course=${details.courseNum}`
          `http://localhost:3000/class_info?section=${details.sections[0].secCode}&course=${details.courseNum}`
          ).then(res=>setClassInfo({
            state:true,
            data:res.data
        }));
        // set the state variable
        // this will cause a re-render of this component
        // setClassInfo(result.data);
      }
      // fetch the data!
      fetchData();

    // the blank array below causes this callback to be executed only once on component load
  }, []);
    
    return(

        <div className="ClassInfo">
            <div className = "menu">
                <MenuBar>

                </MenuBar>
            </div>
            <div className = "classinfo">
            {/* {class_info.map(item => (
              <ClassDetail key={item.class_number} details={item} page='class_info'/>
            ))} */}
            {
              classinfo.state ?
              <ClassDetail key={classinfo.data.class_number} details={classinfo.data} page='class_info'/>:
              null
            }
            
            </div>
        </div>

    )
}

export default ClassInfo
