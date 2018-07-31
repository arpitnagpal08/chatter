var express = require("express")
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;
var path = require("path");

const mongoose = require("mongoose");

var url = "mongodb://127.0.0.1:27017/chat"

mongoose.connect(url, { useNewUrlParser: true } , function(error){
  if(error) console.log(error)
  else console.log(`Database connected to ${url}`)
})

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render("views/index.html")
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(PORT, function(){
  console.log(`Server listening on ${PORT}`);
});
