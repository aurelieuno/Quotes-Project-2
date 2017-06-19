  app.post('/submit',(req,res) => {

    var findDocuments = function(db, callback) {
    collection.find({}).sort({$natural:-1}).limit(1).toArray((err,results) => {
      if(err) console.log(err);
      console.log(results);
       callback(results);
     });
  }

   var doc = collection.find({}).sort({$natural:-1}).limit(1)

    var updateDocuments = function(db, callback) {
    collection.updateOne(doc, {name:"CatWoman", quote:"Batman is dead"}, function(err,results) {
        if (err) console.log(err);
        console.log(results);
      });
 }

    findDocuments(db, function(results) {
        updateDocuments(db, function() {
          db.close();
        });
      });
});

    async.waterfall({
    findDoc: function(callback) {

      Author.findById(req.params.id)
        .exec(callback);
    },

    book: function(callback) {

      Book.find({ 'author': req.params.id })
        .populate('author')
        .exec(callback);
    },
  }, function(err, results) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('author_detail', { title: 'Author', book: results.book, author: results.author } );
  });

    app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})