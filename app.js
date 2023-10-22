require('dotenv').config()
const express = require('express')
const app = express()
const connectToMongo = require("./database/db");
const authRoutes = require('./routes/auth')
const path = require('path');

const cors = require('cors');
const routes = require('./routes')
// //For connecting the Database To MongoDB
connectToMongo();






//Express APIs
const port = 5000



//Middleware for the "req" 
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000', '*', 'http://localhost:8000', 'localhost:3000', "https://momentmakers.vercel.app", "momentmakers.vercel.app"],
  credentials: true,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));




//Available Routes

app.get('/login', (req, res) => {
  res.send("Login");
});

app.use('/api', routes);

app.use('/auth',authRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})


