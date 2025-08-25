const BloodDonation = require('../Model/bloodDonationModel')
const Event = require('../Model/eventModel')
const Rooms = require('../Model/roomModel')
const Product = require('../Model/productModel')


exports.getall = async(req,res,next)=>{
    try{
        const blooddonations = await BloodDonation.find().sort({createdAt:-1})
        const events = await Event.find().sort({createdAt:-1})
        const rooms = await Rooms.find().sort({createdAt:-1})
        const products = await Product.find().sort({createdAt:-1})
        


        console.log(blooddonations)
        console.log(events)
        console.log(rooms)
        console.log(products)

        const combinedData = [
            ...blooddonations.map(doc => ({...doc.toObject() , type: 'BloodDonation'})),
            ...events.map(doc=>({...doc.toObject(),type:'Event'})),
            ...rooms.map(doc=>({...doc.toObject(), type:'Rooms'}),
            ...products.map(doc=>({...doc.toObject(), type:'Products'})))
        ]
        console.log(combinedData)

        const sortedData = combinedData.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt) )

        res.status(200).json({message:"Retrived all data ", sortedData})
    }catch(err){
        return res.status(500).json({message:"Error fetching all data", error:err.message})
    }
}