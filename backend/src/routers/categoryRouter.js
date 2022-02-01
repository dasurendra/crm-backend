import express from 'express'
const Router = express.Router()

import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from '../models/category/Category.model.js'
import {
  newCategoryValidation,
  updateCategoryValidation,
} from '../middlewares/validation.middleware.js'

import slugify from 'slugify'

// Router.all('/', (req, res, next) => {
//   console.log('from cat router')

//   next()
// })

// create category
Router.get('/', async (req, res) => {
  try {
    const categories = await getCategory()

    res.json({
      status: 'success',
      message: 'request success',
      categories,
    })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({
      status: 'error',
      message: 'Error, Unable to process your request please try again later',
    })
  }
})

// create category
Router.post('/', newCategoryValidation, async (req, res) => {
  try {
    console.log(req.body)
    const { name, parentCat } = req.body
    // slugify

    const slug = slugify(name, { lower: true })
    const newCat = {
      name,
      slug,
      parentCat: parentCat ? parentCat : null,
    }

    // insert into database
    const result = await createCategory(newCat)
    console.log(result)

    if (result?._id) {
      return res.json({
        status: 'success',
        message: 'Category has been created',
      })
    }

    res.json({
      status: 'error',
      message: 'Unable to create the category, please try again later',
    })
  } catch (error) {
    console.log(error.message)
    let msg = 'Error, Unable to process your request please try again later'

    if (error.message.includes('E11000 duplicate key error collection')) {
      msg = 'This Category already exists'
    }
    res.json({
      status: 'error',
      message: msg,
    })
  }
})

// delete category
Router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params
    // slugify

    if (_id) {
      const result = await deleteCategory(_id)

      if (result?._id) {
        return res.json({
          status: 'success',
          message: 'The category has been deleted',
        })
      }
    }

    res.json({
      status: 'error',
      message: 'Unable to delete the category, please try again later',
    })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({
      status: 'error',
      message: 'Error, Unable to process your request please try again later',
    })
  }
})

// update category
Router.patch('/', updateCategoryValidation, async (req, res) => {
  try {
    const { parentCat } = req.body
    req.body.parentCat = parentCat ? parentCat : null

    const result = await updateCategory(req.body)

    if (result?._id) {
      return res.json({
        status: 'success',
        message: 'The category has been updated',
      })
    }

    res.json({
      status: 'error',
      message: 'Unable to update the category, please try again later',
    })
  } catch (error) {
    console.log(error.message)

    res.status(500).json({
      status: 'error',
      message: 'Error, Unable to process your request please try again later',
    })
  }
})

export default Router
