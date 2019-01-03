import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

cartSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      productId: this.productId,
      quantity: this.quantity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Cart', cartSchema)

export const schema = model.schema
export default model
