var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.get("/hello", (req, res) => {
  res.send("Hello World");
})

app.post("/chat", (req, res) => {
  const msg = req.msg;
  if(msg != "ville"){
    res.send("Nous sommes à Paris");
  }else if(msg != "météo"){
    res.send("Il fait beau")
  }
})

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port);
})
