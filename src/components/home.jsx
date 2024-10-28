import { useEffect, useState } from "react";
import Logout from "./logout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotesEmptyState = () => {
  const [notas, setNotas] = useState([]); // Estado para almacenar las notas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [hoveredNote, setHoveredNote] = useState(null); // Estado para manejar la nota sobre la que se pasa el mouse
  const [notasConColor, setNotasConColor] = useState([]); // Estado para almacenar notas con colores
  const [deleteEnabled, setDeleteEnabled] = useState(true); // Estado para habilitar/deshabilitar la opción de eliminar

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

  // Función para eliminar una nota
  const deleteNota = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/notas/${id}`, { method: "DELETE", credentials: 'include' }); // Realiza la solicitud de eliminación a la API
      const data = await response.json();
      await handleResponse(data)
      setNotas(notas.filter((nota) => nota._id !== id)); // Filtra la nota eliminada del estado
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
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
  
  const handleClick = () => {
    toast.success('Agregando nueva nota...');
		setTimeout(() => {
			window.location.href = '/addNote';
       // Redirige después de mostrar el mensaje
		}, 3000); // Espera 3 segundos antes de redirigir
  };

  // useEffect para llamar a la función fetchNotas cuando se monte el componente
  useEffect(() => {
    fetchNotas();
  }, []);

  useEffect(() => {
    // Generar colores solo cuando las notas se hayan cargado
    if (notas.length > 0) {
      const notasConColor = notas.map((nota) => ({
        ...nota,
        color: getRandomLightColor(), // Asigna un color aleatorio
      }));
      setNotasConColor(notasConColor); // Actualiza el estado con las notas y sus colores
    }
  }, [notas]);

  const handleNotaClick = (id) => {
    // Redirige a la página /putNote con el ID de la nota
    window.location.href = `/putNote?id=${id}`;
  };
  const handleNotaBuscador = () => {
    // Redirige a la página /putNote con el ID de la nota
    window.location.href = `/buscadorNote`;
  };

  return (
    <>
    <div className="w-[100%] p-4 h-screen bg-background-1 relative">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-white text-4xl font-semibold">Notas</h1>
        <div className="flex gap-1">
          <button className="p-2 rounded-2xl hover:bg-button-1" onClick={handleNotaBuscador}>
            <img src="/public/img/search.png" alt="Buscar notas" className="w-[1.5rem] filter invert" />
          </button>
          <button className="p-2 rounded-2xl hover:bg-button-1" onClick={() => setDeleteEnabled(!deleteEnabled)}>
            <img src="/public/img/info_outline.png" alt="Editar nota" className="w-[1.5rem] filter invert" />
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
        <div className="mt-4">
          <div className="overflow-y-auto max-h-[90vh] scrollbar-hide">
            {notasConColor.map((nota) => (
              <div
                style={{ backgroundColor: nota.color }}
                key={nota._id}
                className={`p-4 mb-4 bg-white rounded-lg shadow relative transition-colors duration-300 cursor-pointer ${
                  hoveredNote === nota._id ? "bg-red-500" : ""
                }`}
                onMouseEnter={() => setHoveredNote(nota._id)}
                onMouseLeave={() => setHoveredNote(null)}
                onClick={() => handleNotaClick(nota._id)}
              >
                <h2 className="text-xl font-bold">{nota.titulo}</h2>
                <p>{nota.contenido}</p>
                {deleteEnabled && hoveredNote === nota._id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el click en eliminar active el click de la nota
                      deleteNota(nota._id);
                    }}
                    className="absolute inset-0 flex items-center justify-center text-none bg-button-2 rounded-lg"
                  >
                    <img src="/public/img/delete.png" alt="Eliminar" className="w-8 h-8" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAB */}
      <button onClick={handleClick} className="absolute bottom-6 right-6 w-14 h-14 bg-background-1 rounded-full flex items-center justify-center shadow-lg hover:bg-button-2 transition-colors">
        <img src="/public/img/add.png" alt="Agregar notas" className="filter invert"/>
      </button>
    </div>
    <ToastContainer /> {/* Notificaciones */}
    </>
  );
};

export default NotesEmptyState;
