import { useState } from "react";
import IndexFooter from "../standard_modules/Footer";
import { useSelector } from "react-redux";
import ToastProfileDelete from "./ToastProfileDelete";
import ToastProfilePicture from "./ToastProfilePicture";
import { useGetProfilePicQuery } from "../../data/todoApi";
import { parseCookies } from "nookies";

const Profile = () => {
  //Get jwt token
  const { jwt_token_TDL: token } = parseCookies();

  //Get userdata for profile
  const { userData } = useSelector(
    (state) => state.persistedReducer.generalState
  );

  //Set usestates
  const [deleteToast, setDeleteToast] = useState(false);
  const [pictureToast, setPictureToast] = useState(false);
  const userId = localStorage.getItem("userId");

  //Gets the profile picture
  const { data: profileData } = useGetProfilePicQuery({
    id: userId,
    token,
  });

  //Show picturetoast disable others
  function handlePicturetoastClick() {
    setPictureToast(true);
    setDeleteToast(false);
  }

  //Show deletetoast disable others
  function handleDeletetoastClick() {
    setDeleteToast(true);
    setPictureToast(false);
  }

  /*
  //Show usernamechangetoast disable others
  function handleUsernamechangeClick() {
    setUsernameToast(true);
    setPictureToast(false);
    setDeleteToast(false);
  }*/

  return (
    <>
      <section className="container profile">
        <h2 className="profile__title">My profile</h2>
        <div className="profile__personalsheet">
          <div className="profile__personalsheet__imgholder">
            {profileData &&
              "usrPicture" in profileData &&
              profileData.usrPicture.length != 0 && (
                <img
                  className="profile__personalsheet__imgholder__img"
                  src={profileData.usrPicture}
                />
              )}
            {!profileData ||
              (!profileData?.usrPicture && (
                <img
                  className="profile__personalsheet__imgholder__img"
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Portrait_placeholder.svg"
                />
              ))}
          </div>
          <div className="profile__personalsheet__address">
            {userData && "usrName" in userData && (
              <p className="profile__personalsheet__address__paragraph">
                Username: {userData.usrName}
              </p>
            )}
            {userData && "usrMail" in userData && (
              <p className="profile__personalsheet__address__paragraph">
                Registered email address: {userData.usrMail}
              </p>
            )}
            {userData && "usrCreatedat" in userData && (
              <p className="profile__personalsheet__address__paragraph">
                You are with us sinds:{" "}
                {new Date(userData.usrCreatedat).toDateString()}
              </p>
            )}
            <div className="profile__personalsheet__address__buttongroup">
              <button
                className="profile__personalsheet__address__buttongroup__button btn btn-success"
                onClick={handlePicturetoastClick}
              >
                Change picture
              </button>

              <button
                className="profile__personalsheet__address__buttongroup__button btn btn-danger"
                onClick={handleDeletetoastClick}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </section>
      {deleteToast && (
        <ToastProfileDelete
          title={"Delete account"}
          useShowDelete={setDeleteToast}
          userId={userId}
        />
      )}
      {pictureToast && (
        <ToastProfilePicture
          title={"Change profile picture"}
          useShowPicture={setPictureToast}
          userId={userId}
        />
      )}
      <IndexFooter />
    </>
  );
};

export default Profile;

/*  <button
    className="profile__personalsheet__address__buttongroup__button btn btn-warning"
    onClick={handleUsernamechangeClick}>
    Change username</button>

    {usernameToast && (
     <ToastProfileUsername
     title={"Change username"}
     useShowUsername={setUsernameToast}
     userId={userId}/>
      )}*/
