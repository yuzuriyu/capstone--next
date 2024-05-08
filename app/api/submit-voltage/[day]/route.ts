import { NextApiRequest, NextApiResponse } from "next";
import { VoltageModel } from "@/models/Voltage";
import { connectToDb } from "@/lib/utils";

export const patchHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await connectToDb();

    const { day } = req.query;
    const { voltages } = req.body;
    const timestamp = new Date();

    if (!day) {
      return res
        .status(400)
        .json({ message: "Day parameter is missing in the request" });
    }

    if (!voltages || !Array.isArray(voltages) || voltages.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid voltage data provided in the request" });
    }

    const existingVoltage = await VoltageModel.findOne({ day });

    if (!existingVoltage) {
      return res
        .status(404)
        .json({ message: `Voltage data for ${day} not found` });
    }

    voltages.forEach((voltage: any) => {
      if (!voltage.timestamp) {
        voltage.timestamp = timestamp;
      }
    });

    existingVoltage.voltages.push(...voltages);
    await existingVoltage.save();

    console.log("Voltage data updated successfully");
    res.status(200).json({ message: "Voltage data updated successfully" });
  } catch (err) {
    console.error("Error updating voltage data:", err);
    res.status(500).json({ message: "Failed to update voltage data" });
  }
};
