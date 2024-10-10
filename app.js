var express = require('express');
var app = express(); // Usa app tanto para express quanto para o servidor
var http = require('http').Server(app); // Usa app aqui também
var io = require('socket.io')(http);

var fs = require('fs');
var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

var port = new SerialPort("COM3", {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

port.pipe(parser);

// Servir arquivos estáticos a partir da pasta atual
app.use(express.static(__dirname));

// Rota padrão para servir o HTML
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/calculosimulado.html');
});

io.on('connection', function(socket) {
    console.log('Node is listening to port');
});

parser.on('data', function(data) {
    console.log('Received data from port: ' + data);
    io.emit('data', data);
});

http.listen(3000, function() {
    console.log('Server is running on port 3000');
});
