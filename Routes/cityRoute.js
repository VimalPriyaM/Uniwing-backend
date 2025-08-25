const {Router} = require('express')

const router = Router()
const {createCity, getAllCities, getCityById, updateCity, deleteCity} = require('../Controller/cityController')
router.post('/createcity', createCity)
router.get('/getallcities', getAllCities)
router.get('/getcitybyid/:id', getCityById)
router.post('/updatecity/:id', updateCity)
router.post('/deletecity/:id', deleteCity)



module.exports = router




