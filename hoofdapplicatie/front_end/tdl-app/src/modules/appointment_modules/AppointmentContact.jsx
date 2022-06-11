import React from 'react'
import { useGetContactInfoQuery } from '../../data/todoApi';
const AppointmentContact = ({contactInfo}) => {
const {data, isLoading, isSuccess, isError} = useGetContactInfoQuery(contactInfo);
  return (
      <>
      {!data && <p>No contact info available</p>}
      {data && 
          <div>
              <h3>Contact name: {data?.cntName || "-"}</h3>
              <h3>Contact Street: {data?.cntStreet || "-"}</h3>
              <h3>Contact Postal: {data?.cntPostal || "-"}</h3>
              <h3>Contact City: {data?.cntCity || "-"}</h3>
              <h3>Contact Tel: {data?.cntTel || "-"}</h3>
              <h3>Contact Mail: {data?.cntMail || "-"}</h3>
          </div>



      }

    </>
  )
}

export default AppointmentContact