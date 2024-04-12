const mongoose = require('mongoose');
const guestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Adharnumber:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    paymentoption:{
        type:String,
        enum:['upi','cash','online'],
        required:true
    },
    Numberofpeople:{
        type:Number,
        required:true
    },
    luggauge:{
        type:String
    }
})
const guest = mongoose.model('guest',guestSchema);
module.exports = guest;