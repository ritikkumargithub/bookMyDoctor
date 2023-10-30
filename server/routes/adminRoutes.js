const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const { 
    getAllDoctorsController, 
    getAllUserController,
    checkAccountStatusController,
    } = require("../controllers/adminCtrl");


// GET METHOD || USER
router.get('/getAllUsers',authMiddleware,getAllUserController)

// GET METHOD || DOCTOR
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController)

// POST METHOD || DOCTOR ACCOUNT STATUS
router.post('/changeAccountStatus',authMiddleware,checkAccountStatusController)

module.exports = router;