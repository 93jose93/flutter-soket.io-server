const Band = require("./band");

 class Bands{

    //creamos el arreglo de bandas
    constructor() {
        this.bands = [];
    }
    
    //para agregar una banda
    addBand( band = new Band()) {
         this.bands.push( band );
    }
    //obtener una banda
    getBands() {
        return this.bands;
    }

    //eliminar una banda
    deleteBand( id = '' ) {
        //se hace filtro en los arreglos de js, entonces se pone una condicion que el id eliminado no se igual y traiga el arreglo
        //no elimina si no, que no mlo mostrara
        this.bands = this.bands.filter( band => band.id !== id);
        //y despues retorna el nuevo arreglo de bandas
        return this.bands;
    }

    //votar, o incrementar 
    votedBand(id = '') {
        this.bands = this.bands.map( band => {
              
            //si esa id es igual a la id precionado
            if(band.id === id) {
                //entonces icrementamos
                band.votes++;

                return band;
            } else {
                //si no hay cambios retorna las votaciones actuales
                return band;
            }

        });
    }
 }
//exportar para que se pueda usar 
 module.exports = Bands;