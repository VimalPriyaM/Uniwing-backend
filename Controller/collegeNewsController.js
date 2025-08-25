const BloodDonation = require('../Model/bloodDonationModel')
const Event = require('../Model/eventModel')
const Rooms = require('../Model/roomModel')
const Product =  require('../Model/productModel')
const { Promise } = require('mongoose')

exports.getAllNews = async(req,res,next)=>{
    try{
    const {id} = req.params
    if (!id) {
        return res.status(400).json({ message: 'College ID is required' });
    }
    console.log(id)
    // const [events , blooddonations , rooms , product]= await Promise.all([
    //     Event.find({college:id}),
    //     BloodDonation.find({studentCollege:id}),
    //     Rooms.find({college:id}),
    //     Product.find({college:id})
       
    // ])
    

    const product = await Product.find({college:id})
    const blooddonations = await BloodDonation.find({studentCollege:id})
    const rooms = await Rooms.find({college:id})
    const events = await Event.find({college:id})
    // console.log({events , blooddonations , rooms , product})


    const allNews = [
        ...(events|| []).map(doc =>({...doc.toObject(),type: 'Event'})),
        ...(blooddonations||[]).map(doc=> ({...doc.toObject(),type:'Blood Donation'})),
        ...(product||[]).map(doc=>({...doc.toObject(), type:'Product'})),
        ...(rooms||[]).map(doc=>({...doc.toObject(), type:'Rooms'}))
    ].sort((a,b)=>(new Date(b.createdAt)-new Date(a.createdAt)))

    console.log(allNews)
    return res.status(200).json(allNews)
}catch(err){
    return res.status(500).json({message:'Error fetching details',error:err.message})
}}