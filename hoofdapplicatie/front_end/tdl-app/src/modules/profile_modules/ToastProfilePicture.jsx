import { parseCookies } from 'nookies';
import { useChangeUserPictureMutation } from '../../data/todoApi';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { destroyJWTCookie } from '../../helpers/jwttokens';
import { changeProfilePicture } from '../../data/general';


const ToastProfilePicture = ({userId, title, useShowPicture}) => { 
    const nav = useNavigate();
    const dispatch = useDispatch();
  const {jwt_token_TDL: token} = parseCookies();
  const [changeUsername] = useChangeUserPictureMutation();


    const [pictureUrl, setPictureUrl] = useState("");

//Remove user, clear data en redirect to login
function handleChangeusernameClick(e)
{
    e.preventDefault();
    if(pictureUrl.length > 0){
    changeUsername({id: userId, picture: pictureUrl, token});
    dispatch(changeProfilePicture({picture: pictureUrl}));
  }
  useShowPicture(false);
}

  //Modal from bootstrap, adapted to situation
  return (
<div className="messagetoast toast show" role="alert" aria-live="assertive" aria-atomic="true">
  <div className="messagetoast__header toast-header">
    <h3 className="messagetoast__header__title" >Message profile: <span>{title}</span></h3>

    <button type="button" className="ml-2 mb-1 close messagetoast__header__button btn btn-success"
    data-dismiss="toast" aria-label="Close" onClick={()=>useShowPicture(false)}>
      Exit
    </button>
  </div>
  <form onSubmit={handleChangeusernameClick}>
  <div className="toast-body"> Change your profile picture?
  <label className="toast-body__label">New picture:
  <input className="toast-body__label__input" type="text" onInput={(e) => setPictureUrl(e.target.value)}/>
  </label>
  </div>
    <button type="submit" className="messagetoast__delete btn btn-danger">Yes please</button>
</form>
</div>

  )
}

export default ToastProfilePicture;