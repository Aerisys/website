import { Router } from 'express'
import Order from '../../models/Order.js'
import requireAdmin from '../../middleware/requireAdmin.js'

const router = Router()
router.use(requireAdmin)

router.get('/api/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json({ orders })
  } catch (error) {
    console.error('Admin get orders error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.delete('/api/admin/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    console.error('Admin delete order error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
