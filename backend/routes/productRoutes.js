import express from 'express'
import {
  addProduct,
  createProductReview,
  deleteProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/protectedMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/').post(protect, admin, addProduct)
router
  .route('/:id')
  .get(getProductsById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router
