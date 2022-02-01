import express from 'express'
const Router = express.Router()
import slugify from 'slugify'

import {
  createProduct,
  getProducts,
  getSingleProduct,
  getSingleProductByID,
  updateProduct,
  updateProductByID,
  deleteProductById,
} from '../models/product/Product.model.js'
import { newProductFormValidation } from '../middlewares/productValidation.middleware.js'

// get all or single products
Router.get('/:slug?', async (req, res) => {
  try {
    const { slug } = req.params
    let result = null
    if (slug) {
      result = await getSingleProduct({ slug })
    } else {
      result = await getProducts()
    }

    res.json({
      status: 'success',
      message: 'Product as requested',
      result,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
})

//create new product
Router.post('/', newProductFormValidation, async (req, res) => {
  try {
    //create slug
    const { title } = req.body
    const slug = slugify(title, { lower: true })

    //2. store product in db
    const result = await createProduct({ ...req.body, slug })
    console.log(result)
    if (result?._id) {
      return res.json({
        status: 'success',
        message: 'New product has been create',
      })
    }

    res.json({
      status: 'error',
      message: 'Unable to create product, please try again later',
    })
  } catch (error) {
    let msg = error.message
    if (error.message.includes('E11000 duplicate key error collection')) {
      msg = 'The product name/slug can not be same, change the product title'
    }

    res.json({
      status: 'error',
      message: msg,
    })
  }
})

//update product
Router.put('/', async (req, res) => {
  try {
    console.log(req.body)

    //1. server side validation

    //2. update product in db
    const { _id, ...product } = req.body
    const result = await updateProductByID(_id, product)

    if (result?._id) {
      return res.json({
        status: 'success',
        message: 'The product has been updated',
      })
    }

    res.json({
      status: 'success',
      message: ' still not done ',
    })
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    })
  }
})

//delete product
Router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params

    const product = await deleteProductById(_id)
    if (product?._id) {
      return res.json({
        status: 'success',
        message: 'The product has been deleted',
      })
    }

    res.json({
      status: 'error',
      message: 'Unable to delete the product, Please try again later',
    })
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    })
  }
})

export default Router
