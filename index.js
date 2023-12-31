// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {
  let time = req.params.date
  if (/^\d+$/.test(time)) {
    time = parseInt(time, 10); // Convert the string to a number
  }
  const date = new Date(time);
  if (isNaN(date.getTime())) {
    // Invalid date
    res.json({ error: 'Invalid date' });
  } else {
    // Valid date
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});


// listen for requests :)
app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});
