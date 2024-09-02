import TarjetasPoke from "../components/TarjetasPokemon";

const CerrarSesion = () => {
    return(
       <div>
          <h2>CERRAR SESION</h2>
          <p>Contenido para puntake.</p>

          <p>Ejemplo de Tarjetas</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          <TarjetasPoke
          name='Picaku'
          imagen='../../public/game.png'
          alto='50'
          ancho='48'
          habilidad='Corre demasiado rapido el poke'
          tipo='Amarillos'
          />
          <TarjetasPoke
          name='Picaku'
          imagen='../../public/game.png'
          alto='50'
          ancho='48'
          habilidad='Corre demasiado rapido el poke'
          tipo='Amarillos'
          />
          <TarjetasPoke
          name='Picaku'
          imagen='../../public/game.png'
          alto='50'
          ancho='48'
          habilidad='Corre demasiado rapido el poke'
          tipo='Amarillos'
          />
           <TarjetasPoke
          name='Picaku'
          imagen='../../public/game.png'
          alto='50'
          ancho='48'
          habilidad='Corre demasiado rapido el poke'
          tipo='Amarillos'
          />
          <TarjetasPoke
          name='Picaku'
          imagen='../../public/game.png'
          alto='50'
          ancho='48'
          habilidad='Corre demasiado rapido el poke'
          tipo='Amarillos'
          />
          </div>
         
       </div>);
  };
  
  export default CerrarSesion;
  