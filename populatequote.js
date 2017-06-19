#! /usr/bin/env node
//Specified database as argument - e.g.: node populatequote.js mongodb://localhost:27017/crud1 quote3

//Get arguments passed on command line
console.log(process.argv)
// [ 'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\AURELIE\\myprojects\\QuotesProj-toGH\\populatequote.js',
//   'mongodb://localhost:27017/crud1',
//   'quote3' ]


var userArgs = process.argv.slice(2);
console.log(userArgs)
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}



//Connecting to MongoDB
var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = userArgs[0];
var doc = userArgs[1];
console.log(doc);
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");

  var collection = db.collection(doc);
  // Insert some documents
  collection.insertMany([
    {name : "Maria",quote: "This is a beautiful day"}, 
    {name : "Joseph", quote : "Hola the world is big"}, 
    {name : "Carla",quote : "What a sunshine you are!"},
    {name : "Mona",quote : "Sun is upon us"},
    {name : "Marta",quote : "Sun is my vitamin!"},
  ], function(err, result) {
    console.log(result);
  });
})

       


   