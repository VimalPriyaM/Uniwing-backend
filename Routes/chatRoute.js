const {Router} = require('express')
const router = Router()
const { send, allMessages} = require('../Controller/chatController')
router.post('/send',send)
router.get('/history/:student1/:student2',allMessages)
module.exports = router