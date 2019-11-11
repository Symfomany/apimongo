const express = require ('express');
const app = express ();
const MongoClient = require ('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'inventaire';

// Create a new MongoClient
const client = new MongoClient (url);

app.get ('/', function (req, res) {
  client.connect (function (err) {
    const db = client.db (dbName);
    const collection = db.collection ('people');
    collection.find ().toArray (function (err, docs) {
      res.send (docs);
    });
  });
});

app.listen (3000, function () {
  console.log ('Example app listening on port 3000!');
});
