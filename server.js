const express = require('express');
const fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello World");
})

app.post("/chat", (req, res) => {
  const message = req.body.msg;
  if(message === "ville"){
    res.send("Nous sommes à Paris\n");
  } else if(message === "météo"){
    res.send("Il fait beau\n")
  } else if(message === "demain"){
    var responses = fs.readFileSync("response.json");
    var test = JSON.parse(responses);
    console.log("Reponse server: " + test.demain);
    if(test.demain == null ){
      res.send("Je ne connais pas demain\n");
    }else{
      res.send("demain: " + test.demain + "\n");
    }
  } else if(message === "demain = Mercredi"){
      let data = {
        demain : 'Mercredi'
      }
      let json_response = JSON.stringify(data);
      fs.writeFileSync("response.json", json_response);
      res.send("Merci pour cette information !\n")
  }
})

app.listen(port, () => {
  console.log("Server is up and listnening on port " + port);
})
