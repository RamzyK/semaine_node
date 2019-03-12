  const express = require('express');
  const fs = require('fs');
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  const url = 'mongodb://heroku_7hd9f7ms:22c0anq0gntdk0snd6kdm10p4t@ds235181.mlab.com:35181/heroku_7hd9f7ms'
  const dbName = 'heroku_7hd9f7ms';

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
          let user_message = {
            from: "user",
            msg: message
          }
          var responses = fs.readFileSync("response.json");
          var test = JSON.parse(responses);
          console.log("Reponse server: " + test.demain + "\n");
          if(test.msg == null){
            res.send("Je ne connais pas demain\n");
          }else{
            res.send("demain: " + test.msg + "\n");
          }
          (async function(){
            try{
              await client.connect();
              console.log("Connected correctly to server");

              const db = client.db(dbName);

              // Insert a single document
              let r = await db.collection('messages').insertOne(user_message);
              const col = await db.collection('messages').find().toArray();
              console.log(col);
            } catch(err){
              console.log(err.stack);
            }
          })();

      } else if(message === "demain = Jeudi"){
          let bot_response = {
            from: "bot",
            msg : "Demain: Jeudi"
          }
          let json_response = JSON.stringify(bot_response);
          fs.writeFileSync("response.json", json_response);
          (async function(){
            try{
              await client.connect();
              console.log("Connected correctly to server");
              const db = client.db(dbName);
              // Insert a single document
              let r = await db.collection('messages').insertOne(bot_response);
              const col = await db.collection('messages').find().toArray();
              res.send("Merci pour cette information !\n" + col)
              console.log(col);
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
        res.send((JSON.stringify(messages)) + "\n");
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
        res.send(all_messages + "\n");

      } catch (err) {
        console.log(err.stack);
      }
    })();
    client.close();
  })

  app.listen(port, () => {
    console.log("Server is up and listnening on port " + port);
})
