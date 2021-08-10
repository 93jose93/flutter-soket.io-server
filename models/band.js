
//libreria instalado para generar un id unico
const { v4: uuidV4 } = require('uuid');

class Band {

    constructor( name = 'no-name') {

         this.id = uuidV4(); //identificado unico
         this.name = name;
         this.votes = 0;

    }
}

//para poderlo usar en otro lado se usa una exportacion
module.exports = Band;