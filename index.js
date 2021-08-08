const express = require('express');
const path = require('path');
require('dotenv').config();

//App de Express
const app = express();

//Node Server soket
const server = require('http').createServer(app);
//informacion que llega y sale
module.exports.io = require('socket.io')(server);
//respuesta del servidor
require('./sockest/socket');



//path publico
//__dirname apunta que al dominio o al localhost
//public es la carpeta con el html
const publicPath = path.resolve( __dirname, 'public' )

app.use( express.static(publicPath));

//toma la conexion de node server soket
server.listen( process.env.PORT, ( err ) => {

   if(err) throw new Error(err);

   console.log('Servidor corriendo en puerto', process.env.PORT);

});