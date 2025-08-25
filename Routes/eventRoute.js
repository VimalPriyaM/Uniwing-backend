const {Router} = require('express')
const router = Router()
const upload = require("../middleware/multerconfig");
const {createEvent,deleteEvent,getAllEvents,getEventById,updateEvent} = require('../Controller/eventController')
router.post("/create/:id", upload.single("image"), createEvent);

router.get('/getall',getAllEvents)
router.get('/getbyid/:id',getEventById)
router.put('/update/:id',updateEvent)
router.post('/delete/:id',deleteEvent)

module.exports = router





//      http://localhost:3000/api/event/create
//      http://localhost:3000/api/event/getall
//      http://localhost:3000/api/event/getbyid/:id
//      http://localhost:3000/api/event/update/:id
//      http://localhost:3000/api/event/delete/:id