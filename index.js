const express = require ('express');
const app = express (); // Framework HTTP

const MongoClient = require ('mongodb').MongoClient; // get Client of Mongo
const url = 'mongodb://localhost:27017'; // uri of connected storage
const dbName = 'inventaire'; // database name

const bodyParser = require ('body-parser');

app.use (bodyParser.json ()); // support json encoded bodies
app.use (bodyParser.urlencoded ({extended: true})); // support encoded bodies

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

app.post ('/new', function (req, res) {
  client.connect (function (err) {
    const db = client.db (dbName);
    const collection = db.collection ('people');

    // get POST params
    const name = req.body.name;
    const age = req.body.age;

    collection.insertMany ([{name: name, age: age}], function (err, r) {
      collection.find ().toArray (function (err, docs) {
        res.send (docs);
      });
    });
  });
});

app.delete ('/remove/:id', function (req, res) {
  const id = req.query.id;

  client.connect (function (err) {
    const db = client.db (dbName);
    const collection = db.collection ('people');

    collection.remove ({id: id}, function (err, r) {
      collection.find ().toArray (function (err, docs) {
        res.send (docs);
      });
    });
  });
});

app.listen (3000, function () {
  console.log ('Example app listening on port 3000!');
});
