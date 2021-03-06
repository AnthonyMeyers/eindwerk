import { useState, useEffect } from "react";
import ToastDeleteContact from "./ToastDeleteContact";
import { useUpdateOneContactMutation } from "../../data/todoApi";
import { parseCookies } from "nookies";
import { errorhandlingcontacts } from "../../helpers/errorhandling";
import { ToastContainer } from "react-toastify";
import { errorToast } from "../../helpers/toast";

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
  //Get jwt token
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

  useEffect(() => {
    if (errorDetails) {
      errorToast(errorDetails);
      setErrorDetails(null);
    }
  }, [errorDetails]);

  //save the contact to the api
  function handleContactChangeSubmit(e) {
    e.preventDefault();
    if (!showDelete) {
      const errorContacts = errorhandlingcontacts("contact-details", {
        name,
        tel,
        street,
        postal,
        city,
        mail,
      });
      errorToast(errorContacts);
      if (!errorContacts) {
        const statusContacts = updateContact({
          conid: id,
          name,
          tel,
          street,
          postal,
          city,
          mail,
          token,
        });

        statusContacts.then((resolve) => {
          if ("error" in resolve) {
            if ("data" in resolve.error && "violations" in resolve.error.data) {
              errorToast(resolve?.error?.data?.violations[0]?.message);
            } else errorToast("An error has occured");
          }
        });
      }
    }
  }

  return (
    <>
      <li className="contact">
        <ToastContainer />
        <form onSubmit={handleContactChangeSubmit} className="contact__form">
          <label className="contact__form__namelabel">
            Name
            <input
              spellCheck="false"
              maxLength="22"
              className="contact__form__namelabel__input form-control"
              type="text"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
          </label>
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
                  className="contactaddress__label__input form-control"
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
                  className="contactaddress__label__input form-control"
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
                  className="contactaddress__label__input form-control"
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
                  className="contactaddress__label__input form-control"
                />
              </label>
              <label className="contactaddress__label">
                E-mail
                <input
                  type="mail"
                  spellCheck="false"
                  value={mail}
                  onInput={(e) => setMail(e.target.value)}
                  className="contactaddress__label__input form-control"
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
