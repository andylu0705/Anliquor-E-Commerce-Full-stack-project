import express from 'express'

const router = express.Router();
//import Product collection
import { getProducts,getProductById,deleteProduct,updateProduct,createProduct,createProductReview,getTopProducts,getProductByCategory } from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'



router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)
router.route('/:id/reviews').post(protect,createProductReview)
router.get('/top/:top',getTopProducts)
router.get('/category/:id',getProductByCategory)
export default router