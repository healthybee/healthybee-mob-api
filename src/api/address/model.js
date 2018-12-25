import mongoose, { Schema } from 'mongoose'

const addressSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  addressType: {
    type: String,
    trim: true,
    required: true
  },
  line1: {
    type: String,
    trim: true,
    required: true
  },
  line2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  state: {
    type: String,
    trim: true,
    required: true
  },
  zipcode: {
    type: Number,
    trim: true,
    required: true
  },
  landmark: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

addressSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.id,
      addressType: this.addressType,
      line1: this.line1,
      line2: this.line2,
      city: this.city,
      state: this.state,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Address', addressSchema)

export const schema = model.schema
export default model
