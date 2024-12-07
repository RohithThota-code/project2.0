const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser =require('cookie-parser')
const app = express()



mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database is connected'))
    .catch((err) => console.log('Database connection failed:', err))



app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));


app.use(express.json({limit:'10mb'})); 
app.use(express.urlencoded({ extended: false, limit: '10mb'}));
app.use(cookieParser());

app.use('/', require('./routes/authRoutes'))


const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))
