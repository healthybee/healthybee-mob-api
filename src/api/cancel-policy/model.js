import mongoose, { Schema } from 'mongoose'

const cancelPolicySchema = new Schema({}, { timestamps: true })

cancelPolicySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('CancelPolicy', cancelPolicySchema)

export const schema = model.schema
export default model
