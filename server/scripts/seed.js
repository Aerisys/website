import { connectDB } from '../lib/mongoose.js'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import Admin from '../models/Admin.js'
import Order from '../models/Order.js'
import { products, categories } from '../data/products.js'

async function seed() {
  await connectDB()

  console.log('Clearing collections...')
  await Promise.all([
    Category.deleteMany(),
    Product.deleteMany(),
    Order.deleteMany(),
    Admin.deleteMany()
  ])

  console.log('Seeding categories...')
  for (const cat of categories) {
    await Category.create({ _id: cat.id, label: cat.label })
    console.log(`  + category: ${cat.id} (${cat.label})`)
  }

  console.log('Seeding products...')
  for (const product of products) {
    const { id, ...data } = product
    await Product.create(data)
    console.log(`  + product: ${product.name}`)
  }

  console.log('Creating admin...')
  const email = process.env.ADMIN_EMAIL || 'admin@aerisys.fr'
  const password = process.env.ADMIN_PASSWORD || 'admin123'
  await Admin.create({ email, password })
  console.log(`  + admin: ${email}`)

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed error:', err)
  process.exit(1)
})
