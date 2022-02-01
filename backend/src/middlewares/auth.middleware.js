import { verifyAccessJWT } from '../hlpers/jwt.helper.js'
import { getSession } from '../models/session/Session.model.js'
import { getUserById } from '../models/user/User.model.js'

export const isAdminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (authorization) {
      const decoded = verifyAccessJWT(authorization)

      if (decoded === 'jwt expired') {
        return res.status(403).json({
          status: 'error',
          message: 'jwt expired',
        })
      }

      if (decoded?.email) {
        //is token in session db
        const session = await getSession({ token: authorization })
        if (session?._id) {
          session.userId
          const user = await getUserById(session.userId)
          if (user?.role === 'admin') {
            req.user = user
            return next()
          }
        }
      }
    }

    return res.status(401).json({
      status: 'error',
      message: 'Unauthenticated',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
}
