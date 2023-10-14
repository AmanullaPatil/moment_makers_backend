const express = require ('express');
const router = express.Router()
const adminController =require('../controllers/admin-controller.js');

// console.log(createAdmin())
router.route('/create-admin').post(adminController.createAdmin)
router.route('/admin-login').post(adminController.adminLogIn);
router.route('/update-admin-password').put(adminController.updateAdmin)

module.exports = router;