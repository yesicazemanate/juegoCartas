
const ModalSeleccionarPokemon = ({ pokemonSeleccionado, modal, cerraarModal, seleccionarCaracteristica }) => {
  if (!modal.abrir || !pokemonSeleccionado) {
    return null;
  }

  const { name, image, ability, type, height, weight, stats } = pokemonSeleccionado;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Seleccionar característica de {name}</h2>
          <button onClick={cerraarModal} className="text-red-500 font-bold">X</button>
        </div>

        <div className="flex justify-center mb-4">
          <img src={image} alt={name} className="w-32 h-32" />
        </div>

        <div className="mb-4">
          <p><strong>Habilidad:</strong> {ability}</p>
          <p><strong>Tipo:</strong> {type}</p>
          <p><strong>Altura:</strong> {height}</p>
          <p><strong>Peso:</strong> {weight}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold">Estadísticas</h3>
          <ul>
            {stats.map((stat, index) => (
              <li key={index} className="flex justify-between">
                <span>{stat.name}:</span>
                <span>{stat.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold">Seleccionar Característica</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => seleccionarCaracteristica('habilidad')}
            >
              Habilidad
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => seleccionarCaracteristica('tipo')}
            >
              Tipo
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => seleccionarCaracteristica('altura')}
            >
              Altura
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              onClick={() => seleccionarCaracteristica('peso')}
            >
              Peso
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
            onClick={cerraarModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSeleccionarPokemon;
