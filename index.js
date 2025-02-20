// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// endpoint for current date

app.get("/api/", (req, res) => {
  let date = new Date();
  res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
});

// timestamp converter for given date
app.get("/api/:date", (req, res) => {
  let date = req.params.date
  // console.log(typeof req.params.date);
  if (/^\d+$/.test(date)) {
    date = new Date(+date);
  } else {
    date = new Date(date);
  }
  if (date.toString() === "Invalid Date") {
    res.json({ error: date.toString() });
  } else {
    res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
  }
});






// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
