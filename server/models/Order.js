import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  stripePaymentIntentId: String,
  amount: Number,
  currency: String,
  customerName: String,
  customerEmail: String,
  cartSummary: String,
  status: String
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

export default mongoose.model('Order', orderSchema)
