import {useEffect, useState} from 'react';
import { useGetAllUserAppointmentsQuery, useGetAllUserContactsQuery } from '../../data/todoApi';
import Status from '../standard_modules/App-Status';
import Appointment from './Appointment';

const Appointments = () => {
  const [clickedItem, setClickedItem] = useState("");

  const {data: allUserAppointments, isSuccess} = useGetAllUserAppointmentsQuery(9);
  const {data: allContacts} = useGetAllUserContactsQuery(9);

  function handleAppointmentsClick(e)
  {
    setClickedItem(e.target);

  }
  return (
    <section className="appointments" onClick={handleAppointmentsClick}>
    <h2 className="appointments__title">Appointments:</h2>
    {allUserAppointments && allUserAppointments.length >0 && allUserAppointments.map(appointment =>
    <li key={appointment.id}><Appointment appointment={appointment}
    contacts={allContacts} activeItem={clickedItem}/></li>)}


    </section>
  )
}

export default Appointments
