import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import TarjetasPoke from "../components/TarjetasPokemon";

export default function Salajuego() {

    const [socket, setSocket] = useState(null);
    const [pokemons, setPokemons] = useState([]);
    const [numeroParticipantes, setNumeroParticipantes] = useState(2)
    const [tarjetasParticipantess, setTarjetasParticipantes] = useEffect([]);

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
        const socketInstance = io("http://localhost:8089");
        setSocket(socketInstance);
        socketInstance.on('tarjetasActualizadas',(numeroParticipantes)=>{
          setNumeroParticipantes(numeroParticipantes);
        })
    },[])
    useEffect(()=>{
      const DistribuirTarejtas = ()=>{
        const totalTarjetas = pokemons.length
        const TarjetasTotalJugador = 8;
      }
    })
  return (
    <div>
      <p>Desde pagina socket</p>
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
    </div>
  )
}
