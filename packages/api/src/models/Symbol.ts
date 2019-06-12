import mongoose from "mongoose";

let schemaOptions = {
  versionKey: false
};

let symbolSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    purchase_date: { type: String, required: true },
    purchase_price: { type: Number, required: true }
  },
  schemaOptions
);

export default mongoose.model("Symbol", symbolSchema);
