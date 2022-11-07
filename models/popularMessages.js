const mongoose = require("mongoose");

const popularMessagesSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  lastUpdated: {
    type: Date,
  },
});

const PopularScam = mongoose.model("popularScam", popularMessagesSchema);

module.exports = PopularScam;
