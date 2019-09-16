let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let actors = require('./routers/actors');
let movies = require('./routers/movies');

let app = express();
app.listen(8888);

// middleware
app.use(express.json());  // this app only uses json, so this is the only middleware needed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connect mongoose
let url = "mongodb://localhost:27017/movies";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err){
//mongoose.connect(url, function(err){  // use <this if this^ doesn't work
    if(err){
        console.log (err);
        console.log ("DB error!");
    }else{
        console.log ("DB connected!");
    }
});


// Configuring Endpoints
// Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/movies/:id', actors.deleteAll);
app.delete('/actors/delete/:actId/:movId', actors.deleteMovie);


//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/delete/:movId/:actId', movies.deleteActor);
app.post('/movies/:movId/addActor/:actId', movies.addActor);
app.get('/movies/year/:year1/:year2', movies.year);
