import { useEffect, useState } from "react";
import Logout from "./logout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotesEmptyState = () => {
  const [notas, setNotas] = useState([]); // Estado para almacenar las notas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función para obtener las notas de la API
  const fetchNotas = async () => {
    try {
      const response = await fetch("http://localhost:3001/notas",{
        method: 'GET',
        credentials: 'include'
      }); // Asegúrate de que la ruta sea correcta
      const data = await response.json();
      await handleResponse(data)
      setNotas(data.data || []); // Asigna las notas al estado
    } catch (error) {
      console.error("Error al obtener notas:", error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };
  const handleResponse = async (data) => {
		if (data.status === 429){
			toast.error(data.message);
		}
    else if (data.status === 401){
      toast.error(data.message);
			setTimeout(() => {
			  window.location.href = '/';
         // Redirige después de mostrar el mensaje
			}, 3000); // Espera 3 segundos antes de redirigir
    }
    return;
	};

  const getRandomLightColor = () => {
    const r = Math.floor(Math.random() * 56) + 200; // Rango de 200 a 255
    const g = Math.floor(Math.random() * 56) + 200; // Rango de 200 a 255
    const b = Math.floor(Math.random() * 56) + 200; // Rango de 200 a 255
    return `rgb(${r}, ${g}, ${b})`;
  };

  const notasConColor = notas.map((nota) => ({
    ...nota,
    color: getRandomLightColor(),
  }));

  // useEffect para llamar a la función fetchNotas cuando se monte el componente
  useEffect(() => {
    fetchNotas();
  }, []);

  return (
    <>
    <div className="w-[100%] p-4 h-screen bg-background-1 relative">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-white text-4xl font-semibold">Notas</h1>
        <div className="flex gap-1">
          <button className="p-2 rounded-2xl hover:bg-button-1">
            <img src="/public/img/search.png" alt="Buscar notas" className="w-[2rem]" />
          </button>
          <button className="p-2 rounded-2xl hover:bg-button-1">
            <img src="/public/img/info_outline.png" alt="Buscar notas" className="w-[2rem]" />
          </button>
          <Logout />
        </div>
      </header>

      {/* Renderizar notas o estado vacío */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <p className="text-gray-400 text-2xl">Cargando...</p> {/* Mensaje de carga */}
        </div>
      ) : notas.length === 0 ? (
        // Si no hay notas, mostrar el estado vacío
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <img src="/public/img/rafiki.png" alt="Sin notas" />
          <p className="text-gray-400 text-2xl pt-2">Crea su primera nota!</p>
        </div>
      ) : (
        // Si hay notas, mostrarlas
        <div className="mt-4">
          <div className="overflow-y-auto max-h-[90vh] pr-4 scrollbar-hide">
            {notasConColor.map((nota) => (
              <div key={nota._id} className="p-4 mb-4 rounded shadow" style={{ backgroundColor: nota.color }}>
                <h2 className="text-xl font-semibold">{nota.titulo}</h2>
                <p>{nota.contenido}</p>
              </div>
            ))}
          </div>
          
        </div>
      )}

      {/* FAB */}
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
        <img src="/public/img/add.png" alt="Agregar notas" />
      </button>
    </div>
    <ToastContainer /> {/* Notificaciones */}
    </>
  );
};

export default NotesEmptyState;
