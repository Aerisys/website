import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  _id: String,
  label: String
}, {
  toJSON: { virtuals: true }
})

export default mongoose.model('Category', categorySchema)
