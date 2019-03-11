var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello World");
})

app.post("/chat", (req, res) => {
  if(req.body.msg === "ville"){
    res.send("Nous sommes à Paris\n");
  }else if(req.body.msg === "météo"){
    res.send("Il fait beau\n")
  }
})

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port);
})
