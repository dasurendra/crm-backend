import Joi from 'joi'

const str = Joi.string().max(30)
const shortStr = Joi.string().alphanum().max(30).required()
const email = Joi.string().email({ minDomainSegments: 2 })
const password = Joi.string().min(6).max(50).required()
const otp = Joi.string().min(6).max(6).required()

export const newUserFormValidation = (req, res, next) => {
  const schema = Joi.object({
    fname: shortStr,
    lname: Joi.string().alphanum().max(30).required(),
    dob: Joi.date().allow('').allow(null),
    email: email,
    password,
    phone: Joi.string().max(15).allow(''),
    address: Joi.string().max(50).allow(''),
    gender: Joi.string().max(6).allow(''),
  })

  const result = schema.validate(req.body) //{ value: {}, error: "some message" }

  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }

  next()
}

export const updateUserFormValidation = (req, res, next) => {
  const schema = Joi.object({
    fname: shortStr,
    lname: Joi.string().alphanum().max(30).required(),
    dob: Joi.date().allow('').allow(null),
    phone: Joi.string().max(15).allow(''),
    address: Joi.string().max(50).allow(''),
    gender: Joi.string().max(6).allow(''),
  })

  const result = schema.validate(req.body) //{ value: {}, error: "some message" }

  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }

  next()
}

export const updatePasswordFormValidation = (req, res, next) => {
  const schema = Joi.object({
    password,
    currentPassword: password,
  })

  const result = schema.validate(req.body) //{ value: {}, error: "some message" }

  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }

  next()
}
export const ResetPasswordFormValidation = (req, res, next) => {
  const schema = Joi.object({
    otp,
    email,
    password,
  })

  const result = schema.validate(req.body) //{ value: {}, error: "some message" }

  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }

  next()
}

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    otp: shortStr,
    email: email.required(),
  })

  const result = schema.validate(req.body) //{ value: {}, error: "some message" }

  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }

  next()
}

export const newCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    name: str.required(),
    parentCat: str.allow('').allow(null),
  })

  const result = schema.validate(req.body) //{ value: {}, error: "some message" }

  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }

  next()
}

export const updateCategoryValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: shortStr,
    name: str.required(),
    parentCat: str.allow('').allow(null),
  })

  const result = schema.validate(req.body) //{ value: {}, error: "some message" }

  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }

  next()
}

export const adminLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: email,
    password: Joi.string().min(6).max(50).required(),
  })

  const result = schema.validate(req.body) //{ value: {}, error: "some message" }

  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }

  next()
}
