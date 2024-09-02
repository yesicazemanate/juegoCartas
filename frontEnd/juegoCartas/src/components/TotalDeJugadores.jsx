

export default function TotalDeJugadores({number, modal}) {
  return (
    <div onClick={()=> modal(number)} className="relative cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl border-white border-2 w-40 shadow-lg transform transition-transform hover:scale-105">
    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 bg-white rounded-full border-2 border-indigo-500 flex items-center justify-center shadow-md">
      <img src="../../public/totalJuagdores/multiplayer-game.png" alt="Team" className="w-12 h-12 rounded-full p-1" />
    </div>
    <p className="text-4xl text-white font-bold text-center mt-4">{number}</p>
  </div>
  );
}
