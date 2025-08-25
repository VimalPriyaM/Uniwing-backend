const {Router} = require('express')
const router = Router()

const {getall} = require('../Controller/combinedController')

router.get('/getall',getall)

module.exports = router