import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Input, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {user} = useSelector(state => state.user)
  const [doctor, setDoctor] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams();

  // update doctor profile
  const handleFinish = async (values) => {
    try {
        dispatch(showLoading()) 
        const res = await axios.post('/api/v1/doctor/updateProfile', {...values, userId:user._id},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading())
        if(res.data.success) {
            message.success(res.data.message)
            navigate('/')
        } else {
            message.error(res.data.message) 
        }
    } catch {
        dispatch(hideLoading())
        //console.log(error);
        message.error('Something went wrong')
    }
}

  // get doctor details
  const getDoctorInfo = async() => {
    try {
      const res = await axios.post('/api/v1/doctor/getDoctorInfo',
      {userId: params.id},
      {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success) {
        setDoctor(res.data.data);
      }
    } catch(error) {
       //console.log(error);
    }
  };
  useEffect(() => {
    getDoctorInfo();
  },[]);
  return (
    <Layout>
        <h3 style={{textAlign:'center',padding:'10px'}}>Manage Your Profile</h3>
        {doctor && (
            <Form layout="vertical" onFinish={handleFinish} className='m-3' initialValues={doctor}>
            <h5 className=''>Personla Details : </h5>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your first name' />
                        </Form.Item>
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your last name' />
                        </Form.Item>
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone No" name="phoneno"  rules={[{required:false}]}>
                            <Input type='text' placeholder='your contact no' />
                        </Form.Item>
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your email address' />
                        </Form.Item>
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website" rules={[{required:false}]}>
                            <Input type='text' placeholder='your website' />
                        </Form.Item>
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Address" name="address" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your clinic address' />
                        </Form.Item>
                    </Col>
                </Row>
    
                <h5 className=''>Professional Details : </h5>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your specialization' />
                        </Form.Item>
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                            <Input type='text' placeholder='your experience' />
                        </Form.Item>
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Fees Per Cunsaltation" name="feesPerCunsaltation" required rules={[{required:true}]}>
                            <Input type='number' placeholder='your feesPerCunsaltation' />
                        </Form.Item>
                    </Col>
    
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Timings" name="timings"  rules={[{required:false}]}>
                            <TimePicker.RangePicker format={'HH:MM'}/>
                        </Form.Item>
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                     <button className='btn btn-success' type='submit'> Update </button>
                </div>
            </Form>
        )}
    </Layout>
  )
}

export default Profile