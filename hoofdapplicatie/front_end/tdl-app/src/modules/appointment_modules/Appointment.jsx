import {useState, useEffect} from 'react'
import { convertToAccurateDay } from '../../helpers/datehelpers';
import { useUpdateAppointmentMutation } from '../../data/todoApi';
import ToastDeleteApm from './ToastDeleteApm';
import AppointmentContact from './AppointmentContact';

const Appointment = ({appointment,contacts, activeItem}) => {

  //Make appointment variables available cleanly
  const {id,apmTitle, apmDescription, apmStartsAt, apmStopsAt, apmUsr, apmCnt} = appointment;

  //Usestates directly for forms
  const [title, setTitle] = useState(apmTitle);
  const [description, setDescription] = useState(apmDescription);
  const [dateStarts, setDateStarts] = useState(convertToAccurateDay(apmStartsAt));
  const [timeStarts, setTimeStarts] = useState(new Date(apmStartsAt).toLocaleTimeString().substr(0,5));
  const [dateStops, setDateStops] = useState(convertToAccurateDay(apmStopsAt));
  const [timeStops, setTimeStops] = useState(new Date(apmStopsAt).toLocaleTimeString().substr(0,5));
  const [contactPerson, setContactPerson] = useState(apmCnt?.id || 0);

  //Functional usestates
  const [disabled, setDisabled] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [formId, setFormId] = useState(`${id}`)

  //Mutations & queries
  const [updateAppointment] = useUpdateAppointmentMutation();

  //Checks what form is clicked & enables / disables the forms
  useEffect(()=>{
  if(
      activeItem.id === `appointment-${formId}` ||
      activeItem?.parentElement?.id === `appointment-${formId}`
      || activeItem?.id === `deletetoast-${id}` || activeItem?.parentElement?.id === `deletetoast-${id}`)
  {
    setDisabled(false)
  }
  else 
  { 
    setDisabled(true);
    setShowDelete(false);
    setShowContact(false);
  }
  },[activeItem])

  //Updates time is starttime exceeds endtime
  useEffect(()=>{
    const start = new Date(dateStarts +" " + timeStarts).getTime();
    const stop = new Date(dateStops + " " + timeStops).getTime();
    if(start > stop){
      setDateStops(dateStarts);
      setTimeStops(timeStarts);
  }},[dateStarts, timeStarts, dateStops, timeStops])

  //Update appointment
  function handleUpdateappointmentSubmit(e)
  {
    e.preventDefault();
    const start = new Date(dateStarts +" " + timeStarts).getTime();
    const stop = new Date(dateStops + " " + timeStops).getTime();
    if(start <= stop && title.length >= 4){
      updateAppointment({appId: id, appTitle: title, appStartsAt: dateStarts +" " + timeStarts,
      appStopsAt: dateStops + " " + timeStops, userId: apmUsr.id,appDescription: description,contactId: contactPerson > 0 ? contactPerson : null})
    }
  } 
  return (
    <div className="appointment">
    <form className="appointment__front" id={`appointment-${formId}`} onSubmit={handleUpdateappointmentSubmit}>
      <input type="text" className="appointment__front__input"value={title}
      onChange={(e)=>setTitle(e.target.value)} disabled={disabled}/>
      
      <label for={`startdate-${id}`}  className="appointment__front__label">Start date</label><input id={`startdate-${id}`}type="date"
      className="appointment__front__input" value={dateStarts} onChange={(e) => setDateStarts(e.target.value)} disabled={disabled}/>

      <label for={`starttime-${id}`} className="appointment__front__label">Start time</label><input id={`starttime-${id}`} type="time" 
      className="appointment__front__input" value={timeStarts} onChange={(e) => setTimeStarts(e.target.value)} disabled={disabled}/>

      <label for={`enddate-${id}`} className="appointment__front__label">End date</label><input id={`enddate-${id}`} type="date" 
      className="appointment__front__input" value={dateStops} onChange={(e) => setDateStops(e.target.value)} disabled={disabled}/>

      <label for={`endtime-${id}`} className="appointment__front__label">End time</label><input id={`endtime-${id}`} type="time" 
      className="appointment__front__input" value={timeStops} onChange={(e) => setTimeStops(e.target.value)} disabled={disabled}/>

      <label for={`select-${id}`} className="appointment__front__label">Contact: </label>
      {contacts && contacts.length > 0 &&  <select id={`select-${id}`} disabled={disabled} className="appointment__front__select"
      value={contactPerson} onChange={(e) => setContactPerson(e.target.value)}><option value="0"></option>
      {contacts.map(contact => <option value={contact.id}>{contact.cntName}</option>)}</select>}
    
      <button type="submit" className="appointment__front__button btn btn-outline-secondary">Save appointment</button>
      <button className="appointment__front__button btn btn-outline-secondary" onClick={() => setShowDelete(!showDelete)}> Delete appointment</button>
      <button className="appointment__front__button btn btn-outline-secondary" onClick={() => setShowContact(!showContact)}>show contact details</button>
      
      </form>
      {showDelete && !disabled &&
      <ToastDeleteApm id={id} title={apmTitle}/>}
      {showContact && !disabled &&
      <AppointmentContact contactInfo={contactPerson}/>}
    </div>
  )
}

export default Appointment