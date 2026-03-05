import { Router } from 'express'
import Product from '../../models/Product.js'
import requireAdmin from '../../middleware/requireAdmin.js'

const router = Router()
router.use(requireAdmin)

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

router.get('/api/admin/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json({ products })
  } catch (error) {
    console.error('Admin get products error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.post('/api/admin/products', async (req, res) => {
  try {
    const data = { ...req.body }
    if (!data.slug) {
      data.slug = slugify(data.name || '')
    }
    const product = await Product.create(data)
    res.status(201).json(product)
  } catch (error) {
    console.error('Admin create product error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.put('/api/admin/products/:id', async (req, res) => {
  try {
    const data = { ...req.body }
    delete data.id
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true })
    res.json(product)
  } catch (error) {
    console.error('Admin update product error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.delete('/api/admin/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (error) {
    console.error('Admin delete product error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
