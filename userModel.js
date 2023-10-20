const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const ProblemSchema = new mongoose.Schema({
  question: String,
  option1: String,
  option2: String,
});

UserSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", UserSchema);

const Problem = new mongoose.model("Problem", ProblemSchema);

module.exports = {
  user: User,
  problem: Problem,
};
