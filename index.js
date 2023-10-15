require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/public/home/index.html")
})

app.get("/register", (req, res) =>{
    res.sendFile(__dirname + "/public/accounts/register.html")
})

app.get("/login", (req, res) =>{
    res.sendFile(__dirname + "/public/accounts/login.html")
})


app.listen(PORT, ()=>{
 console.log("App is Listening on port " + PORT)
 console.log("http://localhost:" + PORT);
})