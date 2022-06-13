import { useState, useEffect } from "react"
import ToastDeleteContact from "./ToastDeleteContact";
import { useUpdateOneContactMutation } from "../../data/todoApi";

const PhonebookDetails = ({contact: {cntCity, cntName, cntPostal, cntStreet, cntTel, id,cntMail, cntUser, index},reset}) => {
  //set up updatecontactmutation
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

  //Show the delete modal
  function handleShowdeletemodalClick()
  {
    setTimeout(()=>{setShowDelete(true);})
  }

  //save the contact to the api
  function handleContactChangeSubmit(e){
      e.preventDefault()
      updateContact({ conid: id, name, tel, street, postal,city,mail,})
  }


  return (
      <>
    {index != null && index.length > 0 && <h2>{index}</h2>}
    <li className="contact">
        <form onSubmit={handleContactChangeSubmit} className="contact__form">
              <label className="contact__form__namelabel">Name
              < input className="contact__form__namelabel__input" type="text" value={name} onInput={(e) => setName(e.target.value)}/></label>
              <div className="contact__form__buttongroup">
                <button className="contact__form__buttongroup__button contact__form__buttongroup__button-details" title="show /hide details" onClick={()=>setIsShown(!isShown)}>
                <span className="contact__form__buttongroup__button__text">Show details</span></button>
                <button className="contact__form__buttongroup__button contact__form__buttongroup__button-delete" title="delete" onClick={handleShowdeletemodalClick}>
               <span className="contact__form__buttongroup__button__text">Delete contact</span></button>
               <button className="contact__form__buttongroup__button contact__form__buttongroup__button-submit" title="update contact" type="submit">
               <span className="contact__form__buttongroup__button__text">Update contact</span></button>
             </div>
            {isShown && <address  className="contactaddress">
              <label className="contactaddress__label">Street
                <input type="text" value={street} onInput={(e) => setStreet(e.target.value)} className="contactaddress__label__input"/></label>
              <label className="contactaddress__label">Postal code
                <input type="text" value={postal} onInput={(e) => setPostal(e.target.value)} className="contactaddress__label__input"/></label>
              <label className="contactaddress__label">City
                <input type="text" value={city} onInput={(e) => setCity(e.target.value)} className="contactaddress__label__input"/></label>
              <label className="contactaddress__label">Cell phone
                <input type="text" value={tel} onInput={(e) => setTel(e.target.value)} className="contactaddress__label__input"/></label>
              <label className="contactaddress__label">E-mail
                <input type="mail" value={mail} onInput={(e) => setMail(e.target.value)} className="contactaddress__label__input"/>
              </label>
            </address>}
            {showDelete && <ToastDeleteContact title={name} id={id} reset={reset}/>}
        </form>
    </li>
    </>
  )
}

export default PhonebookDetails