import { useState, useEffect } from "react";
import ToastDeleteContact from "./ToastDeleteContact";
import { useUpdateOneContactMutation } from "../../data/todoApi";
import { parseCookies } from "nookies";
import { errorhandlingcontacts } from "../../helpers/errorhandling";
import Errormessage from "../extra_modules/Errormessage";

const PhonebookDetails = ({
  contact: {
    cntCity,
    cntName,
    cntPostal,
    cntStreet,
    cntTel,
    id,
    cntMail,
    cntUser,
    index,
  },
  reset,
}) => {
  const { jwt_token_TDL: token } = parseCookies();
  //set up updatecontactmutation
  const [updateContact] = useUpdateOneContactMutation();

  //Set useStates
  const [city, setCity] = useState(cntCity);
  const [name, setName] = useState(cntName);
  const [postal, setPostal] = useState(cntPostal);
  const [street, setStreet] = useState(cntStreet);
  const [tel, setTel] = useState(cntTel);
  const [mail, setMail] = useState(cntMail);
  const [isShown, setIsShown] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);
  console.log(id);
  //Resets the modals
  useEffect(() => {
    setShowDelete(false);
  }, [reset]);

  //Show the delete modal
  function handleShowdeletemodalClick() {
    setTimeout(() => {
      setShowDelete(true);
    });
  }

  //save the contact to the api
  function handleContactChangeSubmit(e) {
    e.preventDefault();
    const errorContacts = errorhandlingcontacts("contact-details", {
      name,
      tel,
      street,
      postal,
      city,
      mail,
    });
    setErrorDetails(errorContacts);
    if (!errorContacts) {
      updateContact({
        conid: id,
        name,
        tel,
        street,
        postal,
        city,
        mail,
        token,
      });
    }
  }

  return (
    <>
      <li className="contact">
        <form onSubmit={handleContactChangeSubmit} className="contact__form">
          <label className="contact__form__namelabel">
            Name
            <input
              spellCheck="false"
              maxLength="22"
              className="contact__form__namelabel__input"
              type="text"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
          </label>
          <Errormessage className={"error"}>{errorDetails}</Errormessage>
          <div className="contact__form__buttongroup">
            <button
              type="button"
              className="contact__form__buttongroup__button contact__form__buttongroup__button-details"
              title="show /hide details"
              onClick={() => setIsShown(!isShown)}
            >
              <span className="contact__form__buttongroup__button__text">
                Show details
              </span>
            </button>
            <button
              type="button"
              className="contact__form__buttongroup__button contact__form__buttongroup__button-delete"
              title="delete"
              onClick={handleShowdeletemodalClick}
            >
              <span className="contact__form__buttongroup__button__text">
                Delete contact
              </span>
            </button>
            <button
              className="contact__form__buttongroup__button contact__form__buttongroup__button-submit"
              title="update contact"
              type="submit"
            >
              <span className="contact__form__buttongroup__button__text">
                Update contact
              </span>
            </button>
          </div>
          {isShown && (
            <address className="contactaddress">
              <label className="contactaddress__label">
                Street
                <input
                  type="text"
                  spellCheck="false"
                  maxLength="40"
                  value={street}
                  onInput={(e) => setStreet(e.target.value)}
                  className="contactaddress__label__input"
                />
              </label>
              <label className="contactaddress__label">
                Postal code
                <input
                  type="text"
                  spellCheck="false"
                  maxLength="10"
                  value={postal}
                  onInput={(e) => setPostal(e.target.value)}
                  className="contactaddress__label__input"
                />
              </label>
              <label className="contactaddress__label">
                City
                <input
                  type="text"
                  spellCheck="false"
                  maxLength="22"
                  value={city}
                  onInput={(e) => setCity(e.target.value)}
                  className="contactaddress__label__input"
                />
              </label>
              <label className="contactaddress__label">
                Cell phone
                <input
                  type="tel"
                  spellCheck="false"
                  maxLength="15"
                  value={tel}
                  onInput={(e) => setTel(e.target.value)}
                  className="contactaddress__label__input"
                />
              </label>
              <label className="contactaddress__label">
                E-mail
                <input
                  type="mail"
                  spellCheck="false"
                  value={mail}
                  onInput={(e) => setMail(e.target.value)}
                  className="contactaddress__label__input"
                />
              </label>
            </address>
          )}
          {showDelete && (
            <ToastDeleteContact
              title={name}
              id={id}
              reset={reset}
              useSetErrorDetails={setErrorDetails}
            />
          )}
        </form>
      </li>
    </>
  );
};

export default PhonebookDetails;
