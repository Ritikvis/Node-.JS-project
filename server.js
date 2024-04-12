const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT||3000;

app.get('/', function (req, res) {
    res.send('Welcome to my hotel')
})

// Import the router file
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const roomservice = require('./routes/roomservice');
const guestInformation = require('./routes/guestInformation');

// use the router
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);
app.use('/room',roomservice);
app.use('/guest',guestInformation);

// hello
app.listen(PORT,()=>{
    console.log("listening on port 3000");
})
