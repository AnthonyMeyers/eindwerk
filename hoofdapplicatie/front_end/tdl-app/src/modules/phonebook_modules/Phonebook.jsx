import { useEffect, useState } from "react";
import { useGetAllUserContactsIndexedQuery } from "../../data/todoApi";
import PhonebookDetails from "./PhonebookDetails";
import { parseCookies } from "nookies";
import IndexFooter from "../standard_modules/Footer";
import Status from "../standard_modules/App-Status";
import { ToastContainer } from "react-toastify";
import { errorToast } from "../../helpers/toast";

const Phonebook = () => {
  //Get jwt token
  const { jwt_token_TDL: token } = parseCookies();

  //Get user id
  const userId = localStorage.getItem("userId");

  const {
    data: contacts,
    isLoading,
    isError,
  } = useGetAllUserContactsIndexedQuery({ id: userId, token });
  const [reset, doReset] = useState(false);

  //Adds error toast
  useEffect(() => {
    if (isError) {
      errorToast("The server is currently unavailable.");
    }
  }, [contacts]);
  function handleResetcomponentsClick(e) {
    doReset(!reset);
  }

  return (
    <>
      <section
        className="phonebook container"
        onClick={handleResetcomponentsClick}
      >
        <ToastContainer />
        <h2 className="phonebook__title">Contacts</h2>
        <Status isLoading={isLoading} />
        {contacts && contacts.length > 0 && (
          <div className={"phonebook__list"}>
            {contacts.map((contact, i) => (
              <div key={contact.id}>
                {"index" in contact && contact.index.length > 0 && (
                  <h2 className="phonebook__list__index">{contact.index}</h2>
                )}
                <PhonebookDetails contact={contact} reset={reset} />
              </div>
            ))}
          </div>
        )}
      </section>
      <IndexFooter />
    </>
  );
};

export default Phonebook;
