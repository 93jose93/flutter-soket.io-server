//importamos la libreria io
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

//una nueva instancia, esto Bands trae los metodos que se crearon CRUD
const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Rammstein' ) );
bands.addBand( new Band( 'AC/DC' ) );

//console.log(bands);


//mensaje de sockets
io.on('connection', client => {
    console.log('Clinte conectado');

    //con este llamamos las bandas
    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => { 
         console.log('Clinete desconectado');
    });
 
    //mensaje enviado del html y aqui lo recive 
    //payload es el argumento del nombre enviado en html
    client.on('mensaje', ( payload )=> {
       console.log('Mensaje!!', payload);
       
 
       //aqui es lo que responde el servidor a todos los usarios coentacods por io.emit
       io.emit( 'mensaje', {admin: 'Nuevo mensaje'} );
    });


    //cuando el cliente desde flutter de votar
    client.on('vote-band', (payload) => {
       //aqui recibe la el ojecto que envia el id segun la banda
       //console.log(payload);

       bands.votedBand(payload.id);
       //este es un mensaje que se elviara a todos cuando vote

       io.emit('active-bands', bands.getBands());
    });

    //escuchar evento que probiene al agregar una banda
    client.on('add-band', (payload) => {

      //hay que inicializar una banda, cuando se quiera agregar
      const newBand = new Band(payload.name);

      //pide una banda
      bands.addBand(newBand);
      io.emit('active-bands', bands.getBands());
   });

   //liminar banda que porbiene la llamada desde flutter, al deslizar
   client.on('delete-band', (payload) => {

      
      bands.deleteBand(payload.id);
      io.emit('active-bands', bands.getBands());
   });




   /*

    //emitir mensaje
    client.on('emitir-mensaje', (payload) => {
       //emitir para todos los clientes
       //io.emit('nuevo-mensaje', payload );
       
       //emitir solo para todos pero menos al cliente que envia el mensaje
       client.broadcast.emit('nuevo-mensaje', payload );
    });

   */



    //eeste mensaje biene desde flutter 
   /*
   client.on('emitir-mensaje', (payload) => {
      console.log(payload);

      //esto se envia al html para que imprima el mensaje
      client.broadcast.emit('nuevo-mensaje', payload );
   });
   */


  });
 