const express = require('express');
const router = express.Router();
const rooms = require('././../models/rooms');
router.post('/', async (req,res)=>{
    try{
        const data = req.body
        const newroom = new rooms(data);
        const response = await newroom.save();
        console.log('save data');
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal service errror'});
    }
})
router.get('/', async (req,res)=>{
    try{
        const data = await rooms.find();
        console.log('data feyched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal service errror'});

    }
})
router.get('/:Roomtype',async (req, res)=>{
    try{
        const Roomtype = req.params.Roomtype;
        if(Roomtype=='sweet' || Roomtype=='silver' || Roomtype=='premium' || Roomtype=='gold' ){
            const response = await rooms.find({Roomtype : Roomtype});
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
        const roomId = req.params.id;
        // Update data for the person
        const updateRoomData  = req.body;

        const response = await rooms.findByIdAndUpdate(roomId,updateRoomData,{
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
        const roomId = req.params.id;
        const response = await rooms.findByIdAndDelete(roomId);
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