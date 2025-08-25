const {Router} = require('express')

const router = Router()

const {createCollege, getAllColleges, getCollegeById, updateCollege , deleteCollege} = require('../Controller/collegeController')
router.post('/createcollege',createCollege)
router.get('/getallcolleges', getAllColleges)
router.get('/getcollegebyid/:id', getCollegeById)
router.put('/update/:id', updateCollege)
router.post('/delete/:id', deleteCollege)


module.exports = router

