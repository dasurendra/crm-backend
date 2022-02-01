import express from 'express'
const Router = express.Router()

import {
  createUser,
  activeUser,
  getUserByEmail,
  updateUserById,
  updateUserByFilter,
} from '../models/user/User.model.js'
import {
  createUniqueReset,
  findUniqueReset,
  deleteUniqueReset,
} from '../models/reset-pin/ResetPin.model.js'
import {
  newUserFormValidation,
  emailVerificationValidation,
  adminLoginValidation,
  updateUserFormValidation,
  updatePasswordFormValidation,
  ResetPasswordFormValidation,
} from '../middlewares/validation.middleware.js'
import { hashPassword, verifyPassword } from '../hlpers/bcrypt.helper.js'
import { getRandomOTP } from '../hlpers/opt.helper.js'
import {
  emailProcessor,
  emailVerificationWelcome,
  userProfileUpdateNotification,
} from '../hlpers/mail.helper.js'

import { getJWTs } from '../hlpers/jwt.helper.js'
import { isAdminAuth } from '../middlewares/auth.middleware.js'

Router.get('/', isAdminAuth, (req, res) => {
  try {
    //get user by .. from user Model
    const user = req.user
    user.refreshJWT = undefined
    user.password = undefined

    res.json({
      status: 'success',
      message: 'User Profile',
      user,
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

Router.post('/', newUserFormValidation, async (req, res) => {
  try {
    //hash password

    const hashPass = hashPassword(req.body.password)

    req.body.password = hashPass
    const result = await createUser(req.body)

    if (result?._id) {
      //crate unique code
      const optLength = 8
      const otp = getRandomOTP(optLength)
      const uniqueCombo = {
        otp,
        email: result.email,
      }

      const data = await createUniqueReset(uniqueCombo)
      if (data?._id) {
        emailProcessor(uniqueCombo)
      }

      return res.json({
        status: 'success',
        message:
          'User has been created. We have sent and email verification to your email. Please check the email and follow the instruction to verify your email.',
        result,
      })
    }

    res.json({
      status: 'error',
      message: 'Unable to create an user, please try again later',
    })
  } catch (error) {
    console.log(error.message)
    let msg = 'Error, unable to create new user, Please contact administration.'

    if (error.message.includes('E11000 duplicate key error collection')) {
      msg = 'The user already exist associated to your email.'
    }

    res.json({
      status: 'error',
      message: msg,
    })
  }
})

Router.post(
  '/email-verification',
  emailVerificationValidation,
  async (req, res) => {
    try {
      const result = await findUniqueReset(req.body)
      if (result?._id) {
        const isUserActive = await activeUser(req.body.email)

        if (isUserActive?._id) {
          emailVerificationWelcome(req.body.email)
          // delete the reset pin data
          deleteUniqueReset(req.body)
          return res.json({
            status: 'success',
            message: 'Your email has been verified, you may sing in now.',
          })
        }
      }

      res.json({
        status: 'error',
        message: 'Invalid or expired link',
      })
    } catch (error) {
      console.log(error)
      res.json({
        status: 'error',
        message:
          'Error, Unable to process your request at the moment, Please try again later.',
      })
    }
  }
)

//login
Router.post('/login', adminLoginValidation, async (req, res) => {
  try {
    const { email, password } = req.body
    //1 find user by email,
    const user = await getUserByEmail(email)
    if (user?._id) {
      //2 bcrypt and very password
      const isPassMatched = verifyPassword(password, user.password)

      if (isPassMatched) {
        user.password = undefined

        const tokens = await getJWTs({ _id: user._id, email })
        return res.json({
          status: 'success',
          message: 'Login success full',
          user,
          tokens,
        })
      }
    }

    res.json({
      status: 'error',
      message: 'Invalid login details',
    })
  } catch (error) {
    console.log(error)
    res.json({
      status: 'error',
      message: 'Error, unable to process yor request, please try again later',
    })
  }
})

//update profile
Router.put('/', isAdminAuth, updateUserFormValidation, async (req, res) => {
  try {
    const { _id, email } = req.user

    const result = await updateUserById(_id, req.body)

    if (result?._id) {
      userProfileUpdateNotification(email)

      return res.json({
        status: 'success',
        message: 'Your profile has been updated',
        result,
      })
    }

    res.json({
      status: 'error',
      message: 'Unable to process your request, please try again later',
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      status: 'error',
      message:
        'Error, unable to process your request, Please contact administration.',
    })
  }
})

//update password
Router.patch(
  '/',
  isAdminAuth,
  updatePasswordFormValidation,
  async (req, res) => {
    try {
      const { _id, email } = req.user
      const { password, currentPassword } = req.body
      // check current password against the one in database
      const isMatched = verifyPassword(currentPassword, req.user.password)

      if (isMatched) {
        // encrypt the new password
        const hashedPass = hashPassword(password)

        // update user table with new password
        const result = hashedPass
          ? await updateUserById(_id, { password: hashedPass })
          : null
        if (result?._id) {
          //send the email notification
          userProfileUpdateNotification(email)
          return res.json({
            status: 'success',
            message: 'Your password has been updated',
          })
        }
      }

      res.json({
        status: 'error',
        message: 'Unable to process your request, please try again later',
      })
    } catch (error) {
      console.log(error.message)
      res.json({
        status: 'error',
        message:
          'Error, unable to process your request, Please contact administration.',
      })
    }
  }
)

// Reset password
Router.patch(
  '/reset-password',
  ResetPasswordFormValidation,
  async (req, res) => {
    try {
      const { email, otp, password } = req.body

      // check if the email, opt combo is valid,

      const otpInfo = await findUniqueReset({
        otp,
        email,
      })

      if (otpInfo?._id) {
        // encrypt the password
        const hashedPass = hashPassword(password)
        const filter = { email }
        const obj = { password: hashedPass }

        // update password in user table
        const user = hashedPass ? await updateUserByFilter(filter, obj) : null

        if (user?._id) {
          // send email notification of change
          userProfileUpdateNotification(email)
          // remove the email and otp
          deleteUniqueReset({ otp, email })

          return res.json({
            status: 'success',
            message: 'Your password has been update, you may sign in now.',
          })
        }
      }

      res.json({
        status: 'error',
        message: 'Invalid request, please try again later',
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      })
    }
  }
)
export default Router
