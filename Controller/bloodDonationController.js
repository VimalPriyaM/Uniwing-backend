const BloodDonation = require('../Model/bloodDonationModel')

//blooddonation create entry

exports.createDonation = async(req,res,next) => {

    try{
        const student = req.params.id; 
        const {name, contactNo, bloodGroup, hospitalLocation, description, status, studentCollege} = req.body
        if(!name || !contactNo || !bloodGroup || !hospitalLocation || !description || !status || !studentCollege){
            return res.status(400).json({message:"All fields are required"})
        }
        const newDonation =new BloodDonation({name, contactNo, bloodGroup, hospitalLocation, description, status, studentCollege,student })
        await newDonation.save()
        return res.status(201).json({message:'Blood donation information saved successfully',newDonation})
    }catch(err){
        return res.status(500).json({message:'Error creating blood donation',error:err.message})
    }
}


exports.getAllDonations = async(req,res,next)=>{
    try{
        const donations = await BloodDonation.find().populate({path:'studentCollege',
            populate:{ path:'city',
            select: 'name'}})
        return res.status(200).json(donations)
    }catch(err){
        return res.status(500).json({message:'Error received in blood donation ',error:err.message})
    }
}

//get donation by id
exports.getDonationById = async (req, res, next) => {
    try {
        const studentId = req.params.id;

       const donation = await BloodDonation.find({ student: studentId })
  .populate({
    path: 'studentCollege',
    select: 'name city',
    populate: {
      path: 'city',
      select: 'name'
    }
  });


        if (donation.length === 0) {
            return res.status(404).json({ message: "Not registered for Blood Donation yet" });
        }

        return res.status(200).json(donation);
    } catch (err) {
        return res.status(500).json({ message: "Error in fetching details", error: err.message });
    }
};

//update donation status by id
exports.updateDonationStatus = async (req,res,next)=>{
    try{
        const {id} = req.params
        const {status} = req.body
        if (!['Active', 'Inactive'].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
         const updatedDonation = await BloodDonation.findByIdAndUpdate(id,{status},{new:true}).populate('studentCollege','name city')

         if(!updatedDonation){
            return res.status(404).json({message:"Blood donation not found"})
         }
         return res.status(200).json(updatedDonation)
    }catch(err){
        return res.status(500).json({message:'Error updating blood donation status'})
    }
}

//delete donation by id

exports.deleteDonation = async (req,res,next)=>{
    try{
        const {id} = req.params
        const deletedDonation = await BloodDonation.findByIdAndDelete(id)
        if(!deletedDonation){
            return res.status(404).json({message:"Donation information not found"})
        }
        return res.status(200).json({message:"Donation information deleted Successfully"})
    }catch(err){
        return res.status(500).json({message:'Error in deleting information',error:err.message})
    }
}