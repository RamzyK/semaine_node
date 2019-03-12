const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

(async function() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    let r = await db.collection('inserts').insertOne({a:1});
    assert.equal(1, r.insertedCount);

    // Insert multiple documents
    r = await db.collection('inserts').insertMany([{a:2}, {a:3}]);
    console.log(r);
  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
})();
