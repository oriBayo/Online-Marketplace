import express from 'express'
import {
  addProduct,
  createProductReview,
  deleteProduct,
  getProducts,
  getProductsById,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/protectedMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, addProduct)
router.route('/top').get(getTopProducts)
router
  .route('/:id')
  .get(checkObjectId, getProductsById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct)
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview)

export default router
