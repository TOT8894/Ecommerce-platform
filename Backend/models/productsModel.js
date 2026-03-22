import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 10000000,
      default: 0,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 500
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      trim: true
    }
  },
  {
    timestamps: true
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;