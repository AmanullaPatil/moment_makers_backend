const mongoose = require('mongoose');




const connectToMongo = ()=>{
    mongoose.connect("mongodb+srv://Amanpatel:kZPItoneNPVCvaIk@cluster0.5ik8wmj.mongodb.net/?retryWrites=true&w=majority");
    mongoose.connection.on('connected', () => console.log('Connected'));
    mongoose.connection.on('error', (err) => console.log('Connection failed with - ',err));
}


module.exports = connectToMongo;
// kZPItoneNPVCvaIk