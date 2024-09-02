import React, { useState } from 'react'
import { Claudinary } from './claudinary'
import axios from 'axios'
import { Link } from 'react-router-dom'
export const Register = () => {
 const [image, setImage]= useState(null)
 const [usuario, setUsuario]=useState('')
 const [email, setEmail]= useState('')
 const [contraseña, setContraseña]= useState('')
 const [alert, setAlert]= useState()
 const data={
 usuario:usuario,
 email:email,
 password: contraseña,
 string_url:image
 }
const handleSubmit=async(e)=>{
  try{
    e.preventDefault(); 
  const response= await axios.post('http://localhost:8089/user/register',data)
  if(response.data){
setAlert(true)
  }
  }catch(error){
    console.log(error)
    setAlert(false)
  }

}
  return (
    <>
     <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={(e)=>handleSubmit(e)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={usuario}
            onChange={(e)=>setUsuario(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={contraseña}
            onChange={(e)=>setContraseña(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Foto perfil</label>
        <Claudinary setImage={setImage} image={image}/>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Registrar
        </button>
      </form>
      {
        alert&&(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">Registro Exitoso</h2>
            <p className="mb-4">¡Tu registro ha sido completado exitosamente!</p>
            <Link
              to={'/'}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ir a Inicio
            </Link>
          </div>
        </div>
        )
      }
    </div>
    </>
  )
}
