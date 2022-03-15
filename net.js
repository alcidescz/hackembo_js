const server = require('net').createServer(); 
let counter = 1000; 
let sockets = {}; 

server.on('connection', socket => { 
	socket.id = counter++; 
	sockets[socket.id] = socket; 

	console.log('Nuevo Cliente conectado'); 
	socket.write('Bienvenido a e-Mongaru!'); 

	socket.on('data', data => { 
		Object.entries(sockets).forEach(([, cs]) => { 
			cs.write(`${socket.id}: `); 
			cs.write(data); 
		}); 
	});

	socket.on ('end', () => { 
		delete sockets[socket.id];
		console.log('Cliente desconectado'); 
	});
}); 
server.listen(8000, () => console.log('Servidor Conectado en el puerto 8080'));