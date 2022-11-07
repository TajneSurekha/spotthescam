const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  occurence: {
    type: Number,
    default: 0,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
