const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const socketIo = require("socket.io");
const users = require("./routes/api/users");
const games = require('./routes/api/games');


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/games", games);


const port = process.env.PORT || 5000;

const http = require("http");
// const index = require("./routes/sockets/index");
const server = http.createServer(app);

const io = socketIo(server); // < Interesting!


let interval;
let socketList = {}
let room;
io.on("connection", socket => {
 
    socket.on("open_room", data => {
       
        room = data.game
    })
    // socketList[socket.id] = socket // just added
    socket.join(room);
    
    // socket.on("twoPlayer", data => {
    //     multiplayer = socketList.length > 1 ? true : false;
    //     io.emit("twoPlayer", data);
    //     console.log(socketList)
    //     console.log(data)
    // })
    socket.on('toAPI', function (someArg) {
        // if (someArg.data.currentPlayer === 0) {
        //     someArg.data.currentPlayer = 1
        // } else {
        //     someArg.data.currentPlayer = 0
        // };
        
        io.to(room).emit("FromAPI", someArg.data)
    });
   


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