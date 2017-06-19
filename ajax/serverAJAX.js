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
         res.render('index2', { list : docs });
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
    sort: {_id: -1},
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






/**
console.log(__dirname);//C:\Users\u00136\myprojects\CRUD
console.log(req.body);//{ name: 'lili', quote: 'this is my quote' }

MongoDB Collections come with a method called findOneAndUpdate that allows us to change one
item from the database. It takes in four parameters — query, update, options and a callback.
The first parameter, query, allows us to filter the collection through key-value pairs
given to it. We can filter the quotes collection for Master Yoda’s quotes by setting
the name to Yoda.
The second parameter, update, tells MongoDB what to do with the update request.
It uses MongoDB’s update operators like $set, $inc and $push.
We will use the $set operator since we’re changing Yoda’s quotes into Darth Vader’s quotes:
The third parameter, options, is an optional parameter that allows you to define additional
stuff. Since we’re looking for the last quote by Yoda, we will set sort within options
to {_id: -1}. This allows MongoDB to search through the database, starting from the newest
entry.
There’s a possibility that there aren’t any quotes by Master Yoda in our database.
MongoDB does nothing by default when this happens. We can force it to create a
new entry if we set the upsert option, which means insert (or save) if no entries are found,
to true.
The final parameter is a callback function that allows you to do something once MongoDB has replaced
the final quote by Yoda with a quote by Darth Vadar. In this case, we can send the results back to
the fetch request.
Now, whenever someone clicks on the update button, the browser will send a PUT request through Fetch
to our Express server. Then, the server responds by sending the changed quote back to fetch. We can
then handle the response within by chaining fetch with a then method. This is possible because Fetch
 returns a Promise object.
The proper way to check if fetch resolved successfully is to use the okmethod on the response object.
 You can then return res.json() if you want to read the data that was sent from the server:
If you are working on a fancy webapp, this is the part where you use JavaScript to update the DOM so
users can see the new changes immediately. Updating the DOM is out of the scope of this article,
 so we’re just going to refresh the browser to see the changes.
**/