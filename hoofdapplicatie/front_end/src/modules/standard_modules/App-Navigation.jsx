import React from "react";

const AppNavigation = () => {
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
        />
      </label>
    </form>
  );
};

export default AppNavigation;
