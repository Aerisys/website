import { Router } from 'express'
import { products, categories } from '../data/products.js'

const router = Router()

router.get('/api/products', (req, res) => {
  const { category } = req.query

  let filtered = products
  if (category) {
    filtered = products.filter(p => p.category === category)
  }

  res.json({ products: filtered, categories })
})

router.get('/api/products/:slug', (req, res) => {
  const product = products.find(p => p.slug === req.params.slug)

  if (!product) {
    return res.status(404).json({ error: 'Produit introuvable' })
  }

  res.json({ product, categories })
})

export default router
