
//Imported packages

const express = require('express');

//For hashing the password to secure it
const bcrypt = require('bcryptjs');

//Imported schema of the user
const User = require("../models/User");
const Otp = require("../models/Otp")
const Admin = require('../models/Admin')
const Organizer = require('../models/Organizer')


const fetchuser = require('../middleware/fetchuser')
const fetchorganizer = require('../middleware/fetchorganizer')

// nodemail
const nodemailer = require('nodemailer')








var jwt = require('jsonwebtoken'); //JWT included for security


//Express validator
const { body, validationResult } = require('express-validator');


// const fetchuser = require("../midleware/fetchUser");



//***************JSON WEB TOKEN SECRET KEY **************/

const JWT_SECRET = "thisISveryImportant@forSecurity";

//FOR image uploading
const multer = require('multer');
const path = require('path');
const { organizersControllers, createorganizer, vendorlogin, getOrganizers, deleteorganizer } = require('../controllers/organizer');
const uploadImageConrollers = require('../controllers/uploadImage');
const { createUser, getUsers, deleteUser } = require('../controllers/user-controller');
const userLogin = require('../controllers/authControllers');
const { createAdmin, adminLogIn } = require('../controllers/admin-controller');



//For routing
const router = express.Router();







//FOR setting the directory where our images will be stored.....
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the directory where images will be stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });



  router.post('/uploadimage', fetchorganizer, upload.single('image'), uploadImageConrollers);

//**** For creating user /auth/createUser        ---- No LOGIN REQUIRED  ----- */

router.post('/page1/createuser', [

    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 })


], createUser)



// **************************************************************************************
//ROUTE FOR CREATING AN ORGANIZER
router.post('/page1/createorganizer', [
    body('firstname', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 })
],createorganizer)


//**** To login the user with correct creds   /auth/login        ---- No LOGIN REQUIRED  ----- */
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()

], userLogin)

// -------------------------------------------------------------------

// VENDOR LOGIN

router.post('/vendorlogin', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()

], vendorlogin)



// -------------------------------
// TO FETCH ORGANIZER

// API endpoint to fetch organizer data
router.get('/organizers', organizersControllers);

// **** To get the user details   /auth/getuser        ---- LOGIN REQUIRED  ----- */
router.get('/getuser', fetchuser, getUsers)




// **** To get the organizer details   /auth/getorganizer        ---- LOGIN REQUIRED  ----- */
router.get('/getorganizer', fetchuser, getOrganizers)

// ---------------------- FOR Deleting the user-/
router.delete('/deleteuser/:userId', deleteUser);








  //FOR deleting the organizer
  router.delete('/deleteorganizer/:userId', deleteorganizer)

// API endpoint to fetch organizer data
// router.get('/getusers');








   


router.post('/page1/createadmin', createAdmin)

        // .then(user => res.json(user))
        // .catch(err=> {console.log(err)
        // res.json({error:"Email is already in use", message:err.message})});





//**** To login the user with correct creds   /auth/adminlogin        ---- No LOGIN REQUIRED  ----- */
router.post('/adminlogin', adminLogIn)


module.exports = router;