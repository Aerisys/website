import { Router } from 'express'
import Category from '../../models/Category.js'
import requireAdmin from '../../middleware/requireAdmin.js'

const router = Router()
router.use(requireAdmin)

router.get('/api/admin/categories', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json({ categories })
  } catch (error) {
    console.error('Admin get categories error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.post('/api/admin/categories', async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(201).json(category)
  } catch (error) {
    console.error('Admin create category error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.put('/api/admin/categories/:id', async (req, res) => {
  try {
    const data = { ...req.body }
    delete data.id
    const category = await Category.findByIdAndUpdate(req.params.id, data, { new: true })
    res.json(category)
  } catch (error) {
    console.error('Admin update category error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.delete('/api/admin/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    console.error('Admin delete category error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
