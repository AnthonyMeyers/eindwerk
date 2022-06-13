import { useEffect } from "react";
import { useRemoveOneContactMutation } from "../../data/todoApi";

const ToastDeleteContact = ({id, title}) => { 
  //Remove contact mutation
  const [removeOneContact] = useRemoveOneContactMutation();

  function handledeleteAppointmentClick(){
      removeOneContact(id);
  }

  //Modal from bootstrap, adapted to situation
  return (
<div class="messagetoast toast show" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="messagetoast__header toast-header">
    <h3>Message appointment: {title}</h3>
    <button type="button" className="ml-2 mb-1 close messagetoast__header__button btn btn-success" data-dismiss="toast" aria-label="Close">
      Exit
    </button>
  </div>
  <div class="toast-body"> Are you sure you would like to delete this appointment? All appointments of on this contact will be deleted.
  </div>
    <button onClick={handledeleteAppointmentClick} className="messagetoast__delete btn btn-danger">Yes please</button>
</div>
  )
}

export default ToastDeleteContact;