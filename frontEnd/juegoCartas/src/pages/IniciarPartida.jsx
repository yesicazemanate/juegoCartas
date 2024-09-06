import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PartidasDisponibles from "../components/PartidasDisponibles";
import io from "socket.io-client";

const socket = io('http://localhost:8089');

const IniciarPartida = () => {
    const navigate = useNavigate();
    const [modall, setModal] = useState({ isOpen: false, numeroParticipantes: null, nombrePartida: null });
    const token = document.cookie.split('=')[1];
    const [iduser, setIduser] = useState();
    const [codigo, setCodigo] = useState();
    const [alert, setAlert] = useState();
    const [idpartida, setPartida] = useState();
    const [pasar, setPasar] = useState();
    const [datosPartida, setDatosPartida] = useState([]);

    useEffect(() => {
        const decodeToken = async () => {
            try {
                const response = await axios.post('http://localhost:8089/user/', {}, {
                    headers: {
                        Authorization: token
                    }
                });
                setIduser(response.data.id);
                console.log(response.data.id)
            } catch (error) {
                console.log('Error al decodificar el token:', error);
            }
        };
        decodeToken();
    }, [token]);

    useEffect(() => {
        if (codigo) {
            const compararCodigo = async () => {
                try {
                    const response = await axios.post('http://localhost:8089/partida/comparar', { codigo });
                    if (response.data.length > 0) {
                        setAlert(false);
                        setPartida(response.data[0]._id);
                        setPasar(true);
                    } else {
                        setAlert(true);
                        setPasar(false);
                    }
                } catch (error) {
                    console.log('Error al comparar código:', error);
                }
            };
            compararCodigo();
        }
    }, [codigo]);

    const actualizarPartida = async () => {
        const user = { iduser };
        try {
            const response = await axios.patch(`http://localhost:8089/partida/${idpartida}`, {
                participantes: user
            });
            console.log('Partida actualizada:', response.data);
        } catch (error) {
            console.log('Error al actualizar partida:', error);
        }
    };

    const traerPartidas = async () => {
        try {
            const response = await axios.get('http://localhost:8089/partida/');
            setDatosPartida(response.data);
        } catch (error) {
            console.log('Error al traer partidas:', error);
        }
    };
   
    
    useEffect(() => {
        traerPartidas();
        const handleCrearPartida = (nuevaPartida) => {
            setDatosPartida(prevPartidas => [...prevPartidas, nuevaPartida]);
        };
    
        socket.on('connect', () => {
            console.log('Conectado a Socket.io con ID:', socket.id);
        });
    
        socket.on('disconnect', () => {
            console.log('Desconectado de Socket.io');
        });
    
        socket.on('crearPartida', handleCrearPartida);
    
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('crearPartida', handleCrearPartida);
        };
    }, []);
    

    const cerrarModal = () => {
        setModal({ isOpen: false, number: null });
        navigate('/iniciarpartida');
    };

    const unirse = () => {
        actualizarPartida();
        if (pasar) {
            localStorage.setItem('idpartida', idpartida);
            navigate('/pruebaa');
        }
    };

    const abrirParticipantesModal = (nombrePartida, numeroParticipantes) => {
        setModal({ isOpen: true, nombrePartida, numeroParticipantes });
    };
 

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-100 to-gray-300">
                {modall.isOpen && (
                    <div className="fixed w-full inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="flex flex-col justify-center items-center w-96 bg-white p-6 rounded-lg shadow-lg">
                            {alert && (
                                <h1 className="text-lg mb-4">El código proporcionado no pertenece a ninguna partida</h1>
                            )}
                            <h2 className="text-center font-semibold text-2xl text-gray-700 mb-6">Escriba su código para iniciar partida</h2>
                            <h2 className="text-lg mb-4">Debe tener 6 caracteres</h2>
                            <input
                                className="border-2 p-2 border-black rounded-lg"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                            <div className="flex flex-row">
                                <button
                                    onClick={unirse}
                                    className="mr-8 mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Unirme
                                </button>
                                <button
                                    onClick={cerrarModal}
                                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="w-5/6 max-w-5xl bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center">
                    <h2 className="text-center font-semibold text-2xl text-gray-700 mb-6">Partidas Disponibles</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {console.log('Renderizando partidas:', datosPartida)} {/* Verificar el estado antes del render */}
        {datosPartida.length === 0 ? (
            <p>No hay partidas disponibles</p>
        ) : (
            datosPartida.map((partida) => (
                <PartidasDisponibles
                    key={partida._id}
                    nombrePartida={partida.nombrePartida}
                    numeroParticipantes={partida.numeroParticipantes}
                    modal={abrirParticipantesModal}
                />
            ))
        )}
                    </div>
                    <div className="w-full flex justify-end items-end">
                        <button className="relative cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg mt-6" onClick={() => setModal({ isOpen: true })}>
                            Crear Partida
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IniciarPartida;
