const {Router} = require('express')
const router = Router()
const authenticateStudent = require('../authenticate')

const {createRoom,getAllRooms,getRoomById,updateRoomStatus,deleteRoom} = require('../Controller/roomController')

router.post('/create',createRoom)
router.get('/getall',getAllRooms)
router.get('/getbyid/:id',getRoomById)
router.put('/updatestatus/:id',updateRoomStatus)
router.delete('/delete/:id',authenticateStudent,deleteRoom)

module.exports = router





//      http://localhost:3000/api/room/delete/67344486551539e379a2525e
//      http://localhost:3000/api/room/updatestatus/67344486551539e379a2525e
//      http://localhost:3000/api/room/getbyid/67344486551539e379a2525e
//      http://localhost:3000/api/room/getall
//      http://localhost:3000/api/room/create