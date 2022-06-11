import {useEffect, useState} from 'react';
import { useGetAllUserAppointmentsQuery, useGetAllUserContactsQuery } from '../../data/todoApi';
import Status from '../standard_modules/App-Status';
import Appointment from './Appointment';
import { useNavigate } from 'react-router';

const Appointments = () => {

const nav = useNavigate();
const userId = localStorage.getItem("userId");
if(!userId || userId === 0)
{
  nav("/");
}

  const [clickedItem, setClickedItem] = useState("");
  const {data: allUserAppointments, isSuccess} = useGetAllUserAppointmentsQuery(userId);
  const {data: allContacts} = useGetAllUserContactsQuery(userId);

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
