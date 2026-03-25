import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../../models/Admin.js'

const router = Router()

router.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Identifiants invalides' })
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    res.json({ token })
  } catch (error) {
    console.error('Login error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
