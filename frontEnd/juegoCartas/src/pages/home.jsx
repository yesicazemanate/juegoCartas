import UserPuntaje from "../components/PunatajeUser";

const Home = () => {
  return(
     <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <UserPuntaje
        foto='../../public/game.png'
         nombre="Felipe Lopez"
         puntuacion='2'
        />
           <UserPuntaje
        foto='../../public/game.png'
         nombre="Felipe Lopez"
         puntuacion='2'
        />
           <UserPuntaje
        foto='../../public/game.png'
         nombre="Felipe Lopez"
         puntuacion='2'
        />
           <UserPuntaje
        foto='../../public/game.png'
         nombre="Felipe Lopez"
         puntuacion='2'
        />
     </div>);
};

export default Home;
