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
const modu = require("./function");
const ranNumGenerator = modu.rng;
const time = modu.time;

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
  console.log("Connected to MongoDB...");
});

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  Problem.find()
    .then((problems) => {
      res.render("index", {
        user: req.user,
        problems: problems,
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/register", (req, res) => {
  res.render("accounts", {
    entryPoint: "register"
  });
});

app.get("/login", (req, res) => {
  res.render("accounts", {
    entryPoint: "login"
  });
});

app.get("/registered", (req, res) => {
  // res.sendFile(__dirname + "/public/registered.html");
  res.redirect("/");
});

app.get("/create", (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + "/public/create.html");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

app.get("/problems/:id", (req, res) => {
  Problem.find({ id: req.params.id })
    .then((problems) => {
      res.render("problem", {
        user: req.user,
        problems: problems[0],
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/register", (req, res) => {
  // console.log(req.body);
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
          res.redirect("/");
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log(user);
        res.redirect("/");
      });
    }
  });
});

app.post("/create", (req, res) => {
  const problem = new Problem({
    id: ranNumGenerator,
    time: time,
    question: req.body.question,
    option1: {
      name: req.body.option1,
      voteCount: "0",
    },
    option2: {
      name: req.body.option2,
      voteCount: "0",
    },
  });
  console.log(problem);
  problem.save();
  // res.write("Poll created");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("App is Listening on port " + PORT);
  console.log("http://localhost:" + PORT);
});
