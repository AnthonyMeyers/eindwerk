import { useState } from "react";
import { useAddOneContactMutation } from "../../data/todoApi";
import Configgroup from "../extra_modules/Configgroup";
import { parseCookies } from "nookies";
import Errormessage from "../extra_modules/Errormessage";
import { errorhandlingcontacts } from "../../helpers/errorhandling";

const PhonebookHeader = () => {
  //Get jwt token
  const { jwt_token_TDL: token } = parseCookies();
  //Get user id
  const userId = localStorage.getItem("userId");

  //Set states
  const [contact, setContact] = useState("");
  const [addOneContact] = useAddOneContactMutation();
  const [errorContact, setErrorContact] = useState(null);

  //Add a todo
  function handleAddcontactSubmit(e) {
    e.preventDefault();
    const error = errorhandlingcontacts("contact-title", contact);
    setErrorContact(error);
    if (!error) {
      const contactStatus = addOneContact({ userId, name: contact, token });
      contactStatus.then((resolve) => {
        if ("error" in resolve) {
          setErrorContact(
            resolve?.error?.data?.violations[0]?.message ||
              "An error has occured"
          );
        }
      });
      setContact("");
    }
  }

  return (
    <>
      <header className="header">
        <div className="header__panel">
          <h1 className="header__panel__title">My To Do List</h1>
          <div className="header__panel__configgroup configgroup">
            <Configgroup />
          </div>
        </div>
        <form className="header__todoform" onSubmit={handleAddcontactSubmit}>
          <label htmlFor="input-todo" className="header__todoform__label">
            <span className="header__todoform__label__text">Contact name</span>
            <input
              className="header__todoform__label__todoinput form-control form-control-lg"
              maxLength="22"
              type="text"
              id="input-todo"
              autoComplete="off"
              spellCheck="false"
              value={contact}
              onInput={(e) => setContact(e.target.value)}
            />
          </label>
          <Errormessage className={"error"}>{errorContact}</Errormessage>
          <button type="submit" className="header__todoform__addtodo">
            <span className="header__todoform__addtodo__text">
              Add todo submit button
            </span>
          </button>
        </form>
      </header>
    </>
  );
};

export default PhonebookHeader;
