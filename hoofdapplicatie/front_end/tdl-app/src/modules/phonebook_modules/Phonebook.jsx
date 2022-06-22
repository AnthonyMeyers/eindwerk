import { useState } from "react";
import { useGetAllUserContactsIndexedQuery } from "../../data/todoApi";
import PhonebookDetails from "./PhonebookDetails";
import { parseCookies } from "nookies";
import IndexFooter from "../standard_modules/Footer";
import Status from "../standard_modules/App-Status";

const Phonebook = () => {
  const { jwt_token_TDL: token } = parseCookies();
  //Get user id
  const userId = localStorage.getItem("userId");

  const {
    data: contacts,
    isLoading,
    isError,
    isSuccess,
  } = useGetAllUserContactsIndexedQuery({ id: userId, token });
  const [reset, doReset] = useState(false);

  function handleResetcomponentsClick(e) {
    doReset(!reset);
  }

  return (
    <>
      <section
        className="phonebook container"
        onClick={handleResetcomponentsClick}
      >
        <h2 className="phonebook__title">Contacts:</h2>
        <Status isLoading={isLoading} isError={isError} />
        {contacts && contacts.length > 0 && (
          <div className={"phonebook__list"}>
            {contacts.map((contact, i) => (
              <>
                {"index" in contact && contact.index.length > 0 && (
                  <h2
                    className="phonebook__list__index"
                    key={"index-" + contact?.id}
                  >
                    {contact.index}
                  </h2>
                )}
                <PhonebookDetails
                  key={contact.id}
                  contact={contact}
                  reset={reset}
                />
              </>
            ))}
          </div>
        )}
      </section>
      <IndexFooter />
    </>
  );
};

export default Phonebook;
