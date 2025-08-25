const {Router} = require ('express')
const router = Router()

const{createProduct,deleteProduct,updateProductStatus, getAllProduct, getProductById} = require('../Controller/productController')

router.post('/createProduct',createProduct)
router.get('/allproducts',getAllProduct)
router.get('/getproduct/:id',getProductById)
router.put('/updatestatus/:id',updateProductStatus)
router.post('/deleteproduct/:id',deleteProduct)

module.exports = router

