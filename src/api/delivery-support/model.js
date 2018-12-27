import mongoose, { Schema } from 'mongoose'

const deliverySupportSchema = new Schema({ 
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
}, { timestamps: true })

deliverySupportSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      question: this.question,
      answer: this.answer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('DeliverySupport', deliverySupportSchema)

export const schema = model.schema
export default model
