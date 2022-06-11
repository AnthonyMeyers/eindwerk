import { NavLink} from "react-router-dom";
import {useState, useEffect} from "react";
import { useAddOneContactMutation } from "../../data/todoApi";

const PhonebookHeader = () => {
  //Set states
  const [contact, setContact] = useState("");
  const [addOneContact] = useAddOneContactMutation();

  //Add a todo
function handleAddcontactSubmit(e)
{
    e.preventDefault();
    addOneContact({userId: 9,name: contact });
    setContact("");
}

  return (
    <>
      <header className="header">
        <div className="header__panel">
          <h1 className="header__panel__title">To Do List</h1>
          <NavLink to="/phonebook" className="header__panel__config">
            <button className="header__panel__config__sublink">
              <span className="header__panel__config__sublink__text">
                configuration
              </span>
            </button>
          </NavLink>
          <NavLink to="/settings" className="header__panel__config">
            <button className="header__panel__config__sublink">
              <span className="header__panel__config__sublink__text">
                configuration
              </span>
            </button>
          </NavLink>
        </div>
        <form className="header__todoform" onSubmit={handleAddcontactSubmit}>
          <label for="input-todo" className="header__todoform__label">
           Contact name
            <input
              class="header__todoform__label__todoinput form-control form-control-lg"
              type="text"
              id="input-todo"
              autoComplete="off"
              spellCheck="false"
              value={contact}
              onInput={(e) => setContact(e.target.value)}
            />
          </label>
          <button type="submit" className="header__todoform__addtodo">
            <span className="header__todoform__addtodo__text">
              Add todo submit button
            </span>
          </button>
        </form>
      </header>
    </>
  );
}

export default PhonebookHeader;