const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decoded = await jwt.verify(
        req.headers.authorization,
        process.env.PRIMARY_JWT_SECRET
      )
      if (decoded) {
        req.userId = decoded.id
        next()
      }
    } else {
      res.status(401).json({ success: false, msg: 'Unauthorized' })
    }
  } catch (err) {
    next(err)
  }
}
