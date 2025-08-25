const Product = require('../Model/productModel')

//createProduct
exports.createProduct = async (req, res, next) => {
    try {
        const { productCode, name, district, images, price, status, college, student } = req.body
        const product = new Product({ productCode, name, district, images, price, status, college, student })
        await product.save()
        return res.status(201).json(product)
    } catch (err) {
        return res.status(500).json({ message: "Error creating Product", error: err.message })
    }
}

//getallproduct
exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate('college', 'name city')
            .populate('student', 'name college mobileNo email gender')
        res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({ message: "Error in fetching prodicts", error: err.message })
    }
}

//getproductsbyId

exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
            .populate('college', 'name city')
            .populate('student', 'name college mobileNo email gender')

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        return res.status(200).json(product)
    } catch (err) {
        return res.status(500).json({ message: "Error in fetching Product", error: err.message })
    }
}

//updatestatus

exports.updateProductStatus = async (req, res, next) => {
    try {
        const { id } = req.params
        const { status } = req.body
        if (!['active', 'inactive'].includes(status)) {
            return res.status(404).json({ message: 'Invalid status value' })
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { status }, { new: true })
            .populate('college', 'name city')
            .populate('student', 'name college mobileNo email gender')
        if (!updatedProduct) {
            return res.status(404).jsono({ message: "Product not found" })
        }
        return res.status(200).json(updatedProduct)
    } catch (err) {
        return res.status(500).json({ message: "Error updating Product", error: err.message })
    }
}

//deleteProduct

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404), json({ message: "Product not found" })
        }
        return res.status(200).json({ message: "Product deleted Sucessfully" })
    } catch (err) {
        return res.status(500).json({ message: "Error deleting product", error: err.message })
    }
}
