import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { DatePicker, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {showLoading, hideLoading} from '../redux/features/alertSlice';

const BookingPage = () => {
    const {user} = useSelector(state => state.user)
    const params = useParams();
    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState([])
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [isavailable, setIsAvailable] = useState()
    // get doctor details
    const getUserData = async() => {
    try {
      const res = await axios.post('/api/v1/doctor/getDoctorById',
      {doctorId: params.doctorId},
      {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success) {
        setDoctor(res.data.data);
      }
    } catch(error) {
       // console.log(error);
    }
  };

  // booking handler
  const handleBooking = async () => {
    // const navigate = useNavigate();
   try {
    setIsAvailable(true)
    if(!date && !time) {
      return alert("Date and Time Required");
    }
    dispatch(showLoading())
    const res = await axios.post('/api/v1/user/book-appointment', {
      doctorId: params.doctorId,
      userId: user._id,
      doctorInfo: doctor,
      date: date,
      userInfo: user,
      time: time
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch(hideLoading())
    if(res.data.success) {
      message.success(res.data.message)
      // navigate('/')
    }
   } catch(error) {
    dispatch(hideLoading())
    // console.log(error)
   }
  }

  // check booking function
  const handleAvailability = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/booking-availbility', {
        doctorId: params.doctorId,date,time
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading());
      if(res.data.success) {
        setIsAvailable(true)
        console.log(isavailable)
        message.success(res.data.message);
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      // console.log(error);
    }
  }
  useEffect(() => {
    getUserData();
  },[]);
  return (
    <Layout>
        <h3 style={{textAlign:'center',padding:'10px'}}>Booking Page</h3>
        <div className='container m-2'>
        { doctor && (
          <div> 
            <h5 className='m-2'>Dr.{doctor.firstName} {doctor.lastName}</h5>
            <h5 className='m-2'>Fees: {doctor.feesPerCunsaltation}</h5>
            <h5 className='m-2'>Timing: {doctor.timings}</h5>
            <div className='d-flex flex-column w-50'> 
            <DatePicker className='m-2'
             format="DD:MM:YYYY"
             onChange={(value) => {
              // setIsAvailable(false)
              setDate(moment(value).format("DD:MM:YYYY"))
             }
            }
            />
            <TimePicker className='m-2'
              format="HH:mm" onChange={(values) => {
                // setIsAvailable(false)
                setTime(moment(values).format("HH:mm"))
              }} />
            <button className='btn btn-dark m-2' onClick={handleAvailability}>Check Availbility</button>
            
            <button className='btn btn-success m-2' onClick={handleBooking}>Book Now</button>
            
            </div>
          </div>
        )}
        </div>
    </Layout>
  )
}

export default BookingPage;