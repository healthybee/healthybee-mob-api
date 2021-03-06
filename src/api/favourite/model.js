import mongoose, { Schema } from 'mongoose'

const favouriteSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: Schema.ObjectId
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

favouriteSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      productId: this.productId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Favourite', favouriteSchema)

export const schema = model.schema
export default model
