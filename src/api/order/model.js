import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    trim: true,
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
    status: String
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
      userId: this.userId,
      orderName: this.orderName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
