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
  const { name, price, brand, category } = req.body
  const product = new Product({
    user: req.user._id,
    name,
    price,
    brand,
    category,
    description: 'bla bla',
    image: 'image',
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
    product.name = res.body.name
    product.category = res.body.category
    product.price = res.body.price
    product.brand = res.body.brand

    const updatedProduct = await product.save()
    res.status(200).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }

  await product.save()
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
}
