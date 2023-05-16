import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization')
    console.log(req.headers)
    if (!token) {
      return res.status(403).send('Access denied')
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
      console.log(token)
    }

    console.log('Verifying token:', token)
    const verifed = jwt.verify(token, process.env.JWT_STRING)
    console.log('Verified token:', verifed)
    req.user = verifed
    next()
  } catch (error) {
    console.log('Error verifying token:', error.message)
    res.status(500).json({ error: error.message })
  }
}
