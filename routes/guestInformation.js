const express = require('express');
const router = express.Router();
const guest = require('./././../models/guest');
router.post('/', async (req,res)=>{
    try{
        const data = req.body
        const newguest = new guest(data);
        const response = await newguest.save();
        console.log('save data');
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal service errror'});
    }
})
router.get('/', async (req,res)=>{
    try{
        const data = await guest.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal service errror'});

    }
})

router.get('/:paymentoption',async (req, res)=>{
    try{
        const paymentoption = req.params.paymentoption;
        if(paymentoption=='upi' || paymentoption=='cash' || paymentoption=='online'){
            const response = await guest.find({paymentoption : paymentoption});
            console.log('response fetched');
            res.status(200).json(response);
        } 
        else{
            res.status(404).json({error:'Invalid taste'});
        }
    }
    catch(err){
       console.log(err);
        res.status(500).json({error:'Internal service errror'});
    }
})

router.put('/:id',async (req,res)=>{
    try{
        // Extract the id from the url parameter
        const guestId = req.params.id;
        // Update data for the person
        const updateGuestData  = req.body;

        const response = await guest.findByIdAndUpdate(guestId,updateGuestData,{
//      Return the update document
            new:true,
//      return mangoose valiadation
            runValidators:true

        })
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data update');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal service errror'});
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const guestId = req.params.id;
        const response = await guest.findByIdAndDelete(guestId);
        if(!response){
            return res.status(404).json({error:"Person not fount"});
        }
        console.log('data delete');
        res.status(200).json({message: 'person delete sucessfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal service errror'});
    }
})


module.exports = router;