import React, { Component, useState } from "react";
import "./NavBar.css";
import { Button } from "../Button";

function NavBar() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <nav className="NavBarItems">
      <h1 className="navbar-logo">
        MaybeStocks<i className="fa-solid fa-arrow-trend-up"></i>
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        <li className="nav-links" key="1">
          <a href="#"> Home </a>
        </li>
        <li key="2" className="nav-links">
          <a href="#"> Portfolio </a>
        </li>
        <li key="3" className="nav-links">
          <a href="#"> Buy </a>
        </li>
        <li key="4" className="nav-links">
          <a href="#"> Sell </a>
        </li>
      </ul>
      <Button> Log In </Button>
    </nav>
  );
}

export default NavBar;
