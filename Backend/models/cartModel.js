import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    isOrdered: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);
const Cart = mongoose.model("cart", cartSchema);
export default Cart;