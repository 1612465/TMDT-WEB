var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine ", "ejs");
app.set("views", "./views");
app.listen(3000);

app.get('/',function(req,res){
    res.sendFile(__dirname + "/1.html");
});

var pg = require('pg');
var config ={
    user:'postgres',
    database:'Hotgirl',
    password:'postgres',
    host:'localhost',
    port: 5432,
    max:10,
    idleTimeoutMillis: 30000,
};

var pool= new pg.Pool(config);



app.get("/like/:id",function(req,res){
    var id = req.params.id

    pool.connect(function(err, client, done) {
        if (err) return done(err)
      
        client.query('UPDATE "hotgirlcollection" SET "Like"="Like"+1  WHERE "id"=' + id  , function(err, result) {
          done()
          if (err) {
            return console.error('query error', err)
          }
          console.log("Update Like success");
          res.send("Update Like success");
        });
      });
});

app.get("/dislike/:id",function(req,res){
    var id = req.params.id

    pool.connect(function(err, client, done) {
        if (err) return done(err)
      
        client.query('UPDATE "hotgirlcollection" SET "Dislike"="Dislike"+1  WHERE "id"=' + id  , function(err, result) {
          done()
          if (err) {
            return console.error('query error', err)
          }
          console.log("Update Dislike success");
          res.send("Update Dislike success");
        });
      })
})

app.get("/hotgirls/:id",function(req,res){
    var id = req.params.id;

    pool.connect(function(err, client, done) {
        if (err) return done(err)
      
        client.query('SELECT * FROM "hotgirlcollection" WHERE "id"=' + id  , function(err, result) {
          done()
          if (err) {
            return console.error('query error', err)
          }
          console.log();
          res.render("trangchu.ejs",{dangxem:id, hinh: result.rows[0].Hinh});
        });
      })



});

