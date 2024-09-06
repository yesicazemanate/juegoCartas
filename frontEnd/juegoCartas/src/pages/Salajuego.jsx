import { useState, useEffect } from "react";
import io from "socket.io-client";


export default function Salajuego() {
    const [socket, setSocket] = useState(null);
    useEffect(()=>{
        const socketInstance = io("http://localhost:8089");
        setSocket(socketInstance);
    },[])
  return (
    <div>
      <p>Desde pagina socket</p>
    </div>
  )
}
