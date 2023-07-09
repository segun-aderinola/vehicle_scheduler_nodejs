const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/api');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
dotenv.config();
// middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.use("*", (req, res) => {
    res.status(404).send("Error 404");
  });
// listen to a port
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI || "";
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('Database connected...');
}).catch(err => console.log(err));
    

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`);
})

