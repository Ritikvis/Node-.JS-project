const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


router.post('/', async (req,res)=>{
    try{
      const data = req.body
 
 // Create a new person document using the mongoose model
     const newMenu = new MenuItem(data);
     const response = await newMenu.save();
     console.log('data saved');
     res.status(200).json(response);
    } catch(err){
     console.log(err);
     res.status(500).json({error:'Internal service errror'});
    }
 })



 // Create a endpoint for MenuItem schema
router.get('/', async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('data feyched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal service errror'});

    }
})

router.get('/:taste',async (req, res)=>{
    try{
        const taste = req.params.taste;
        if(taste=='sour' || taste=='spicy' || taste=='sweet' ){
            const response = await MenuItem.find({taste : taste});
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
        const menuId = req.params.id;
        // Update data for the person
        const updateMenuData  = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId,updateMenuData,{
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
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
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