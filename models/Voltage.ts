import mongoose, { Schema, Model, Document } from "mongoose";

// Define the VoltageReading interface
interface VoltageReading {
  voltage: number;
  psi: number;
  timestamp: Date;
}

// Define the Day interface
interface Day {
  day: string;
  voltages: VoltageReading[];
}

// Define the main Voltage interface
interface Voltage extends Document {
  email: string;
  voltages: Day[];
}

// Define the VoltageReading schema
const voltageReadingSchema = new Schema<VoltageReading>({
  voltage: {
    type: Number,
    required: true,
  },
  psi: {
    type: Number,
    required: true,
    default: 0,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Define the Day schema
const daySchema = new Schema<Day>({
  day: {
    type: String,
    required: true,
  },
  voltages: {
    type: [voltageReadingSchema],
    required: true,
  },
});

// Define the main Voltage schema
const voltageSchema = new Schema<Voltage>({
  email: {
    type: String,
    required: true,
  },
  voltages: {
    type: [daySchema],
    required: true,
  },
});

// Export the VoltageModel
export const VoltageModel: Model<Voltage> =
  mongoose.models.voltages ||
  mongoose.model<Voltage>("voltages", voltageSchema);
