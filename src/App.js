import { useState, useEffect } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import DropDown from './DropDown';
import { ActionAreaCard } from './ActionAreaCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  // new line start
  const [value, setValue] = useState(0);
  const [nprData, setNprData] = useState(null)
  const [mfData,setMfData] = useState(null)
  const stateNames = { 'PA': 'Pennsylvania', 'FL': 'Florida', 'TN': 'Tennessee', 'IN': 'Indiana', 'MO': 'Missouri', 'LA': 'Louisiana', 'AZ': 'Arizona', 'NJ': 'New Jersey', 'NV': 'Nevada', 'AB': 'Alabama' }
  const users = ['0', '1', '2', '3']
  const typesDict = {0:'hotel',1:'restaurant',2:'shopping'}
  const swappedStateNames = Object.entries(stateNames).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
  const handleChangeType = (event,newValue) => {
    console.log(newValue)
    setValue(newValue);
    console.log(value)
  };
  const stateValues = Object.values(stateNames);
  const [usState, setUsState] = useState(null)
  const [userId, setUserId] = useState(null)
  function getnprData(type,user, state) {
    axios({
      method: "GET",
      url: `/${type}/${state}/${user}/getNPR`,
    })
      .then((response) => {
        const res = response.data
        setNprData([...res]);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }
  function getMfData(type,user, state) {
    axios({
      method: "GET",
      url: `/${type}/${state}/${user}/getMF`,
    })
      .then((response) => {
        const res = response.data
        setMfData([...res]);
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  useEffect(() => {
    if (usState && userId) {
      console.log(usState, userId)
      getnprData(typesDict[value],userId, swappedStateNames[usState])
      getMfData(typesDict[value],userId,swappedStateNames[usState])
    }
  }, [usState, userId,value]);


  //end of new line 

  return (
    //  <div className="App">
    //    <header className="App-header">
    //      <img src={logo} className="App-logo" alt="logo" />
    //      <p>
    //        Edit <code>src/App.js</code> and save to reload.
    //      </p>
    //      <a
    //        className="App-link"
    //        href="https://reactjs.org"
    //        target="_blank"
    //        rel="noopener noreferrer"
    //      >
    //        Learn React
    //      </a>

    //      {/* new line start*/}


    //  </div>
    <div className="wrapper">
      <header>
        {/* <p>To get your profile details: </p><button onClick={getData}>Click me</button>
       {profileData && <div>
             <p>Profile name: {profileData.profile_name}</p>
             <p>About me: {profileData.about_me}</p>
           </div>
       } */}
        <div class="netflixLogo">
          {/*<a id="logo" href="#home"><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/logo.PNG?raw=true" alt="Logo Image"></img></a>*/}
          <a id="logo" href="#home"><img src="https://github.com/bassirishabh/Travelix/blob/master/public/travelix.png?raw=true" alt="Logo Image"></img></a>

        </div>
        <nav className="main-nav">
          {/* <a href="#home">Restaurants</a>
          <a href="#tvShows">Hotels</a>
          <a href="#movies">Shopping</a> */}
          <Box sx={{ width: '100%' ,marginTop: "10px"}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChangeType} aria-label="basic tabs example">
                <Tab sx={{color : "white" }} label="Hotels" {...a11yProps(0)} />
                <Tab sx={{color : "white"}} label="Restaurants" {...a11yProps(1)} />
                <Tab sx={{color : "white"}} label="Shopping" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>
            <TabPanel value={value} index={2}>
            </TabPanel>
          </Box>
          <DropDown className="small-nav" options={users} state={userId} setState={setUserId} label="User" ></DropDown>
          <DropDown className="small-nav" options={stateValues} state={usState} setState={setUsState} label="State"></DropDown>

        </nav>
        <nav className="sub-nav">
          <a href="#"><i className="fas fa-search sub-nav-logo"></i></a>
          <a href="#"><i className="fas fa-bell sub-nav-logo"></i></a>
        </nav>
      </header>

      <section className="main-container" >
        <div className="location" id="home">
          <h1 id="home">Popular on Travelix</h1>
          <div className="box">
            {nprData && nprData.map(business => (
                <ActionAreaCard business={business}></ActionAreaCard>
            ))}
          </div>
        </div>


        <h1 id="myList">Recommended for You</h1>
        <div className="box">
        {mfData && mfData.map(business => (
                <ActionAreaCard business={business}></ActionAreaCard>
            ))}
        </div>



      <h1 id="tvShows">CF Recommendations</h1>
      <div class="box">

        <ActionAreaCard business ={"business"} />

        <a style={{textDecoration: 'none'}} href="">
                <div class="tile" style={{backgroundColor: '#CCCCCC'}}>
                <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p12.PNG?raw=true" alt="Hotel Image"/>
                <div class="hotel-title">
                    <p> <h3>Radisson Blue</h3>
                    This hotel is located in Texas near College Station. <br/> Rating : 5.0</p>
                </div>
                </div>
             </a>

        <a style={{textDecoration: 'none'}} href="">
                <div class="tile" style={{backgroundColor: '#B3E5FC'}}>
                <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv1.PNG?raw=true" alt="Hotel Image"/>
                <div class="hotel-title">
                    <h3>Radisson Blue</h3>
                </div>
                </div>
         </a>

          <a style={{ textDecoration: 'none' }} href="">
            <div class="tile" style={{ backgroundColor: '#B3E5FC' }}>
              <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv2.PNG?raw=true" alt="Hotel Image" />
              <div class="hotel-title">
                <h3>Radisson Blue</h3>
              </div>
            </div>
          </a>

          <a style={{ textDecoration: 'none' }} href="">
            <div class="tile" style={{ backgroundColor: '#B3E5FC' }}>
              <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv3.PNG?raw=true" alt="Hotel Image" />
              <div class="hotel-title">
                <h3>Radisson Blue</h3>
              </div>
            </div>
          </a>

          <a style={{ textDecoration: 'none' }} href="">
            <div class="tile" style={{ backgroundColor: '#B3E5FC' }}>
              <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv4.PNG?raw=true" alt="Hotel Image" />
              <div class="hotel-title">
                <h3>Radisson Blue</h3>
              </div>
            </div>
          </a>

          <a style={{ textDecoration: 'none' }} href="">
            <div class="tile" style={{ backgroundColor: '#B3E5FC' }}>
              <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv5.PNG?raw=true" alt="Hotel Image" />
              <div class="hotel-title">
                <h3>Radisson Blue</h3>
              </div>
            </div>
          </a>

          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv1.PNG?raw=true" alt="" /></a>
          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv2.PNG?raw=true" alt="" /></a>
          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv3.PNG?raw=true" alt="" /></a>
          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv4.PNG?raw=true" alt="" /></a>
          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv5.PNG?raw=true" alt="" /></a>
          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv6.PNG?raw=true" alt="" /></a>

          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv7.PNG?raw=true" alt="" /></a>
          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv8.PNG?raw=true" alt="" /></a>
          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv9.PNG?raw=true" alt="" /></a>
          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv10.PNG?raw=true" alt="" /></a>
          <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv11.PNG?raw=true" alt="" /></a>
        </div>
        {/*

      <h1 id="movies">Blockbuster Action & Adventure</h1>
      <div className="box">
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m1.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m2.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m3.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m4.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m5.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/m6.PNG?raw=true" alt=""/></a>
      </div>

      <h1 id="originals">Netflix Originals</h1>
      <div className="box">
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o1.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o2.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o3.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o4.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o5.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/o6.PNG?raw=true" alt=""/></a>
      </div>
      */}
      </section>
      <section className="link">
        <div className="logos">
          <a href="#"><i className="fab fa-facebook-square fa-2x logo"></i></a>
          <a href="#"><i className="fab fa-instagram fa-2x logo"></i></a>
          <a href="#"><i className="fab fa-twitter fa-2x logo"></i></a>
          <a href="#"><i className="fab fa-youtube fa-2x logo"></i></a>
        </div>
        <div className="sub-links">
          <ul>
            <li><a href="#">Hotels</a></li>
            <li><a href="#">Restaurants</a></li>
            <li><a href="#">Shopping</a></li>
            <li><a href="#">Travel</a></li>
            <li><a href="#">Tourism</a></li>
            <li><a href="#">Business</a></li>
            <li><a href="#">Users</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Legal Notices</a></li>
            <li><a href="#">Corporate Information</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </section>

      <footer>
        <p>&copy; 2023 Travelix, Inc.</p>
        <p>&copy; RADS 2023</p>
      </footer>
    </div>
  );
}

export default App;