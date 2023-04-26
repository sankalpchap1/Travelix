import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import DropDown from './DropDown';
function App() {

   // new line start
  const [profileData, setProfileData] = useState(null)
  const states = ['PA', 'FL', 'TN', 'IN', 'MO', 'LA', 'AZ', 'NJ', 'NV', 'AB']
  const users = ['UID1', 'UID2' , 'UID3']
  
  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    //end of new line 

  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//
//        {/* new line start*/}
//        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
//        {profileData && <div>
//              <p>Profile name: {profileData.profile_name}</p>
//              <p>About me: {profileData.about_me}</p>
//            </div>
//        }
//         {/* end of new line */}
//      </header>
//    </div>
<div className="wrapper">
    <header>
      <div class="netflixLogo">
        {/*<a id="logo" href="#home"><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/logo.PNG?raw=true" alt="Logo Image"></img></a>*/}
        <a id="logo" href="#home"><img src="https://github.com/bassirishabh/Travelix/blob/master/public/travelix.png?raw=true" alt="Logo Image"></img></a>

      </div>
      <nav className="main-nav">
        <a href="#home">Restaurants</a>
        <a href="#tvShows">Hotels</a>
        <a href="#movies">Shopping</a>
      </nav>
      <nav className="sub-nav">
        <a href="#"><i className="fas fa-search sub-nav-logo"></i></a>
        <a href="#"><i className="fas fa-bell sub-nav-logo"></i></a>
        <DropDown options={users} label="User"></DropDown>
        <DropDown options={states} label="State"></DropDown>
      </nav>
    </header>

    <section className="main-container" >
      <div className="location" id="home">
          <h1 id="home">Popular on Travelix</h1>
          <div className="box">
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p1.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p2.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p3.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p4.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p5.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p6.PNG?raw=true" alt=""></img></a>

            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p7.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p8.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p9.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p10.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p11.PNG?raw=true" alt=""></img></a>
            <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p12.PNG?raw=true" alt=""></img></a>
          </div>
      </div>


      <h1 id="myList">Recommended for You</h1>
      <div className="box">
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t1.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t2.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t3.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t4.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t5.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/t6.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p7.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p8.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p9.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p10.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p11.PNG?raw=true" alt=""></img></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p12.PNG?raw=true" alt=""></img></a>

      </div>



      <h1 id="tvShows">CF Recommendations</h1>
      <div class="box">
        <a style={{textDecoration: 'none'}} href="">
                <div class="tile" style={{backgroundColor: '#B3E5FC'}}>
                <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p12.PNG?raw=true" alt="Hotel Image"/>
                <div class="hotel-title">
                    <h3>Radisson Blue</h3>
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

        <a style={{textDecoration: 'none'}} href="">
                <div class="tile" style={{backgroundColor: '#B3E5FC'}}>
                <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv2.PNG?raw=true" alt="Hotel Image"/>
                <div class="hotel-title">
                    <h3>Radisson Blue</h3>
                </div>
                </div>
             </a>

        <a style={{textDecoration: 'none'}} href="">
                <div class="tile" style={{backgroundColor: '#B3E5FC'}}>
                <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv3.PNG?raw=true" alt="Hotel Image"/>
                <div class="hotel-title">
                    <h3>Radisson Blue</h3>
                </div>
                </div>
             </a>

        <a style={{textDecoration: 'none'}} href="">
                <div class="tile" style={{backgroundColor: '#B3E5FC'}}>
                <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv4.PNG?raw=true" alt="Hotel Image"/>
                <div class="hotel-title">
                    <h3>Radisson Blue</h3>
                </div>
                </div>
             </a>

         <a style={{textDecoration: 'none'}} href="">
                <div class="tile" style={{backgroundColor: '#B3E5FC'}}>
                <img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv5.PNG?raw=true" alt="Hotel Image"/>
                <div class="hotel-title">
                    <h3>Radisson Blue</h3>
                </div>
                </div>
             </a>

        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv1.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv2.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv3.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv4.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv5.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv6.PNG?raw=true" alt=""/></a>

        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv7.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv8.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv9.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv10.PNG?raw=true" alt=""/></a>
        <a href=""><img src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/tv11.PNG?raw=true" alt=""/></a>
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