require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const modul = require("./userModel");
const User = modul.user;
const Problem = modul.problem;
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
app.set("view engine", "ejs");

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
  Problem.find()
    .then((problems) => {
      console.log(problems);
      res.render("index", {
        problems: problems,
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // res.sendFile(__dirname + "/public/home/index.html");
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

app.get("/create", (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + "/public/create.html");
  } else {
    res.redirect("/login");
  }
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

app.post("/login", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log(user);
        res.redirect("/registered");
      });
    }
  });
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const problem = new Problem({
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
  });
  problem.save();
  // res.write("Poll created");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("App is Listening on port " + PORT);
  console.log("http://localhost:" + PORT);
});
