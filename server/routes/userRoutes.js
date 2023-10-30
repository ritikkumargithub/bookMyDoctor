const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailbilityController,
  userAppointmentController,
} = require("../controllers/userCtrl")
const authMiddleware = require("../middlewares/authMiddleware");


//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);
// module.exports = router;

// auth || POST
router.post('/getUserData', authMiddleware, authController);
// module.exports = router;

// Apply doctor || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// notification doctor || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

// delete all notification doctor || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

// get all doctor
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

// Book appointment
router.post('/book-appointment',authMiddleware,bookAppointmentController)

// check booking availbility
router.post('/booking-availbility',authMiddleware,bookingAvailbilityController)

// appointment list 
router.get('/user-appointments',authMiddleware,userAppointmentController);
module.exports = router;