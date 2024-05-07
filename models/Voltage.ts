const mongoose = require("mongoose");

const VoltageSchema = new mongoose.Schema({
  day: { type: String, required: true },
  voltages: [
    {
      voltage: { type: Number, required: true }, // Adjusted field definition
      timestamp: { type: Date, default: Date.now }, // Keep or remove default based on your requirement
    },
  ],
});
export const VoltageModel =
  mongoose.models.voltages || mongoose.model("voltages", VoltageSchema);
