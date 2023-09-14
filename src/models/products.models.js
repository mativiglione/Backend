import { Schema, model } from "mongoose";
import { paginate } from "mongoose-paginate-v2";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    index: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: [],
});

productSchema.plugin(paginate);

const productModel = model("products", productSchema);
export default productModel;
