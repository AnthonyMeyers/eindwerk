import { useEffect, useState } from 'react';
import { useGetAllUserContactsIndexedQuery } from '../../data/todoApi';
import PhonebookDetails from './PhonebookDetails';
import { parseCookies } from 'nookies';

const Phonebook = () => {
  const {jwt_token_TDL: token} = parseCookies();
  //Get user id
  const userId = localStorage.getItem("userId");

  const {data: contacts,isLoading, isError, isSuccess} = useGetAllUserContactsIndexedQuery({userId, token});
  const [reset, doReset] = useState(false);

  function handleResetcomponentsClick(e)
  {
    doReset(!reset)
  }

  return (
    <section className="phonebook container" onClick={handleResetcomponentsClick}>
      <h2 className="phonebook__title">Contacts:</h2>
      {contacts && contacts.length >0 && <div className={"phonebook__list"}>{contacts.map((contact) =>
        <>
          <PhonebookDetails contact={contact} key={contact.id} reset={reset}/>
        </>
      )}
      </div>}
    </section>
  )
}

export default Phonebook