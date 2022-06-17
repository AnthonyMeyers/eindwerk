import Configgroup from "../extra_modules/Configgroup";

const ProfileHeader = () => {
  return (
    <>
    <header className="header">
      <div className="header__panel">
        <h1 className="header__panel__title">To Do List</h1>
        <div className="header__panel__configgroup configgroup">
        <Configgroup/>
        </div>
      </div>
      </header>
  </>
  )
}

export default ProfileHeader