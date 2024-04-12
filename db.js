const mongoose  = require('mongoose');
require('dotenv').config();
// Define the  MongoDb connections URL
const mongoURL = process.env.MONGODB_URL_LOCAL;
// const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// Get the default connections
// Mongoode maintain a default connections object representing the MongoDB connections;
const db = mongoose.connection;

// Define event for database connections
db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err)=>{
    console.log('MongoDB error',err);
})

db.on('disconnected',()=>{
    console.log('disConnected MongoDB server');
})

// Export yhe database connections
module.exports  = db;