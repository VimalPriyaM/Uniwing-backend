const express = require('express')
const HTTP_SERVER = express()
const {Server} = require('socket.io')
const cors = require('cors')
require('./dbConfig')
const PORT = process.env.PORT || 8080


//middleware
HTTP_SERVER.use(cors())
HTTP_SERVER.use(express.json())
HTTP_SERVER.use(express.urlencoded({extended:false}))


//Create HTTP server and attach Socket.IP to it
const server = HTTP_SERVER.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`)
})

//Initialize Socket.IO
const io = new Server(server, {
    cors:{
        origin:'*',
        methods:['GET','POST'],
    },
})

//Handle socket connections
io.on('connection', (socket) =>{
    console.log(`User connected with socket ID: ${socket.id}`)

    //register user 
    socket.on('register',(userId)=>{
        console.log(`User ${userId} registered with socket ${socket.id}`)
    })

    //listen for incoming and emit to target user
    socket.on('sendmesssage',(data)=>{
        const {sender, receiver, message} = data;
    
        socket.to(receiver).emit('receiveMessage', {sender, message})
        console.log(`Message sent from ${senderId} to ${receiverId}: ${message}`);
})
    //Handle disconnection
    socket.on('disconnect',()=>{
        console.log('User disconnected')
    })

})

HTTP_SERVER.use('/',require('./app'))