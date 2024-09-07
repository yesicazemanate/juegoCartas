
import { Participantes } from "../components/participantes"
import { useNavigate } from "react-router-dom";
export default function PruebaCAMBIONUMERO() {
  const navigate = useNavigate();
const sumitHandle=()=>{
  navigate('/sala')
}
  return (
    <div>
      <Participantes/>
      <button className="w-full py-3 mt-4 bg-blue-500 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition duration-200" onClick={sumitHandle}>Play</button>
    </div>
  )
}
