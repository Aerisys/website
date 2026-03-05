import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  slug: String,
  name: String,
  shortDescription: String,
  description: String,
  price: Number,
  images: [String],
  category: String,
  tags: [String],
  specs: [{ label: String, value: String }],
  inStock: Boolean
}, {
  toJSON: { virtuals: true }
})

export default mongoose.model('Product', productSchema)
