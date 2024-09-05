
export default function PunatajeUser({foto,nombre,puntuacion}) {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
            <div className="relative">
                <img 
                    className="w-full h-48 object-cover object-center border-b-4 border-teal-500"
                    src={foto}
                    alt={nombre}
                />
                <div className="absolute bottom-0 left-0  bg-gray-800 w-full">
                    <h2 className="text-1xl font-bold text-white">{nombre}</h2>
                </div>
            </div>
            <div className="p-4 flex items-center justify-between bg-gray-100">
                <p className="text-lg font-semibold text-gray-800">Puntaje:</p>
                <span className="text-2xl font-bold text-teal-500">{puntuacion}</span>
            </div>
        </div>
         )
}
