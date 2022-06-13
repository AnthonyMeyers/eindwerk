import IndexFooter from "./IndexFooter"

const Home = () => {
  return (
      <>
    <section className="home container">
      <h2>Introduction</h2>
      <h3 className="home__title">Welcome to the TDL webapplication.</h3>
      <article className="home__textblock">
        <p className="home__textblock__paragraph">
        This application allows the user to organize his/hers personal life. The user can add items to do to the list.
        These items can also be edited, checked and removed again.</p>
        <p className="home__textblock__paragraph">
        Appointments can also be added to this application. The dates in the appointments can be set by the user.
        The user can also add a contact to the appointment from a contact list. The main difference between an appointment and a todo is that the user can do a todo in a larger timespan.
        An appointment is made on a set timespan, most of the times with another contact person.</p>
        <p className="home__textblock__paragraph"> As mentioned before, every user can add contact to his or her contact list.
        This list is sorted by an index.
        This makes sure that the user can easily find the contacts and their personal information.</p>
      </article>
    </section>
    <IndexFooter/>
    </>
  )
}

export default Home