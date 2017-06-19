var express        =         require("express");
var bodyParser     =         require("body-parser");
var path = require("path");
var app            =         express();


//app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//app.use(require('stylus').middleware(__dirname));

//Tell Express to make this public folder accessible to the public by
//using a built-in middleware called express.static
app.use(express.static(path.join(__dirname, 'public')));//style

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Connecting to MongoDB
var MongoClient = require('mongodb').MongoClient
// Connection URL
var url = 'mongodb://localhost:27017/crud5';
// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
  if (err) return console.log(err);
  console.log("Connected correctly to server");

  var collection = db.collection('quotes2');

  app.get('/',(req,res) => {
    collection.find({}).toArray((err,docs) => {
         if (err) return console.log(err);
         console.log(docs);
         res.render('indexnew', { list : docs });
    })

});

  app.post('/',(req,res) => {
    collection.save(req.body, (err,result) => {
        if (err) console.log(err);
        res.redirect("/");//we can send the results back to the AJAX request
    })
});

  app.put('/quotes',(req,res) => {
    console.log(req.body);
    collection.findOneAndUpdate({},
      {$set: { name: req.body.name, quote: req.body.quote }}//getting the most up to date data
  , {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) console.log(err);
    console.log(result);//This is the previous last entered quote
    res.send(result);//we can send the results back to the fetch request.
  })
});

  app.delete('/quotes',(req,res) => {
    collection.findOneAndDelete({},
  {
    sort: {_id: 1},
  }, (err, result) => {
    if (err) console.log(err);
    console.log("result"+result);//This is the previous last entered quote
    res.send(result);//we can send the results back to the fetch request.
  })
});

  app.listen(5000,function(){
  console.log("Started on PORT 5000");
})

})