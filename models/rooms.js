
const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    roomNumber:{
        type:Number,
        required:true
    },
    facality:{
        type : String
    },
    Roomtype:{
        type:String,
        enum:['sweet','premium','silver','gold'],
        required:true
    },
    price:{
        type:Number,
    }
})
const rooms = mongoose.model('rooms',roomSchema);
module.exports = rooms;