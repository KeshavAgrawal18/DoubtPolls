const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) =>{
    // res.send("<h1>Hello World</h1>");
    res.sendFile(__dirname + "/public/index.html")
})


app.listen(PORT, ()=>{
 console.log("App is Listening on port " + PORT)
 console.log("http://localhost:" + PORT);
})