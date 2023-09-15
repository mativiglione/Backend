import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: {
    products: {
      type: [
        {
          id_prod: {
            type: Schema.Types.ObjectId, //id autogenerado
            ref: "products",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      default: function () {
        return [];
      },
    },
  },
});

cartSchema.pre("findOne", function () {
  this.populate("products.products.id_prod")
})

const cartModel = model("carts", cartSchema);
export default cartModel
