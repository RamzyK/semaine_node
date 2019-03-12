  const express = require('express');
  const fs = require('fs');

  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');

  const url = 'mongodb://localhost:27017/chat-bot';
  const dbName = 'test';


  var port = process.env.PORT || 3000;
  var app = express();

  app.use(express.json());

  app.get("/hello", (req, res) => {
    res.send("Hello World");
})

  app.post("/chat", (req, res) => {
    const client = new MongoClient(url);
    const message = req.body.msg;

      if(message === "ville"){
        res.send("Nous sommes à Paris\n");
      } else if(message === "météo"){
        res.send("Il fait beau\n")
      } else if(message === "demain"){

          var responses = fs.readFileSync("response.json");
          var test = JSON.parse(responses);
          console.log("Reponse server: " + test.demain + "\n");

          if(test.demain == null ){
            res.send("Je ne connais pas demain\n");
          }else{
            res.send("demain: " + test.demain + "\n");
          }
      } else if(message === "demain = Jeudi"){
          let data = {
            demain : 'Mercredi'
          }

          let json_response = JSON.stringify(data);
          fs.writeFileSync("response.json", json_response);

          (async function(){
            try{
              await client.connect();
              console.log("Connected correctly to server");

              const db = client.db(dbName);

              // Insert a single document
              let r = await db.collection('messages').insertOne(data);
              const col = await db.collection('messages').find().toArray();
              console.log(col);
              res.send("Merci pour cette information !\n" + col)
            } catch(err){
              console.log(err.stack);
            }
          })();
      }
      client.close();
  })

  app.get("/messages/all", async (req, res) => {
    const client = new MongoClient(url);

    (async function() {
      try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Insert multiple documents
        const messages = await db.collection('messages').find().toArray();
        console.log("All messages: " + (JSON.stringify(messages)) + "\n");
        res.send(messages);
      } catch (err) {
        console.log(err.stack);
      }
    })();
    client.close();
  })

  app.delete("/messages/last", (req, res) => {
    const client = new MongoClient(url);

    (async function() {
      try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        var all_messages = await db.collection('messages').find().toArray();
        await db.collection('messages').deleteOne(all_messages[all_messages.length - 1]);
        all_messages = await db.collection('messages').find().toArray();
        console.log("All messages: " + (JSON.stringify(all_messages)) + "\n");
        res.send(all_messages);

      } catch (err) {
        console.log(err.stack);
      }
    })();
    client.close();
  })

  app.listen(port, () => {
    console.log("Server is up and listnening on port " + port);
})
