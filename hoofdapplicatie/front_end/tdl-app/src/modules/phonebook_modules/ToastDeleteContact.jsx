import { useEffect } from "react";
import { useRemoveOneContactMutation } from "../../data/todoApi";

const ToastDeleteContact = ({id, title}) => {

const [removeOneContact] = useRemoveOneContactMutation();

function handledeleteAppointmentClick(){
    removeOneContact(id);
}

  return (
<div class="messagetoast toast show" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="messagetoast__header toast-header">
    <h3>Message appointment: {title}</h3>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
    </button>
  </div>
  <div class="toast-body">
    Are you sure you would like to delete this appointment?
  </div>
  <button onClick={handledeleteAppointmentClick}>Yes please</button>
</div>
  )
}

export default ToastDeleteContact