import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const menuSchema = new Schema(
  {
    add_on: {
      type: String,
      trim: true
    },
    add_on_price: {
      type: Number,
      trim: true
    },
    category: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    food_type: {
      type: String,
      trim: true
    },
    image_url: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    nutrition: {
      type: String,
      trim: true
    },
    old_price: {
      type: Number,
      trim: true
    },
    price: {
      type: Number,
      trim: true
    }
  },
  { timestamps: true }
)

menuSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      add_on: this.add_on,
      add_on_price: this.add_on_price,
      category: this.category,
      description: this.description,
      food_type: this.food_type,
      image_url: this.image_url,
      name: this.name,
      nutrition: this.nutrition,
      old_price: this.old_price,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
        ...view
        // add properties for a full view
      }
      : view
  }
}

menuSchema.plugin(mongooseKeywords, { paths: ['category', 'name', 'description', 'add_on', 'food_type', 'price'] })

const model = mongoose.model('Menu', menuSchema)

export const schema = model.schema
export default model
