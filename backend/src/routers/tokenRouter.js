import express from 'express'
const Router = express.Router()

import { verifyRefreshJWT, createAccessJWT } from '../hlpers/jwt.helper.js'
import { passwordResetOTPNotification } from '../hlpers/mail.helper.js'
import { getUser, getUserByEmail } from '../models/user/User.model.js'
import { createPasswordResetOTP } from '../models/reset-pin/ResetPin.model.js'

Router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers

    if (authorization) {
      const decoded = verifyRefreshJWT(authorization)

      if (decoded?.email) {
        const user = await getUser({
          email: decoded.email,
          refreshJWT: authorization,
        })

        if (user?._id) {
          const accessJWT = await createAccessJWT({
            _id: user._id,
            email: user.email,
          })

          return res.json({
            state: 'success',
            message: 'New access token has been generated',
            accessJWT,
          })
        }
      }
    }
    res.status(401).json({
      state: 'error',
      message: 'Invalid token',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

Router.post('/request-otp', async (req, res) => {
  try {
    const { email } = req.body
    if (email) {
      // check if email in the db
      const user = await getUserByEmail(email)

      if (user?._id && user?.role === 'admin') {
        // create unique otp and store in database
        const result = await createPasswordResetOTP(email)

        // email that opt to the user email
        if (result?._id) {
          passwordResetOTPNotification({ email, otp: result.otp })
        }
      }
    }

    res.json({
      status: 'success',
      message:
        'If email exist in our system, we will send you an OTP, please check your email and use OTP to reset the password. The OTP will expires in 15 min.',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})
export default Router
