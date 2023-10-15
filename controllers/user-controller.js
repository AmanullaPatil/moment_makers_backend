 const User = require('../models/User')
 const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

// const process.env.JWT_SECRET = "thisISveryImportant@forSecurity";

 const createUser = async (req, res) => {
    //console.log(req.body);

    //********************** */ For storing data into mongo database without validation
    // const user = User(req.body);
    // user.save();

    let success = false;



    try {


        //*********Express validation */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success= false
            return res.json({ success, error: "Sorry, a user with this email already exists..." });
        }





        //Hashing the password to secure it using bcryptJS
        const salt = await bcrypt.genSaltSync(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })



        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        // console.log({ success, authToken });
        res.json({ success, authToken });



        //res.json({success: "User created successfully"});


    }


    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }


}

const getUsers = async (req, res) => {

    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password');
        res.send(user);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

const deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Check if the user with the given ID exists
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
  
      // Delete the user
      await User.findByIdAndDelete(userId);
  
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

module.exports = { createUser, getUsers, deleteUser }