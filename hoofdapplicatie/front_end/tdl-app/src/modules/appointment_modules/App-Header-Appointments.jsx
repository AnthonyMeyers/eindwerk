import { NavLink, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertToAccurateDay } from "../../helpers/datehelpers";
import { useAddOneAppointmentMutation } from "../../data/todoApi";
import { useNavigate } from "react-router";

 const AppHeaderAppointments = () => {
const userId = localStorage.getItem("userId");

   //Set usestates
   const [appointmentTitle,setAppointmentTitle] = useState("");
  const [startDate, setStartDate] = useState(convertToAccurateDay());
  const [startTime, setStartTime] = useState(new Date().toLocaleTimeString().substr(0,5));
  const [stopDate, setStopDate] = useState(startDate);
  const [stopTime, setStopTime] = useState(startTime);

  //set mutations
  const [addOneAppointment] = useAddOneAppointmentMutation();

useEffect(()=>{
  const start = new Date(startDate +" " + startTime).getTime();
  const stop = new Date(stopDate + " " + stopTime).getTime();
  if(start > stop){
    setStopDate(startDate);
    setStopTime(startTime);
}},[startDate, startTime])

  //Submit the appointment to the API
  function handleSubmitappointmentClick(e)
  {
    e.preventDefault();
    const start = new Date(startDate +" " + startTime).getTime();
    const stop = new Date(stopDate + " " + stopTime).getTime();
    if(start <= stop && appointmentTitle.length >= 4){

      addOneAppointment({id: userId, title: appointmentTitle, startsAt: startDate +  " " + startTime, stopsAt: stopDate + " " + stopTime})
    }
    setAppointmentTitle("");
  }

  return (
    <>
    <header className="header">
      <div className="header__panel">
        <h1 className="header__panel__title">To Do List</h1>
        <NavLink to="/phonebook" className="header__panel__config">
            <button className="header__panel__config__sublink">
              <span className="header__panel__config__sublink__text">
                configuration
              </span>
            </button>
          </NavLink>
        <NavLink to="/settings" className="header__panel__config">
          <button className="header__panel__config__sublink">
            <span className="header__panel__config__sublink__text">
              configuration
            </span>
          </button>
        </NavLink>
      </div>
      <form className="header__todoform" onSubmit={handleSubmitappointmentClick}>
        <label for="input-appointment" className="header__todoform__label">
          Add an appointment
          <input
            class="header__todoform__label__todoinput form-control form-control-lg"
            type="text"
            id="input-appointment"
            autoComplete="off"
            spellCheck="false"
            value={appointmentTitle}
            onInput={(e) =>setAppointmentTitle(e.target.value)}
          />
        </label>
        <label for="date-appointment">Set the date and time
        <input type="date" onChange={(e)=>setStartDate(e.target.value)} value={startDate}/>
        <input type="time" onChange={(e) =>setStartTime(e.target.value)} value={startTime}/>
        </label>
        <label for="date-appointment">Set the stopdate and stoptime
        <input type="date" onChange={(e)=>setStopDate(e.target.value)} value={stopDate}/>
        <input type="time" onChange={(e) =>setStopTime(e.target.value)} value={stopTime}/>
        </label>
        
        
        <button type="submit" className="header__todoform__addtodo" >
          <span className="header__todoform__addtodo__text">
            Add todo submit button
          </span>
        </button >
      </form>
    </header>

  </>
  )
}

export default AppHeaderAppointments