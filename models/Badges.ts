const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema({
  badgeId: {
    type: Number,
    required: true,
  },
  badgeName: {
    type: String,
    required: true,
  },
  badgeIcon: {
    type: String,
    required: true,
  },
  requirement: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
  },
});

export const BadgeModel =
  mongoose.models.badges || mongoose.model("badges", BadgeSchema);
