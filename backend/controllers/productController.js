import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
//asyncHandler auto-handle try& catch
//backend fetch data from MongoDB collections


// @des Fetch all products
// @route Get /api/products (query means String after "?" )
// @access Public
const getProducts = asyncHandler(async(req,res) =>{
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options:'i'
        }
       } : {}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
    res.json({products,page, pages: Math.ceil(count / pageSize)})

})

// @des Fetch single product
// @route Get /api/products/:id
// @access Public

const getProductById = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)

    if (product){res.json(product)}
    else{
        res.status(404)
        throw new Error('Product not found')
    }

})

// @des Delete a product
// @route DELETE /api/products/:id
// @access Private/admin

const deleteProduct = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({message:'Product removed'})
    } else{
        res.status(404)
        throw new Error('Product not found')
    }

})

// @des create a product
// @route Post /api/products
// @access Private/admin

const createProduct = asyncHandler(async(req,res) =>{
    const product = new Product({
        name:'Sample name',
        price: 0,
        user: req.user._id,
        image:'/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock:0,
        numReviews:0,
        description: 'Sample description'
    })
    const createProduct = await product.save()
    res.status(201).json(createProduct)

})

// @des Update a product
// @route PUT /api/products/:id
// @access Private/admin


const updateProduct = asyncHandler(async(req,res) =>{
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body

    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)

    } else{
        res.status(404)
        throw new Error('Product not found')
    }
})


// @des Create new review
// @route POST /api/products/:id/reviews
// @access Private


const createProductReview = asyncHandler(async(req,res) =>{
    const {rating, comment} = req.body
    
    const product = await Product.findById(req.params.id)
    if(product){
        const alreadyReviewed = product.reviews.find( r => r.user.toString() 
        === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error ('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating +acc,0) 
        / product.reviews.length

        await product.save()
        res.status(201).json({message:'Review added'})
    } else{
        res.status(404)
        throw new Error('Product not found')
    }
})

// @des Get top rated products
// @route POST /api/products/:id/top
// @access Public

const getTopProducts = asyncHandler(async(req,res) =>{
    

    const products = await Product.find({}).sort({rating: -1}).limit(3)

    res.json(products)
   
})



// @des Fetch  products by category
// @route Get /api/products/category/:id
// @access Public

const getProductByCategory = asyncHandler(async(req,res) =>{
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1
    
    const count = await Product.countDocuments({category: req.params.id})
    const products = await Product.find({category: req.params.id}).limit(pageSize).skip(pageSize * (page -1))
    if (products){
        res.json({products,page, pages: Math.ceil(count / pageSize)})}
    else{
        res.status(404)
        throw new Error('Product not found')
    }

})


export{ getProducts, getProductById,deleteProduct,createProduct,updateProduct,createProductReview,getTopProducts,getProductByCategory}