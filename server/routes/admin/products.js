import { Router } from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import Product from '../../models/Product.js'
import requireAdmin from '../../middleware/requireAdmin.js'

const router = Router()
router.use(requireAdmin)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.resolve(__dirname, '..', '..', '..', 'uploads')

function deleteUploadedImage(url) {
  if (typeof url !== 'string' || !url.startsWith('/uploads/')) return
  const filename = path.basename(url)
  const filePath = path.join(uploadsDir, filename)
  // Guard against path traversal: resolved path must stay inside uploadsDir
  if (path.dirname(filePath) !== uploadsDir) return
  fs.promises.unlink(filePath).catch((err) => {
    if (err.code !== 'ENOENT') {
      console.error('Failed to delete image file:', filePath, err.message)
    }
  })
}

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
    const previous = await Product.findById(req.params.id)
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true })
    if (previous && Array.isArray(previous.images)) {
      const nextImages = new Set(Array.isArray(product?.images) ? product.images : [])
      for (const url of previous.images) {
        if (!nextImages.has(url)) deleteUploadedImage(url)
      }
    }
    res.json(product)
  } catch (error) {
    console.error('Admin update product error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (product && Array.isArray(product.images)) {
      for (const url of product.images) deleteUploadedImage(url)
    }
    res.json({ success: true })
  } catch (error) {
    console.error('Admin delete product error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
