import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const AppNavigation = () => {
  //Get the location
  let url = location.href;

  const [isMainPage, setIsMainPage] = useState(url.endsWith("/appointments"));
  const nav = useNavigate();

  function handleContentcycleSwitch() {
    if (isMainPage === false) {
      nav("/appointments");
    } else nav("/todos");
    setIsMainPage(!isMainPage);
  }

  return (
    <div className="navcontainer">
      <form className="navcontainer__navigation form-check form-switch">
        <label
          className="navcontainer__navigation__textlabel form-check-label"
          htmlFor="flexSwitchCheckDefault"
        >
          Todo / calender
          <input
            className="navcontainer__navigation__textlabel__switch form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={isMainPage}
            onClick={handleContentcycleSwitch}
          />
        </label>
      </form>
    </div>
  );
};

export default AppNavigation;
