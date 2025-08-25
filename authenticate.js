const jwt = require('jsonwebtoken')

const authenticateStudent = (req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) {
        return res.status(401).json({message:"unauthorised access. No token provided"})

    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.student = decoded
        next()
    }catch(error){
        res.status(401).json({message:"Invalid token. Unauthorized access."})
    }
}   

module.exports = authenticateStudent;