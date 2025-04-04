const express = require('express')
const app = require('./app.js')
const mongoose = require('mongoose')
const port = process.env.port || 4000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



// Connect to DATABASE
const DATABASE_URL = "mongodb+srv://abhishekkumar:uf9ce9FwUe1IUS4N@cluster0.ch2s7.mongodb.net/";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
