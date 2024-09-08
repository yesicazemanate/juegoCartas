import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import TarjetasPoke from "../components/TarjetasPokemon";
import ModalSeleccionarPokemon from "../components/pokemonSeleccionadoModal";

const socket = io('http://localhost:8089');

export default function Salajuego() {
  const [cartasJugadas, setCartasJugadas] = useState([]);

  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
  const [tarjetasJugador, setTarjetasJugador] = useState([]); 
  const [tarjetaJugada, setTarjetaJugada] = useState();
  const [caracteristicaSeleccionada, setCaracteristicaSeleccionada] = useState(null);
  const [modal, setModal] = useState({
    abrir: false, name: null, imagen: null, tipo: null, ancho: null, alto: null, habilidad: null
  });
  const [turno, setTurno] = useState(false);

  const cerraarModal = () => {
    setModal({ abrir: false, imagen: null, tipo: null, ancho: null, alto: null, habilidad: null });
  };

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

        socket.emit('iniciarPartida', 'jugador', 2, detailedPokemons);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const abrirModal = async (nombrePoke) => {
    try {
      setModal({ abrir: true });
      const responseIdPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombrePoke}`);
      const detallePoke = {
        name: responseIdPoke.data.name,
        image: responseIdPoke.data.sprites.front_default,
        ability: responseIdPoke.data.abilities[0]?.ability.name || 'N/A',
        type: responseIdPoke.data.types[0]?.type.name || 'N/A',
        height: responseIdPoke.data.height,
        weight: responseIdPoke.data.weight,
        stats: responseIdPoke.data.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      };
      setPokemonSeleccionado(detallePoke);
    } catch (error) {
      console.error(`Hubo un error: ${error}`);
    }
  };
  const seleccionarCaracteristica = (caracteristica) => {
    if (!pokemonSeleccionado) {
      console.error('No hay Pokémon seleccionado');
      return;
    }
  
    console.log('Enviando característica:', caracteristica);
    console.log('Enviando carta:', pokemonSeleccionado);
    socket.emit('caracteristicaSeleccionada', {
      jugadorId: 'Jugador 1', 
      caracteristica
    });
  
    socket.emit('CartasSeleccionada', {
      card: pokemonSeleccionado,
      caracteristica
    });
  
    cerraarModal();
  };
  
  useEffect(() => {
    socket.on('cartasAsignadas', (cartas) => {
      console.log('Cartas recibidas:', cartas);
      setTarjetasJugador(cartas);
    });
  
    socket.on('turnoJugador', (turno) => {
      setTurno(turno);
    });
    const handleCartasSeleccionadaJuego = ({ card, caracteristica }) => {
      console.log("Característica recibida de otro:", caracteristica);
      console.log("Carta recibida de otro:", card);
      setTarjetaJugada(card);
      setCaracteristicaSeleccionada(caracteristica);
      setCartasJugadas(prev=>[...prev, card.name])
    };
  
    socket.on('CartasSeleccionadaJuego', handleCartasSeleccionadaJuego);
  
    return () => {
      socket.off('cartasAsignadas');
      socket.off('turnoJugador');
      socket.off('CartasSeleccionadaJuego', handleCartasSeleccionadaJuego);
    };
  }, []);

  

  return (
    <div className="w-full h-full">
      {modal.abrir && (
        <ModalSeleccionarPokemon
          pokemonSeleccionado={pokemonSeleccionado}
          modal={modal}
          cerraarModal={cerraarModal}
          seleccionarCaracteristica={seleccionarCaracteristica}
        />
      )}

      <p>Desde la página de juego</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {tarjetasJugador.map((pokemon, index) => (
          <TarjetasPoke
            key={index}
            name={pokemon.name}
            imagen={pokemon.image}
            habilidad={pokemon.ability}
            tipo={pokemon.type}
            modal={() => abrirModal(pokemon.name)}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-700 text-white">
      <h2 className="text-lg font-bold">Carta Jugada</h2>
      {tarjetaJugada && (
      <>
        <p className="text-sm">Característica seleccionada: {caracteristicaSeleccionada}</p>
        <TarjetasPoke
          name={tarjetaJugada.name}
          imagen={tarjetaJugada.image}
          habilidad={tarjetaJugada.ability}
          tipo={tarjetaJugada.type}
        />
      </>
    )}
</div>
    </div>
  );
}
