import { useGetContactInfoQuery } from '../../data/todoApi';

const AppointmentContact = ({contactInfo}) => {
  //Get contact information
  const {data, isLoading, isSuccess, isError} = useGetContactInfoQuery(contactInfo);
  return (
        <>
          <div className="contactinfo">
            {!data && <p>No contact info available</p>}
            {data && 
            <>
            <div className="contactinfo__fiche">
              <h3 className="contactinfo__fiche__info">Contact name: {data?.cntName || "-"}</h3>
              <h3 className="contactinfo__fiche__info">Contact Street: {data?.cntStreet || "-"}</h3>
              <h3 className="contactinfo__fiche__info">Contact Postal: {data?.cntPostal || "-"}</h3>
            </div>
              <div className="contactinfo__fiche">
              <h3 className="contactinfo__fiche__info">Contact City: {data?.cntCity || "-"}</h3>
              <h3 className="contactinfo__fiche__info">Contact Tel: {data?.cntTel || "-"}</h3>
              <h3 className="contactinfo__fiche__info">Contact Mail: {data?.cntMail || "-"}</h3>
            </div>
          </>
        }
      </div>

    </>
  )
}

export default AppointmentContact
