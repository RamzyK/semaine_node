var express = require('express');
var port = process.env.PORT || 3000;

var app = express();

app.get("/hello", (req, res) => {
  res.send("Hello World");
})

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port);
})
