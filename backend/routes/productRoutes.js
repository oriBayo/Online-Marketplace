import express from 'express'
import {
  addProduct,
  createProductReviewe,
  deleteProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from '../controllers/productContriller.js'
import { admin, protect } from '../middleware/protectedMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/').post(protect, admin, addProduct)
router
  .route('/:id')
  .get(getProductsById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReviewe)

export default router
