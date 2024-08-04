const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  list: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
});
const todo = mongoose.model("todo", todoSchema);
module.exports = todo;
