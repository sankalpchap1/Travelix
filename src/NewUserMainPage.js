import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import DropDown from "./DropDown";
import { ActionAreaCard } from "./ActionAreaCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function NewUserMainPage() {
  // new line start
  const { selectedStates, selectedCategories } = useLocation().state;
  const [nprData, setNprData] = useState(null);
  const [mfData, setMfData] = useState(null);
  const [aecfData, setAecfData] = useState(null);
  console.log(selectedCategories, selectedStates);
  const stateNames = {
    PA: "Pennsylvania",
    FL: "Florida",
    TN: "Tennessee",
    IN: "Indiana",
    MO: "Missouri",
    LA: "Louisiana",
    AZ: "Arizona",
    NJ: "New Jersey",
    NV: "Nevada",
    AB: "Alabama",
  };
  const typesDict = {
    Hotels: "hotel",
    Restaurants: "restaurent",
    NightLife: "nightlife",
  };
  const swappedStateNames = Object.entries(stateNames).reduce(
    (acc, [key, value]) => {
      acc[value] = key;
      return acc;
    },
    {}
  );
  const [usState, setUsState] = useState(null);
  const [category, setCategory] = useState(null);
  function getAllData(type, state) {
    axios({
      method: "GET",
      url: `/${type}/${state}/0/getAll`,
    })
      .then((response) => {
        const res = response.data;
        setNprData([...res.npr]);
        setMfData([...res.mf]);
        setAecfData([...res.aecf]);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  // function getMfData(type, state) {
  //     axios({
  //         method: "GET",
  //         url: `/${type}/${state}/0/getMF`,
  //     })
  //         .then((response) => {
  //             const res = response.data
  //             setMfData([...res]);
  //         }).catch((error) => {
  //             if (error.response) {
  //                 console.log(error.response)
  //                 console.log(error.response.status)
  //                 console.log(error.response.headers)
  //             }
  //         })
  // }
  // function getAECFData(type, state) {
  //     axios({
  //         method: "GET",
  //         url: `/${type}/${state}/0/getAECF`,
  //     })
  //         .then((response) => {
  //             const res = response.data
  //             setAecfData([...res]);
  //         }).catch((error) => {
  //             if (error.response) {
  //                 console.log(error.response)
  //                 console.log(error.response.status)
  //                 console.log(error.response.headers)
  //             }
  //         })
  // }

  useEffect(() => {
    if (usState && category) {
      console.log(usState, category);
      getAllData(typesDict[category], swappedStateNames[usState]);
    }
  }, [usState, category]);

  useEffect(() => {}, [nprData, aecfData]);

  //end of new line

  return (
    <div className="wrapper">
      <header>
        <div class="netflixLogo">
          <Link to="/">
            <a id="logo">
              <img
                src="https://github.com/bassirishabh/Travelix/blob/master/public/travelix.png?raw=true"
                alt="Logo Image"
              ></img>
            </a>
          </Link>
        </div>
        <nav className="main-nav">
          <DropDown
            className="small-nav"
            options={selectedCategories}
            state={category}
            setState={setCategory}
            label="Category"
          ></DropDown>
          <DropDown
            className="small-nav"
            options={selectedStates}
            state={usState}
            setState={setUsState}
            label="State"
          ></DropDown>
        </nav>
        <nav className="sub-nav">
          <a href="#">
            <i className="fas fa-search sub-nav-logo"></i>
          </a>
          <a href="#">
            <i className="fas fa-bell sub-nav-logo"></i>
          </a>
        </nav>
      </header>

      <section className="main-container">
        <div className="location" id="home">
          <h1 id="home">Popular on Travelix</h1>
          <div className="box">
            {nprData &&
              nprData.map((business) => (
                <ActionAreaCard business={business}></ActionAreaCard>
              ))}
          </div>
        </div>

        {/* <h1 id="myList">Recommendations based on your Travel History</h1>
        <div className="box">
          {mfData &&
            mfData.map((business) => (
              <ActionAreaCard business={business}></ActionAreaCard>
            ))}
        </div> */}

        <h1 id="tvShows">Recommendations based on your Preferences</h1>
        <div class="box">
          {aecfData &&
            aecfData.map((business) => (
              <ActionAreaCard business={business}></ActionAreaCard>
            ))}
        </div>
      </section>
      <section className="link">
        <div className="logos">
          <a href="#">
            <i className="fab fa-facebook-square fa-2x logo"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram fa-2x logo"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter fa-2x logo"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube fa-2x logo"></i>
          </a>
        </div>
        <div className="sub-links">
          <ul>
            <li>
              <a href="#">Hotels</a>
            </li>
            <li>
              <a href="#">Restaurants</a>
            </li>
            <li>
              <a href="#">Shopping</a>
            </li>
            <li>
              <a href="#">Travel</a>
            </li>
            <li>
              <a href="#">Tourism</a>
            </li>
            <li>
              <a href="#">Business</a>
            </li>
            <li>
              <a href="#">Users</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Legal Notices</a>
            </li>
            <li>
              <a href="#">Corporate Information</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
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

export default NewUserMainPage;
