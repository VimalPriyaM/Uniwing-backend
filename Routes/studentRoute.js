const {Router} = require('express')

const router = Router()
const {signup, login} = require('../Controller/studentController')

router.post('/signup',signup)
router.post('/login',login)

module.exports = router 





//http://localhost:3000/api/student/login