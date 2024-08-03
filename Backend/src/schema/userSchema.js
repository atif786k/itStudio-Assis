const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  phoneNumber: {
    type: mongoose.Schema.Types.Number,
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  hobbies: {
    type: mongoose.Schema.Types.Array,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
