const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const socketIo = require("socket.io");
const users = require("./routes/api/users");
const games = require('./routes/api/games');


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/games", games);


const port = 5000;





const http = require("http");
// const index = require("./routes/sockets/index");
const server = http.createServer(app);

const io = socketIo(server); // < Interesting!


let interval;

io.on("connection", socket => {
    socket.join('some room');

    socket.on('toAPI', function (someArg) {
        if (someArg.data.currentPlayer === 0) {
            someArg.data.currentPlayer = 1
        } else {
            someArg.data.currentPlayer = 0
        };
        io.to("some room").emit("FromAPI", someArg.data)
    });
    socket.on('player_change', function(someArg) {
        
        io.to("some_room").emit("change_player", someArg.data)
    })


    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    // socket.on("toAPI", data)
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));