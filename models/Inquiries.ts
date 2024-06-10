const mongoose = require("mongoose");

const InquiriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

export const InquiriesModel =
  mongoose.models.inquiries || mongoose.model("inquiries", InquiriesSchema);
