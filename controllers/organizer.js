const Organizer = require('../models/Organizer')

const organizersControllers =  async (req, res) => {
    try {
        const organizers = await Organizer.find();
        res.status(200).json(organizers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching organizer data' });
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

  

module.exports = (organizersControllers,deleteorganizer)