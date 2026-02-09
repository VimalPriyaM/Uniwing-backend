const express = require('express')
const HTTP_SERVER = express()
HTTP_SERVER.use('/api/city', require('./Routes/cityRoute'))
HTTP_SERVER.use('/api/department', require('./Routes/departmentRoute'))
HTTP_SERVER.use('/api/college', require('./Routes/collegeRoute'))
HTTP_SERVER.use('/api/student', require('./Routes/studentRoute'))
HTTP_SERVER.use('/api/blooddonation', require('./Routes/bloodDonationRoute'))
HTTP_SERVER.use('/api/product', require('./Routes/productRoute'))
HTTP_SERVER.use('/api/room', require('./Routes/roomRoute'))
HTTP_SERVER.use('/api/event', require('./Routes/eventRoute'))
HTTP_SERVER.use('/api/data', require('./Routes/combinedRoute'))
HTTP_SERVER.use('/api/yourcollege', require('./Routes/collegeNewsRoute'))
HTTP_SERVER.use('/api/chat', require('./Routes/chatRoute'))
HTTP_SERVER.use('/api/grok', require('./Routes/grokRoute'))
HTTP_SERVER.use("/uploads", express.static("uploads"));

module.exports = HTTP_SERVER