const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const ProblemSchema = new mongoose.Schema({
  id: String,
  time: String,
  question: String,
  option1: {
    name: String,
    voteCount: Number,
  },
  option2: {
    name: String,
    voteCount: Number,
  },
  usersVoted: [String],
});

UserSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", UserSchema);

const Problem = new mongoose.model("Problem", ProblemSchema);

module.exports = {
  user: User,
  problem: Problem,
};
