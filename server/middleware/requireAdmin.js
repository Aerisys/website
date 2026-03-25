import jwt from 'jsonwebtoken'

export default function requireAdmin(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' })
  }

  try {
    const token = header.split('Bearer ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.adminId = decoded.id
    next()
  } catch {
    return res.status(401).json({ error: 'Token invalide' })
  }
}
