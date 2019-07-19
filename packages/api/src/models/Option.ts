import mongoose from "mongoose";

let schemaOptions = {
  versionKey: false
};

let optionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    time_in_force: { type: String, required: true },
    side: { type: String, required: true },
    stop_price: { type: String, required: true },
    limit_price: { type: String, required: true },
    symbol: { type: String, required: true, default: null }
  },
  schemaOptions
);

export default mongoose.model("Option", optionSchema);
