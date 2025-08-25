const {Router} =require('express')

const router = Router()
const authenticateStudent = require('../authenticate')


const {createDonation, updateDonationStatus, deleteDonation, getAllDonations, getDonationById}= require('../Controller/bloodDonationController')
router.post('/createdonation/:id', createDonation)
router.get('/alldonations',getAllDonations)
router.get('/donationperson/:id',getDonationById)
router.put('/donationstatus/:id',authenticateStudent, updateDonationStatus)
router.delete('/deletedonation/:id',authenticateStudent,deleteDonation)

module.exports = router






8

//     /api/blooddonation/createdonation
//     /api/blooddonation/alldonations
//     /api/blooddonation/donationperson/:id
//     /api/blooddonation/donationstatus/:id
//     /api/blooddonation/deletedonation