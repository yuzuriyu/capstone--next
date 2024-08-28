const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema({
  badgeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
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
});

export const BadgeModel =
  mongoose.models.badges || mongoose.model("badges", BadgeSchema);
