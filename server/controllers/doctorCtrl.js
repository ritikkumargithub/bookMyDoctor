const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')

const getDoctorInfoController = async (req,res) => {
    try {
       const doctor = await doctorModel.findOne({userId: req.body.userId})
       res.status(200).send({
        success:true,
        message:"Doctor Data Fetches Successfully",
        data:doctor
       })
    } catch(error) {
        // console.log(error);
        res.status(500).send({
           success:false,
           error,
           message:'Error in fetching Doctor Details'
        })
    }
}

// update doctor profle
const updateProfileController = async (req,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body);
        res.status(200).send({
            success: true,
            message: "Doctor Profile Updated",
            data: doctor
        })
    } catch(error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Doctor Profile Update issue",
            error
        })
    }
}

// get doctor controller
const getDoctorByIdController = async (req,res) => {
   try {
     const doctor = await doctorModel.findOne({_id:req.body.doctorId});
     res.status(200).send({
        success: true,
        message: 'Single doctor Info fetched successfully',
        data: doctor
     })
   } catch(error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in single doc info",
            error
        })
   }
}

// get appointments
const doctorAppointmentController = async(req, res) => {
  try {
    const doctor = await doctorModel.findOne({userId:req.body.userId})
    const appointment = await appointmentModel.find({doctorId:doctor._id})
    res.status(200).send({
        success: true,
        message: 'Doctor appointment fetched successfully',
        data: appointment
     })
  } catch(error) {
    // console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in Doctor appointment",
        error
    })
  }
}

// update status of appointment
const updateStatusController = async(req, res) => {
  try {
    const {appointmentsId, status} = req.body
    const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
    const user = await userModel.findOne({_id: appointments.userId})
    const notification = user.notification
    notification.push({
      type: 'Status updated',
      message: `A appointment has been updated from ${status}`,
      onClickPath: '/doctor-appointments'
    })
    await user.save() 
    res.status(200).send({
        success: true,
        message: 'Appointment status updated',
     })
  } catch(error) {
    // console.log(error);
    res.status(500).send({
        success: false,
        message: "Error in update status",
        error
    })
  }
}

module.exports = {
    getDoctorInfoController,
    updateProfileController,
    getDoctorByIdController,
    doctorAppointmentController,
    updateStatusController
};