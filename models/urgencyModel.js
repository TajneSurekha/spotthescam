const mongoose = require("mongoose");

const urgencySchema = new mongoose.Schema({
  urgentKeywords: {
    type: Array,
  },
});

const Urgency = mongoose.model("urgency", urgencySchema);

module.exports = Urgency;
