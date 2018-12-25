import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  userId: {
    type: Object
  },
  orderName: {
    type: String,
    trim: true
  },
  status: {
    type: Boolean
  },
  startDate: {
    type: Date,
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
