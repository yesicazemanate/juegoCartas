
export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
         <div className="w-3/5 h-3/4 flex flex-col justify-center items-center rounded-2xl bg-slate-200">
            <p>INICIAR SESION</p>
            <form className="w-2/4 flex flex-col justify-center items-center">
                <div className="flex flex-col w-3/5">
                    <label>Usuario</label>
                <input className="w-full" placeholder="pepito@gmail.com"/>
                </div>
               
            </form>
         </div>
    
    </div>
  );
}
