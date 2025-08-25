const { error } = require('console')
const mongoose = require ('mongoose')
const College = require('../Model/collegeModel')
const City = require('../Model/cityModel');
const Dept = require('../Model/deptModel');
//college controlller
 
//crete a college

exports.createCollege = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);  // Log the request body to verify input

        const { name, city, emailExtension, pincode, departments } = req.body;

        if (!name || !city || !emailExtension || !pincode) {
            return res.status(400).json({ message: 'All fields (name, city, emailExtension, pincode) are required' });
        }

        // Check if the college already exists by name
        const existingCollege = await College.findOne({ name });
        if (existingCollege) {
            return res.status(400).json({ message: 'College already exists' });
        }

        // Create the college without additional validation
        const newCollege = new College({
            name,
            city,
            emailExtension,
            pincode,
            departments,
        });

        await newCollege.save();
        res.status(201).json({ message: 'College created successfully', college: newCollege });
    } catch (err) {
        console.error("Error:", err.message);  // Log the error for debugging
        res.status(500).json({ message: 'Error creating college', error: err.message });
    }
};
// Get all colleges
exports.getAllColleges = async (req, res, next) => {
    try {
        const colleges = await College.find()
            .populate('city') // Populate city details
            .populate('departments'); // Populate department details
        res.status(200).json(colleges);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching colleges', error: err.message });
    }
};


//get a college by id
exports.getCollegeById = async (req,res,next) => {
    try{
        const {id} = req.params
        const colleges = await College.findById(id)
        if(!colleges ) {
            return res.status(404).json({message:"Colllege is not found"})
        }
        return res.status(200).json(colleges)
    }
    catch(err){
        return res.status(500).json({message:"Error fetching college", error : err.message})
    }
}

//update a college

exports.updateCollege = async (req,res,next) => {
    try{
        const {id} = req.params
        const {name, city, emailExtension, pincode, departments } = req.body
        const colleges = await College.findByIdAndUpdate(id,{name, city, emailExtension, pincode, departments},{new:true})
        if(!colleges){
            return res.status(404).json({message:"College not found"})
        }
        return res.status(200).json({message:"City Updated Successfully", updatedCollege : colleges})
    }
   catch(err){
    return res.status(500).json({message:"Error updating college",error:err.message})
}
}

//delete a college

exports.deleteCollege = async(req,res,next)=>{
    try{
        const {id} = req.params
        const colleges = await College.findByIdAndDelete(id)
        if(!colleges){
            return res.status(404).json({message:"College not found "})
        }
        return res.status(200).json({message:'College deleted successfully'})
    }catch(err){
        return res.status(500).json({message:"Error i deleting college",error:err.message})
    }
}
