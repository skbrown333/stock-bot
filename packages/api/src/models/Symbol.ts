import mongoose from "mongoose";

let schemaOptions = {
  versionKey: false
};

let symbolSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true },
    side: { type: String, required: true }
  },
  schemaOptions
);

export default mongoose.model("Symbol", symbolSchema);
