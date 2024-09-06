import { useEffect, useState } from "react";
//import io from "socket.io-client";
import TarjetasPoke from "../components/TarjetasPokemon";
import axios from "axios";

const CerrarSesion = () => {
    // const [mensaje, setMensaje] = useState('');
    // const [cartasEnJuego, setCartasEnJuego] = useState([]);
    // const [jugadores, setJugadores] = useState([]);
    // const [turnoActual, setTurnoActual] = useState(0);
    // const [miTurno, setMiTurno] = useState(false);
    // const [miId, setMiId] = useState('');
    // const [socket, setSocket] = useState(null);
    const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=56'); 
        const pokemonList = response.data.results;
        
        const detailedPokemons = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const pokemonDetail = await axios.get(pokemon.url);
            return {
              name: pokemonDetail.data.name,
              image: pokemonDetail.data.sprites.front_default,
              ability: pokemonDetail.data.abilities[0]?.ability.name || 'N/A',
              type: pokemonDetail.data.types[0]?.type.name || 'N/A',
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

    // useEffect(() => {
    //     const socketInstance = io("http://localhost:8089");
    //     setSocket(socketInstance);

    //     socketInstance.on('connect', () => {
    //         setMiId(socketInstance.id);
    //         console.log("Mi ID asignada:", socketInstance.id);
    //     });

    //     socketInstance.on('estadoInicial', ({ jugadores, cartasEnJuego, currentTurn }) => {
    //         setJugadores(jugadores);
    //         setCartasEnJuego(cartasEnJuego);
    //         setTurnoActual(currentTurn);
    //     });

    //     socketInstance.on('actualizarCartas', ({ cartasEnJuego }) => {
    //         setCartasEnJuego(cartasEnJuego);
    //     });

    //     socketInstance.on('cambiarTurno', ({ currentTurn }) => {
    //         setTurnoActual(currentTurn);
    //     });

    //     socketInstance.on('errorTurno', (mensaje) => {
    //         alert(mensaje);
    //     });

    //     socketInstance.on('jugadorDesconectado', ({ jugadores, currentTurn }) => {
    //         setJugadores(jugadores);
    //         setTurnoActual(currentTurn);
    //     });

    //     return () => {
    //         socketInstance.disconnect();
    //     };
    // }, []);

    // useEffect(() => {
    //     if (jugadores.length > 0) {
    //         const esMiTurno = jugadores[turnoActual]?.id === miId;
    //         console.log("miId:", miId);
    //         console.log("turnoActual:", turnoActual);
    //         console.log("Jugadores:", jugadores);
    //         console.log("Jugador en turno:", jugadores[turnoActual]?.id);
    //         console.log("Es mi turno:", esMiTurno);
    //         setMiTurno(esMiTurno);
    //     }
    // }, [miId, turnoActual, jugadores]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (jugadores[turnoActual]?.id === miId) {
    //         socket.emit('jugarCarta', { idJugador: miId, carta: mensaje });
    //         setMensaje('');
    //         console.log(miId);
    //     } else {
    //         alert("No es tu turno");
    //         console.log(miId);
    //     }
    // };

    return (
        <div className="flex flex-col">
            <h2>CERRAR SESION</h2>
            <p>Contenido para puntake.</p>

            <p>Ejemplo de Tarjetas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {pokemons.map((pokemon, index) => (
        <TarjetasPoke
          key={index}
          name={pokemon.name}
          imagen={pokemon.image}
          alto='50'
          ancho='48'
          habilidad={pokemon.ability}
          tipo={pokemon.type}
        />
      ))}
            </div>
            {/* <div>
                <p>Socket</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        onChange={(e) => setMensaje(e.target.value)} 
                        value={mensaje} 
                        type="text" 
                        placeholder="Carta"
                    />
                    <button type="submit"  disabled={!miTurno}>Enviar</button>
                </form>
            </div> */}
            {/* <h3>Cartas en Juego</h3>
            <ul>
                {cartasEnJuego.map((car, index) => (
                    <li key={index}>{car}</li>
                ))}
            </ul>
            <p>Es el turno de: {jugadores[turnoActual]?.nombre}</p> */}
        </div>
    );
};

export default CerrarSesion;
