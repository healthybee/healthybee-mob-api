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
    type: String
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
      user: this.user.id,
      orderName: this.orderName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view,
      // add properties for a full view
      isActive: this.isActive,
      startDate: this.startDate,
      deliverySlots: this.deliverySlots,
      total: this.total,
      payment: this.payment
    } : view
  }
}

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
