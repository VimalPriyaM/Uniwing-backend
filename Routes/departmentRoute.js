const {Router} = require('express')

const router = Router()
const {createDept, getAllDept, getDeptById, updateDept,deleteDept } = require('../Controller/departmentController')


router.post('/createdept', createDept)
router.get('/getalldept', getAllDept)
router.get('/getdeptbyid/:id',getDeptById)
router.post('/updatedept/:id', updateDept)
router.post('/deletedept/:id', deleteDept)

module.exports = router


 