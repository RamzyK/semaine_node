var express = require('express');

var app = express();

app.get("/hello", (req, res) => {
  console.log("Responding to root...");
  res.send("Hello World!");
})

app.listen(8080, () => {
  console.log("Server is up and listnening on port 8080...");
})
