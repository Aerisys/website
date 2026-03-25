import { Router } from 'express'
import Product from '../models/Product.js'
import Category from '../models/Category.js'

const router = Router()

router.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query

    const filter = category ? { category } : {}

    const [products, categories] = await Promise.all([
      Product.find(filter),
      Category.find()
    ])

    res.json({ products, categories })
  } catch (error) {
    console.error('Get products error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

router.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })

    if (!product) {
      return res.status(404).json({ error: 'Produit introuvable' })
    }

    const categories = await Category.find()

    res.json({ product, categories })
  } catch (error) {
    console.error('Get product error:', error.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
