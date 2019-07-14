
//import mongoose
const mongoose = require('mongoose');

//This creates a new Express server.
const express = require("express");
const app = express();

// routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

//import passport for login auth
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);
//import body parser to app.js so that we can parse the 
//JSON we send to our frontend:
const bodyParser = require('body-parser');


//setup some middleware for body parser:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//Now, let's setup a basic route so that we can render some 
//information on our page.

app.use("/api/users", users);
app.use("/api/tweets", tweets);


//Before we can run the server, we need to tell our app which port to run on. 
//Keeping in mind that we will later be deploying our app to Heroku, which 
//requires us to run our server on process.env.PORT
const port = process.env.PORT || 5000;


//tell Express to start a socket and listen for connections on the path.
app.listen(port, () => console.log(`Server is running on port ${port}`));


const db = require('./config/keys').mongoURI;

//connect to MongoDB using Mongoose
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

