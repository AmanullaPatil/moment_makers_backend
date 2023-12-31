const mongoose = require('mongoose');
const { Schema } = mongoose;


const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type:String,
        required:true
    }
});


const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin;