const https = require("https");

const pingInterval = 10 * 60 * 1000; // 10 minutes
const urlToPing = "https://polls-ts0t.onrender.com/";

function keepAlive() {
  https
    .get(urlToPing, (res) => {
      console.log(`Pinged ${urlToPing} - Status Code: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.error(`Error pinging ${urlToPing}: ${err.message}`);
    });
}

setInterval(keepAlive, pingInterval);
keepAlive(); // Initial call to start immediately
