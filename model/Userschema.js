const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  Email: {
    type: String,
    require: true,
  },
  Role: {
    type: Boolean,
    default: false,
  },
  Password: {
    type: String,
    require: true,
  },
});
const User = mongoose.model("users", UserSchema);
module.exports = User;
