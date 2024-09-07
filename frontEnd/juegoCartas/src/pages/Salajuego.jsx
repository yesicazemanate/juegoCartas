import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import TarjetasPoke from "../components/TarjetasPokemon";

const socket = io('http://localhost:8089');

export default function Salajuego() {

   
    const [pokemons, setPokemons] = useState([]);
    const [numeroParticipantes, setNumeroParticipantes] = useState(2)
    const [tarjetasParticipantess, setTarjetasParticipantes] = useState([]);
    const [tarjetaJugada, setTarjetaJugada] = useState(null)

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
    useEffect(()=>{
        socket.on('CartasSeleccionadaJuego', (card)=>{
          setTarjetaJugada(card)
        });
        return () => {
          socket.off('CartasSeleccionadaJuego');
      };
    },[]);


    const handleTarjetaJugada = (card)=>{
      console.log('Carta jugada:', card); 
      if (socket) {
        socket.emit('CartasSeleccionada', card)
      }
    }

    useEffect(()=>{
      const DistribuirTarejtas = ()=>{
        const totalTarjetas = pokemons.length
        const TarjetasTotalJugador = 8;
        const totalJugadores = numeroParticipantes;

        if (totalTarjetas >= TarjetasTotalJugador * totalJugadores ) {
          const numeroTotalTarejtas = [];
          for (let index = 0; index < totalJugadores; index++) {
            const element = index * TarjetasTotalJugador;
            const final = element + TarjetasTotalJugador;
            numeroTotalTarejtas.push(pokemons.slice(element, final))
            
          }
          setTarjetasParticipantes(numeroTotalTarejtas)
        }else{
          console.log('error al repartir 8 cartas')
        }
      };
      if (pokemons.length > 0 && numeroParticipantes > 0) {
        DistribuirTarejtas()
      }
    },[pokemons, numeroParticipantes])
  return (
    <div>
    <p>Desde pagina socket</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {tarjetasParticipantess.map((cards, playerIndex) => (
            <div key={playerIndex} className="w-full max-w-xs">
                <h2 className="text-xl font-bold mb-4">Jugador {playerIndex + 1}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {cards.map((pokemon, index) => (
                        <TarjetasPoke
                            key={index}
                            name={pokemon.name}
                            imagen={pokemon.image}
                            alto='50'
                            ancho='48'
                            habilidad={pokemon.ability}
                            tipo={pokemon.type}
                            onClick={() => handleTarjetaJugada(pokemon)}
                        />
                    ))}
                </div>
            </div>
        ))}
    </div>
    {tarjetaJugada && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-800 text-white">
            <h2 className="text-lg font-bold">Carta Jugada</h2>
            <TarjetasPoke
                name={tarjetaJugada.name}
                imagen={tarjetaJugada.image}
                alto='50'
                ancho='48'
                habilidad={tarjetaJugada.ability}
                tipo={tarjetaJugada.type}
            />
        </div>
    )}
</div>
);
}