const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// POST route to add a person

router.post('/', async (req,res)=>{
    try{
      const data = req.body
 
 // Create a new person document using the mongoose model
     const newPerson = new Person(data);
     const response = await newPerson.save();
     console.log('data saved');
     res.status(200).json(response);
    } catch(err){
     console.log(err);
     res.status(500).json({error:'Internal service errror'});
    }
 })
 
 // GET route to add a person
router.get('/', async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data feyched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal service errror'});

    }
})

// person workType

router.get('/:workType',async (req, res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType=='manager' || workType=='waiter' ){
            const response = await Person.find({work : workType});
            console.log('response fetched');
            res.status(200).json(response);
        } 
        else{
            res.status(404).json({error:'Invalid work type'});
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
        const personId = req.params.id;
        // Update data for the person
        const updatePersonData  = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
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
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
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