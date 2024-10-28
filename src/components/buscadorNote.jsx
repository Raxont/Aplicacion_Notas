import { useEffect, useState } from "react";
import Logout from "./logout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteSearch = () => {
  const [query, setQuery] = useState(""); // Estado para la consulta de búsqueda
  const [notasEncontradas, setNotasEncontradas] = useState([]); // Estado para las notas encontradas
  const [loading, setLoading] = useState(false); // Estado de carga

  // Función para buscar notas
  const fetchNotas = async () => {
    if (!query) {
      return; // Si no hay consulta, no hacemos nada
    }
    
    setLoading(true); // Iniciar carga
    try {
      const response = await fetch(`http://localhost:3001/notas/search?query=${query}`, {
        method: "GET",
        credentials: 'include',
      });
      const data = await response.json();
      await handleResponse(data);
      if (data.data) {
        setNotasEncontradas(data.data); // Establecer las notas encontradas
      } else {
        setNotasEncontradas([]); // Si no hay datos, establecer como vacío
      }
    } catch (error) {
      console.error("Error al buscar notas:", error);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  const handleResponse = async (data) => {
    if (data.status === 429) {
      toast.error(data.message);
    } else if (data.status === 401) {
      toast.error(data.message);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000); // Redirige después de mostrar el mensaje
    }
  };

  const handleClickReturn = () => {
    toast.success('Regresando...');
    setTimeout(() => {
      window.location.href = '/home';
    }, 3000); // Espera 3 segundos antes de redirigir
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value === "") {
      setNotasEncontradas([]); // Si la consulta está vacía, reiniciar las notas encontradas
    }
  };

  const handleClear = () => {
    setQuery("");
    setNotasEncontradas([]); // Si se limpia la consulta, reiniciar las notas encontradas
  };

  const handleNotaClick = (id) => {
    // Redirige a la página /putNote con el ID de la nota
    window.location.href = `/putNote?id=${id}`;
  };

  // useEffect para buscar notas cuando cambie la consulta
  useEffect(() => {
    fetchNotas();
  }, [query]); // La búsqueda se ejecutará cada vez que cambie la consulta

  return (
    <>
      <div className="w-[100%] p-4 h-screen bg-background-1 relative">
        {/* Header */}
        <header className="flex justify-between">
          <button onClick={handleClickReturn} className="p-2 rounded-2xl hover:bg-button-1">
            <img src="/public/img/chevron_left.png" alt="Regresar" className="w-[1rem] filter invert" />
          </button>
          <div>
            <Logout/>
          </div>
        </header>
        
        {/* Campo de búsqueda */}
        <div className="relative mt-6 w-full">
        <input
            type="text"
            placeholder="Buscar por palabra clave..."
            value={query}
            onChange={handleSearch}
            className="text-lg p-2 pl-4 pr-10 w-full bg-transparent border-2 rounded-full border-gray-300 focus:outline-none"
            style={{ paddingLeft: '20px' }} 
        />
        <button onClick={handleClear}>
            <img
                src="/public/img/close.png" // Coloca la ruta de la imagen del icono
                alt="Buscar"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4"
            />
        </button>
        </div>

        {loading ? (
          <p className="text-white">Cargando...</p> // Mensaje de carga
        ) : (
          <>
            {notasEncontradas.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[70vh]">
                <img src="/public/img/cuate.png" alt="No se encontraron resultados" className="w-[100%] h-[50%]" /> {/* Imagen de no resultados */}
                <p className="text-gray-400 text-2xl pt-2">Archivo no encontrado. Intente buscar de nuevo.</p>
              </div>
            ) : (
              <div className="mt-4 max-h-[80%] overflow-y-scroll">
                {notasEncontradas.map((nota) => (
                  <div key={nota._id} className="p-4 mb-4 bg-white rounded shadow cursor-pointer" onClick={() => handleNotaClick(nota._id)}>
                    <h2 className="text-xl font-bold">{nota.titulo}</h2>
                    <p>{nota.contenido}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer /> {/* Notificaciones */}
    </>
  );
};

export default NoteSearch;
