const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static("public"));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/apple', function(req, res) {
	res.render('welcome.html')
})

app.get('/jam', function(req, res) {
   res.render('index.html');
});

var users = new Array();
var userInstruments = new Array();

io.on('connection', function(socket) {
	console.log('A user connected');

<<<<<<< 56ff87d44a191e778a15d75c88c0c58d5f9e5dfc
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
=======
	socket.on('play', function(data) {
		const id = socket.id;
		socket.broadcast.emit('play', data);
	})

	socket.on('disconnect', function() {
		console.log('A user disconnected');
	});
>>>>>>> integrates socket functionality with piano
});


http.listen(3000, function() {
   console.log('listening on *:3000');
});
