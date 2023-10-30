import React from 'react';
import Layout from "./../components/Layout";
import { Row, Col, Form, Input, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplyDoctor = () => {
    const {user} = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // handle form
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading()) 
            const res = await axios.post('/api/v1/user/apply-doctor', {...values, userId:user._id},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success) {
                message.success(res.data.message)
                navigate('/')
            } else {
                message.error(res.data.success)
            }
        } catch {
            dispatch(hideLoading())
            //console.log(error);
            message.error('Something went wrong')
        }
    }
  return (
    <Layout>
        <h2 className='text-center'>Apply Dcotor</h2>
        <Form layout="vertical" onFinish={handleFinish} className='m-3'>
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
                 <button className='btn btn-success' type='submit'> Submit </button>
            </div>
        </Form>
    </Layout>
  )
}

export default ApplyDoctor;