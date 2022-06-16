import {useState, useEffect} from "react";
import { useAddOneContactMutation } from "../../data/todoApi";
import Configgroup from "../extra_modules/configgroup";
import { parseCookies } from 'nookies';

const PhonebookHeader = () => {
  const {jwt_token_TDL: token} = parseCookies();
  //Get user id
  const userId = localStorage.getItem("userId");

  //Set states
  const [contact, setContact] = useState("");
  const [addOneContact] = useAddOneContactMutation();

  //Add a todo
  function handleAddcontactSubmit(e)
  {
      e.preventDefault();
      addOneContact({userId,name: contact, token});
      setContact("");
  }

  return (
    <>
      <header className="header">
        <div className="header__panel">
          <h1 className="header__panel__title">To Do List</h1>
          <div className="header__panel__configgroup configgroup">
            <Configgroup/>
          </div>
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