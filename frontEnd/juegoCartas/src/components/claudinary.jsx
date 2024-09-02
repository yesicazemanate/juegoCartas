import React, { useState } from 'react'
import axios from 'axios'
export const Claudinary = ({setImage, image}) => {
const present_name="juegoCartas"
const cloud_name= "dioet2tjl"
  const [loading, setLoading]= useState()

  const uploadImage= async(e)=>{
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', present_name)
    setLoading(true)
    try{
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,data
      )  
      const file = response.data
      setImage(file.secure_url)
      setLoading(false)
    }catch(error){
      console.error('Error uploading image:', error);
      setLoading(false);
  }

  }
  return (
   <>
<input type='file'
name='file'
placeholder='upload an image'
onChange={(e)=>uploadImage(e)}/>


{loading ? (
            <h3>Loading...</h3>
        ) : (
        <img src={image} alt="imagen subida"/>
        )}
   </>
  )
}
