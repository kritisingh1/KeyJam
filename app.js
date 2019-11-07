const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static("public"));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('welcome.html')
})

app.get('/piano', function(req, res) {
	return res.render('piano.html');
})

app.get('/drums', function(req, res) {
	return res.render('drums.html');
})

var users = new Array();
var userInstruments = new Array();

io.on('connection', function(socket) {
	console.log('A user connected');
	
	socket.on('setUsername', function(data) {
		console.log(data);
		
		if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
		} else {
		 users.push(data);
		 socket.emit('userSet', {username: data});
		}
   	});

   	socket.on('setInstrument', function(data) {
   		console.log(data);

   		userInstruments.push(data);
   		socket.emit('instrumentSet', {userInstrument: data});

   	});

	socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   	})

	socket.on('play-piano', function(data) {
		socket.broadcast.emit('play-piano', data);
	})

	socket.on('play-drums', function(data) {
		socket.broadcast.emit('play-drums', data);
	})

	socket.on('disconnect', function() {
		console.log('A user disconnected');
	});
});


http.listen(3000, function() {
   console.log('listening on *:3000');
});
