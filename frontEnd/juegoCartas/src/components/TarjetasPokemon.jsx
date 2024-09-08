

export default function TarjetasPokemon({name, imagen, tipo, habilidad, modal, disabled}) {
  const handleClick = () => {
    if (!disabled) {
      modal(name, imagen, habilidad);
    }
  };

  return (
    <div onClick={handleClick} className={`cursor-pointer bg-white w-56 rounded-2xl shadow-lg p-4 max-w-xs transform transition-transform hover:scale-105 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    <img
      src={imagen}
      alt={name}
      className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
    />
    <h2 className="text-center text-2xl font-bold text-gray-800 mt-4">{name}</h2>
    <div className="mt-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Tipo:</span>
        <span className="text-gray-800 font-medium">{tipo}</span>
      </div>
    
      <div className="flex justify-between items-center text-sm mt-2">
        <span className="text-gray-600">Habilidad:</span>
        <span className="text-gray-800 font-medium">{habilidad}</span>
      </div>
    </div>
  </div>
  )
}
