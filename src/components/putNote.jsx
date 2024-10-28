import { useEffect, useState } from "react";
import Logout from "./logout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteAdd = () => {
  const [notas, setNotas] = useState([]); // Estado para almacenar las notas
  const [newNota, setNewNota] = useState({ titulo: "", contenido: "" }); // Estado para la nueva nota
  const [noteId, setNoteId] = useState(null); // Estado para almacenar el ID de la nota a editar

  // Función para obtener la nota por ID
  const fetchNota = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/notas/${id}`, {
        method: "GET",
        credentials: 'include',
      });
      const data = await response.json();
      await handleResponse(data);
      if (data.data) {
        setNewNota({
          titulo: data.data.titulo,
          contenido: data.data.contenido,
        }); // Establecer la información de la nota
      }
    } catch (error) {
      console.error("Error al obtener la nota:", error);
    }
  };

  // Función para agregar o editar una nota
  const handleClickEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/notas/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNota), // Enviar los datos de la nota
        credentials: 'include',
      });
      const data = await response.json();
      await handleResponse(data);
      setNotas((prevNotas) => prevNotas.map(nota => (nota._id === noteId ? { ...nota, ...newNota } : nota))); // Actualiza la lista de notas
      toast.success('Nota actualizada correctamente!');
      setNewNota({ titulo: "", contenido: "" }); // Limpiar el formulario
      setTimeout(() => {
        window.location.href = '/home';
      }, 3000); // Redirige después de mostrar el mensaje
    } catch (error) {
      console.error("Error al editar la nota:", error);
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

  // useEffect para obtener el ID de la nota de la URL y cargar la nota
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setNoteId(id);
      fetchNota(id); // Llama a la función para obtener la nota
    }
  }, []);

  return (
    <>
      <div className="w-[100%] p-4 h-screen bg-background-1 relative">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button onClick={handleClickReturn} className="p-2 rounded-2xl hover:bg-button-1">
            <img src="/public/img/chevron_left.png" alt="Regresar" className="w-[1rem] filter invert" />
          </button>
          <div className="flex gap-1">
            <button onClick={handleClickEdit} className="p-2 rounded-2xl hover:bg-button-1">
              <img src="/public/img/mode.png" alt="Editar nota" className="w-[1.5rem] filter invert" />
            </button>
            <Logout />
          </div>
        </header>
        <textarea
          placeholder="Título"
          value={newNota.titulo}
          onChange={(e) => setNewNota({ ...newNota, titulo: e.target.value })}
          onInput={(e) => {
            e.target.style.height = 'auto'; // Resetea la altura
            e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura al contenido
          }}
          className="mt-6 text-3xl text-color-1 w-full max-h-[20%] mb-2 p-2 bg-transparent outline-none focus:ring-0 focus:border-none resize-none overflow-y-scroll"
        />
        <textarea
          placeholder="Escribe Algo..."
          value={newNota.contenido}
          onChange={(e) => setNewNota({ ...newNota, contenido: e.target.value })}
          className="text-color-1 w-full h-[70%] mb-4 p-2 bg-transparent outline-none focus:ring-0 focus:border-none resize-none overflow-y-scroll scrollbar-hide"
        />
      </div>
      <ToastContainer /> {/* Notificaciones */}
    </>
  );
};

export default NoteAdd;
