import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  orderName: {
    type: String,
    trim: true
  },
  products: [],
  isActive: {
    type: Boolean,
    trim: true
  },
  startDate: {
    type: Date,
    trim: true
  },
  deliverySlots: {
    type: String,
    trim: true
  },
  total: {
    type: Number,
    trim: true
  },
  payment: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

orderSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(),
      orderName: this.orderName,
      products: this.products,
      isActive: this.isActive,
      startDate: this.startDate,
      deliverySlots: this.deliverySlots,
      total: this.total,
      payment: this.payment,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view,
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
