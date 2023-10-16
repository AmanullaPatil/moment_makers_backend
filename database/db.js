const mongoose = require('mongoose');




const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on('connected', () => console.log('Connected'));
    mongoose.connection.on('error', (err) => console.log('Connection failed with - ',err));
}


module.exports = connectToMongo;
// kZPItoneNPVCvaIk