import { useGetContactInfoQuery } from "../../data/todoApi";
import { parseCookies } from "nookies";
import { useSelector } from "react-redux";

const AppointmentContact = ({
  contactInfo,
  startApm: { startDate, startTime },
}) => {
  //Get JWT token
  const { jwt_token_TDL: token } = parseCookies();

  //Get userdata from state
  const { userData } = useSelector(
    (state) => state.persistedReducer.generalState
  );

  //Get contact information
  const { data } = useGetContactInfoQuery({
    id: contactInfo,
    token,
  });

  return (
    <>
      <div className="contactinfo">
        {!data && <p>No contact info available</p>}
        {data && (
          <>
            <div className="contactinfo__fiche">
              <h3 className="contactinfo__fiche__info">
                Contact name: {data?.cntName || "-"}
              </h3>
              <h3 className="contactinfo__fiche__info">
                Contact Street: {data?.cntStreet || "-"}
              </h3>
              <h3 className="contactinfo__fiche__info">
                Contact Postal: {data?.cntPostal || "-"}
              </h3>
            </div>
            <div className="contactinfo__fiche">
              <h3 className="contactinfo__fiche__info">
                Contact City: {data?.cntCity || "-"}
              </h3>
              <h3 className="contactinfo__fiche__info">
                Contact Tel:{" "}
                {"cntTel" in data ? (
                  <a href={`tel:${data.cntTel}`}>{data.cntTel}</a>
                ) : (
                  "-"
                )}
              </h3>
              <h3 className="contactinfo__fiche__info">
                Contact Mail:{" "}
                {"cntMail" in data ? (
                  <a
                    href={`mailto:${data.cntMail}?bcc=${userData.usrMail}&subject=Our appoinment on ${startDate} at ${startTime}`}
                  >
                    {data.cntMail}
                  </a>
                ) : (
                  "-"
                )}
              </h3>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AppointmentContact;
