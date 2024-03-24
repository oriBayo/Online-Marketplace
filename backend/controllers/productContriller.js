import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Fetch all products
// @route   Get /api/products
// @access  public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc    Fetch single products
// @route   Get /api/products/:id
// @access  public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Add new product
// @route   Get /api/products
// @access  private/admin
const addProduct = asyncHandler(async (req, res) => {
  const { name, price, brand, category, image, description, countInStock } =
    req.body
  const product = new Product({
    user: req.user._id,
    name,
    price,
    brand,
    category,
    description,
    image,
    countInStock,
  })
  const createdProduct = await product.save()
  res.status(200).json(createdProduct)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = req.body.name
    product.category = req.body.category
    product.price = req.body.price
    product.brand = req.body.brand
    product.description = req.body.description
    product.countInStock = req.body.countInStock
    product.image = req.body.image

    const updatedProduct = await product.save()
    res.status(200).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create product reviewe
// @route   POST /api/products/:id/reviews
// @access  private
const createProductReviewe = asyncHandler(async (req, res) => {
  const productId = req.params.id
  const userId = req.user._id
  const product = await Product.findById(productId)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user._id.toString() === userId.toString()
    )

    if (!alreadyReviewed) {
      const { rating, comment } = req.body
      product.reviews.push({
        rating: Number(rating),
        comment,
        name: req.user.name,
        user: req.user._id,
      })
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, reviewe) => acc + reviewe.rating, 0) /
        product.reviews.length

      await product.save()
      res.status(200).json({ message: 'Reviewe added' })
    } else {
      res.status(400)
      throw new Error('Product already reviewed')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await Product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Product deleted' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  addProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
  createProductReviewe,
}
