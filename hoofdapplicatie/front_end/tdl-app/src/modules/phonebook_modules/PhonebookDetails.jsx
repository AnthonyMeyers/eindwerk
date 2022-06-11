import { useState, useEffect } from "react"
import ToastDeleteContact from "./ToastDeleteContact";
import { useUpdateOneContactMutation } from "../../data/todoApi";

const PhonebookDetails = ({contact: {cntCity, cntName, cntPostal, cntStreet, cntTel, id,cntMail, cntUser, index},reset}) => {
const [updateContact] = useUpdateOneContactMutation();

//Set useStates
const [city, setCity] = useState(cntCity);
const [name, setName] = useState(cntName);
const [postal, setPostal] = useState(cntPostal);
const [street, setStreet] = useState(cntStreet);
const [tel, setTel] = useState(cntTel);
const [mail, setMail] = useState(cntMail);
const [isShown, setIsShown] = useState(false);
const [showDelete, setShowDelete] = useState(false);

//Resets the modals
useEffect(()=>{setShowDelete(false)},[reset])


function handleShowdeletemodalClick()
{
  setTimeout(()=>{setShowDelete(true);})
}

function handleContactChangeSubmit(e){
    e.preventDefault()
      updateContact({ conid: id, name, tel, street, postal,city,mail,})
  }


  return (
      <>
    {index != null && index.length > 0 && <h2>{index}</h2>}
    <div className="contact">
        <form onSubmit={handleContactChangeSubmit}>
        <label>Name<input type="text" value={name} onInput={(e) => setName(e.target.value)}/></label>
            {isShown && <address>
              <label>Street
              <input type="text" value={street} onInput={(e) => setStreet(e.target.value)}/></label>
              <label>Postal code<input type="text" value={postal} onInput={(e) => setPostal(e.target.value)}/></label>
              <label>City<input type="text" value={city} onInput={(e) => setCity(e.target.value)}/></label>
              <label>Cell phone<input type="text" value={tel} onInput={(e) => setTel(e.target.value)}/></label>
              <label>E-mail<input type="mail" value={mail} onInput={(e) => setMail(e.target.value)}/></label>
            </address>}
            <button type="submit" onClick={()=>setIsShown(!isShown)}></button>
            <button onClick={handleShowdeletemodalClick}></button>
            {showDelete && <ToastDeleteContact title={name} id={id} reset={reset}/>}
        </form>
    </div>
    </>
  )
}

export default PhonebookDetails