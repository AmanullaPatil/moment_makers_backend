const Organizer = require('../models/Organizer')

const uploadImageConrollers = async (req, res) => {
    try {
      // Update the organizer's profile with the image URL or other relevant data
      const userId = req.user.id;
      const imageUrl = req.file.path; // This will be the path to the uploaded image
      console.log(req.file)
      let success = false;
  
      // Update the Organizer model with the imageUrl
      await Organizer.findByIdAndUpdate(userId, { $set: { image: imageUrl } });
      success = true
      res.json({success,  message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  module.exports = uploadImageConrollers