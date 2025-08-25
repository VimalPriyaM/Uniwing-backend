const {Router} = require('express')
const router = Router()
const {getAllNews} = require('../Controller/collegeNewsController')

router.get('/getall/:id',getAllNews)

module.exports = router



//      http://localhost:3000/api/yourcollege/getall/:id