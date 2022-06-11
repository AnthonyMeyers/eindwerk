import { useEffect, useState } from 'react';
import Status from '../standard_modules/App-Status';
import { useGetAllUserContactsIndexedQuery } from '../../data/todoApi';
import PhonebookDetails from './PhonebookDetails';

const Phonebook = () => {
const {data: contacts,isLoading, isError, isSuccess} = useGetAllUserContactsIndexedQuery(9);
const [reset, doReset] = useState(false);

function handleResetcomponentsClick(e)
{
    doReset(!reset)
}

  return (
    <section className="phonebook" onClick={handleResetcomponentsClick}>
    <h2 className="phonebook__title">Contacts:</h2>
    {contacts && contacts.length >0 && <div className={"tester"}>{contacts.map((contact) =>
<>
    <PhonebookDetails contact={contact} key={contact.id} reset={reset}/>
</>
)}</div>}
  </section>
  )
}

export default Phonebook