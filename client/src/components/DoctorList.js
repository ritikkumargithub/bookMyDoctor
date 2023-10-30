import React from 'react'
import {useNavigate} from 'react-router-dom';

const DoctorList = ({doctor}) => {
    const navigate = useNavigate();
  return (
    <>
      <div className='card' style={{margin:'10px', cursor:'pointer'}}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className='card-header' style={{background:"rgb(20, 157, 54)", color:"white", fontWeight:"bold"}}>
            Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className='card-body'>
            <p>
                <b>Specialization</b>: {doctor.specialization}
            </p>
            <p>
                <b>Experience</b>: {doctor.experience}
            </p>
            <p>
                <b>Fees Per Cunsaltation</b>: {doctor.feesPerCunsaltation}
            </p>
            <p>
                <b>Address</b>: {doctor.address}
            </p>
        </div>
      </div>
    </>
  )
}

export default DoctorList