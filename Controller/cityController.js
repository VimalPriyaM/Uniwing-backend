const { error } = require('console')
const City = require('../Model/cityModel')


exports.createCity = async (req, res, next) => {
    try {
        const { name } = req.body
        const existingCity = await City.findOne({ name })

        if (existingCity) {
            return res.status(400).json({ message: 'City already exists' })
        }

        const newCity = new City({name})
        await newCity.save()
        return res.status(201).json(newCity)
    }catch(err){
        return res.status(500).json({Message: "Error in Creating City", error  :err.message})
    }
}

//getallCity
exports.getAllCities = async (req,res,next) =>{
    try{
        const cities = await City.find({})
         return res.status(200).json(cities) 
    }
    catch(err){
        return res.status(500).json({message:"Error fetching Cities",error:err.message})
    }
}

//get a city by id

exports.getCityById = async(req,res,next)=>{
    try{
        const {id} = req.params
        const city = await City.findById(id)
        if(!city){
            return res.status(404).json({message:"City not found"})
        }
        return res.status(200).json(city)
    }
    catch(err){
        return res.status(500).json({message:"Error fetching City", error: err.message})
    }
}

//Update a city

exports.updateCity = async(req,res,next)=>{
    try{
        const {id} = req.params
        const {name} = req.body
        const city = await City.findByIdAndUpdate(id,{name},{new:true})
        if(!city){
            return res.status(404).json({message:"city not found"})
        }
        return res.status(200).json({message:"City Updated Successfully", updatedCity:city})
    }
    catch(err){
        res.status(500).json({message:"Error in updating city", error:err.message})
    }
}

//delete a city
 
exports.deleteCity = async(req,res,next)=>{
    try{
        const {id} = req.params
        const city = await City.findByIdAndDelete(id)
        if(!city){
            return res.status(404).json({message:"City not found "})
        }
        return res.status(200).json({message:'City deleted successfully'})
    }catch(err){
        return res.status(500).json({message:"Error i deleting City",error:err.message})
    }
}
