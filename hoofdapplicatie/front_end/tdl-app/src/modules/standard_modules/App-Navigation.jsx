import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const AppNavigation = () => {
  let url = location.href;

  const [isMainPage, setIsMainPage] = useState(url.endsWith("/appointments"));
  const nav = useNavigate();

  function handleContentcycleSwitch()
  {
    if(isMainPage === false)
    {
      nav("/appointments")
    }else nav("/todos")
    setIsMainPage(!isMainPage);
  }

  return (
    <form className="navigation form-check form-switch">
      <label
        className="navigation__textlabel form-check-label"
        for="flexSwitchCheckDefault"
      >
        Todo / calender
        <input
          className="navigation__textlabel__switch form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={isMainPage}
          onClick={handleContentcycleSwitch}
        />
      </label>
    </form>
  );
};

export default AppNavigation;
