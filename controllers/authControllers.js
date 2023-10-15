const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {


    let success = false;

    try {


        //*********Express validation */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            success = false
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

module.exports = userLogin