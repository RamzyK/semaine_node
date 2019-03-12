const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'dates';

(async function() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    let r = await db.collection('inserts').insertOne({dates: new Date()});

    const col = await db.collection('inserts').find().toArray();
    // Insert multiple documents
    console.log(col);
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
})();
