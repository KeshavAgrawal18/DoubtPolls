require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./userModel");
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/passwordDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // We are connected
  console.log("Connected to MongoDB...");
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home/index.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/accounts/register.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/accounts/login.html");
});

app.get("/registered", (req, res) => {
  res.sendFile(__dirname + "/public/registered.html");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  User.register(
    { username: req.body.username, email: req.body.email },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log(user);
          res.redirect("/registered");
        });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("App is Listening on port " + PORT);
  console.log("http://localhost:" + PORT);
});
