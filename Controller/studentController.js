const Student = require('../Model/studentModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//signUp
exports.signup = async(req,res,next)=>{
    try{
        const{name, college,department, mobileNo, email, gender, password, confirmPassword}= req.body
         
        if(password !==confirmPassword){
            return res.status(400).json({message:"Passwords do not match"})
        }
        if(!department){
            return res.status(400).json({message:"Deapartment is required"})
        }

        const existingStudent = await Student.findOne({$or:[{email},{mobileNo}]})
        if (existingStudent){
            return res.status(400).json({message:"Email or mobile Number already in use"})
        }

        //hassed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const student = new Student ({name, college, department, mobileNo , email,gender, password: hashedPassword })
        await student.save()

        const token =jwt.sign({id: student._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        res.status(201).json({message:"Student registered successfully",token})
    }catch(err){
        res.status(500).json({message:"Error in signup",error:err.message})
    }
}

//login 
exports.login = async (req,res,next)=>{
    try{
        const {email,password} = req.body

        const student =await Student.findOne({email})
        if(!student){
            return res.status(404).json({message:"Invalid email"})
        }
        const isPasswordMatch = await bcrypt.compare(password, student.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).json({message:"Login Successful", token,student})
    }catch(err){
        res.status(500).json({message:"Error in login",error:err.message})
    }
}
