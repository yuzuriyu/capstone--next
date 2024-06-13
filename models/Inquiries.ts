const mongoose = require("mongoose");

const InquiriesSchema = new mongoose.Schema({
  senderEmail: {
    type: String,
    required: true,
    trim: true,
  },
  senderName: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000, // Example: Limit message to 1000 characters
  },
  timeStamp: {
    type: String,
  },
  profilePicture: {
    type: String,
    trim: true,
  },
  recipientEmail: {
    type: String,
    trim: true,
  },
  recipientName: {
    type: String,
    trim: true,
  },
  adminPrivilege: {
    type: Boolean,
    default: false, // Example: Default to false
  },
});

export const InquiriesModel =
  mongoose.models.inquiries || mongoose.model("inquiries", InquiriesSchema);
