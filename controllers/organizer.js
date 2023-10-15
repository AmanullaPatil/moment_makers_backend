const Organizer = require('../models/Organizer')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

const organizersControllers =  async (req, res) => {
    try {
        const organizers = await Organizer.find();
        res.status(200).json(organizers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching organizer data' });
    }
}

const createorganizer = async (req, res) => {

  let success = false;
  try {
      //*********Express validation */
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
      }
      let user = await Organizer.findOne({ email: req.body.email });
      if (user) {
          success= false
          return res.json({ success, error: "Sorry, a user with this email already exists..." });
      }
      let phnumber = await Organizer.findOne({ phone: req.body.phone });
      if (phnumber) {
          success= false
          return res.json({ success, error: "Sorry, the mobile number is already in use..." });
      }

      //Hashing the password to secure it using bcryptJS
      const salt = await bcrypt.genSaltSync(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await Organizer.create({
          firstname: req.body.firstname,
          email: req.body.email,
          phone:req.body.phone,
          category:req.body.category,
          pricing:req.body.pricing,
          state:req.body.state,
          about:req.body.about,
          city:req.body.city,
          charge1:req.body.charge1,
          charge2:req.body.charge2,
          password: secPassword,
      })
      const data = {
          user: {
              id: user.id
          }
      }
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      console.log({ success, authToken });
      res.json({ success, authToken });
  }
  catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }


}

const vendorlogin = async (req, res) => {


  let success = false;

  try {


      //*********Express validation */
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ success, errors: errors.array() });
      }

      const { email, password } = req.body;

      let user = await Organizer.findOne({ email });
      if (!user) {
          return res.json({ success, error: "Please check the credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
          success = false
          return res.json({ success, error: "Please enter a valid password" });
      }


      const data = {
          user: {
              id: user.id
          }
      }

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authToken });


  }


  catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }



}


    const deleteorganizer= async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Check if the user with the given ID exists
      const user = await Organizer.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
  
      // Delete the user
      await Organizer.findByIdAndDelete(userId);
  
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };

  const getOrganizers = async (req, res) => {

    try {
        const userId = await req.user.id;
        console.log("userId-", userId)

        const user = await Organizer.findById(userId).select('-password');

        res.send(user);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}

module.exports = { 
  organizersControllers, 
  deleteorganizer,
  createorganizer,
  vendorlogin,
  getOrganizers
}