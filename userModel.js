const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

UserSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", UserSchema);

module.exports = User;
