import { Schema, model } from "mongoose";

const productSchema = new Schema({
  id_prod: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
  products: [productSchema],
});

const Ticket = model("Ticket", ticketSchema);

export default Ticket;
