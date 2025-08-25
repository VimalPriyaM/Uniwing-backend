const { error } = require('console')
const Dept = require('../Model/deptModel')
//Creating department
exports.createDept = async (req,res,next)=>{
    try{
    const {name} =req.body

    const existingDept = await Dept.findOne({name})
    if (existingDept){
        return res.status(400).json({message:"Department already exists"})
    }

    const newDept = new Dept({name})
    await newDept.save()

    return res.status(201).json({message:"Department created successfully", Dept:newDept})
}
catch(err){
    res.status(500).json({message:'Error in creating department', error:err.message})
}
}

//Get all department 
exports.getAllDept = async(req,res,next)=>{
    try{
        const department = await Dept.find()
        return res.status(200).json(department)
    }catch(err){
        return res.status(500).json({message:"Error in fetching department",error:err.message})
    }
}

//get a department by ID 
exports.getDeptById = async(req,res,next)=>{
    try{
        const {id}=req.params
        const department = await Dept.findById(id)
        if(!department){
            return res.status(404).json({message:"Department not found"})
        }
        return res.status(200).json(department)
    }
    catch(err){
        return res.status(500).json({message:"Error in fetching dapartment",error:err.message})
    }
}

//Update a department By ID

exports.updateDept = async(req,res,next)=>{
    try{
        const { id } = req.params
        const {name} = req.body
        const updatedDept = await Dept.findByIdAndUpdate(id,{name},{new:true})
        if(!updatedDept){
            return res.status(404).json({message:"Department not found"})
        }
        return res.status(200).json({message:"Department updated successfully", department:updatedDept})
    }catch(err){
        return res.status(500).json({message:'Error in updating department ',error:err.message})
    }
}

//Delete a dept

exports.deleteDept = async(req,res,next)=>{
    try{
        const{id}= req.params
        const deletedDept = await Dept.findByIdAndDelete(id)
        if(!deletedDept){
            return res.status(404).json({message:"Department not found "})
        }
        return res.status(200).json({message:"Department deleted successfully"})
    }
    catch(err){
        return res.status(500).json({messsage:"Error in deleting department ",error:err.message})
    }
}