const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {getDoctorInfoController, 
    updateProfileController, 
    getDoctorByIdController,
    doctorAppointmentController,
    updateStatusController}  = require("../controllers/doctorCtrl");
const router = express.Router();

// POST SINGLE DOC INFO
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

// POST UPDATE PROFILE
router.post('/updateProfile',authMiddleware,updateProfileController)

// GET SINGLE DOC INFO
router.post('/getDoctorById',authMiddleware,getDoctorByIdController)

// GET appointments
router.get('/doctor-appointments',authMiddleware,doctorAppointmentController)

// post update status
router.post('/update-status',authMiddleware,updateStatusController)
module.exports = router;