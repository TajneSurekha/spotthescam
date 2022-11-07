const mongoose = require("mongoose");

const scamMessagesSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  count: {
    type: Number,
  },
  lastUpdated: {
    type: Date,
  },
});

const ScamMessage = mongoose.model("scammessage", scamMessagesSchema);

module.exports = ScamMessage;
