import { useState } from "react";
import Logout from "./logout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const NoteAdd = () => {
  const [notas, setNotas] = useState([]); // Estado para almacenar las notas
  const [newNota, setNewNota] = useState({ titulo: "", contenido: "" }); // Estado para la nueva nota

  // Función para agregar una nueva nota
  const addNota = async () => {
    try {
      const userId = await getUserId(); // Obtener el id del usuario de la sesion
      const response = await fetch("http://localhost:3001/notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNota), // Enviar los datos de la nueva nota
        credentials: 'include'
      });
      const data = await response.json();
      await handleResponse(data)
      setNotas([...notas, data.data]); // Actualizar el estado para incluir la nueva nota
      setNewNota({ titulo: "", contenido: "" }); // Limpiar el formulario

      // Llamar a la función para registrar el historial
      await addHistorial(data.data._id,userId);
      
    } catch (error) {
      console.error("Error al agregar la nota:", error);
    }
  };

  // Funcion para obtener la id del usuario de la sesion
  const getUserId = async () => {
    try {
      const response = await fetch("http://localhost:3001/usuarios/validarSesion", {
        credentials: 'include'
      });
      const data = await response.json();
      return data.data.userId;
    } catch (error) {
      console.error("Error al obtener el id del usuario:", error);
    }
  };

// Función para guardar en el historial
  const addHistorial = async (notaId,userId) => {
    try {
      const historialData = {
        accion: "CREACION", // Tipo de acción
        nota_id: notaId,
        usuario_id: userId,
        fecha: new Date()
      };
      
      await fetch(`http://localhost:3001/notas/${notaId}/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historialData),
        credentials: 'include'
      });
    } catch (error) {
      console.error("Error al agregar al historial:", error);
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
   const handleClickReturn = () => {
    MySwal.fire({
        text: '¿Estás seguro de que quieres descartar los cambios?',
        showCancelButton: true,
        confirmButtonColor: '#FF0000', // Color del botón de confirmación
        cancelButtonColor: '#30BE71', // Color del botón de cancelación
        confirmButtonText: 'Descartar',
        cancelButtonText: 'Continuar',
        imageUrl: './public/img/info.png', // Agrega la ruta de la imagen si quieres mostrar una
        imageWidth: 30,
        imageHeight: 30,
        background: '#252525', // Color de fondo del cuadro de diálogo
      }).then((result) => {
        if (result.isConfirmed) {
          toast.success('Regresando...');
          setTimeout(() => {
            window.location.href = '/home';
          }, 3000); // Espera 3 segundos antes de redirigir
        }
      }); 
    };
    const handleClickAdd = () => {
        MySwal.fire({
            text: '¿Guardar cambios?',
            showCancelButton: true,
            confirmButtonColor: '#30BE71', // Color del botón de confirmación
            cancelButtonColor: '#FF0000', // Color del botón de cancelación
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Descartar',
            imageUrl: './public/img/info.png', // Agrega la ruta de la imagen si quieres mostrar una
            imageWidth: 30,
            imageHeight: 30,
            background: '#252525', // Color de fondo del cuadro de diálogo
          }).then((result) => {
            if (result.isConfirmed) {
              addNota()
              toast.success('Regresando...');
              setTimeout(() => {
                window.location.href = '/home';
              }, 3000); // Espera 3 segundos antes de redirigir
            }
          }); 
        };

  return (
    <>
    <div className="w-[100%] p-4 h-screen bg-background-1 relative">
      {/* Header */}
      <header className="flex items-center justify-between">
        <button onClick={handleClickReturn} className="p-2 rounded-2xl hover:bg-button-1">
            <img src="/public/img/chevron_left.png" alt="Regresar" className="w-[1rem] filter invert" />
        </button>
        <div className="flex gap-1">
          <button className="p-2 rounded-2xl hover:bg-button-1">
            <img src="/public/img/visibility.png" alt="Buscar notas" className="w-[1.5rem] filter invert" />
          </button>
          <button onClick={handleClickAdd} className="p-2 rounded-2xl hover:bg-button-1">
            <img src="/public/img/save.png" alt="Buscar notas" className="w-[1.5rem] filter invert" />
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
              className="mt-6 text-3xl text-color-1 w-full max-h-[20%] mb-2 p-2 bg-transparent outline-none focus:ring-0 focus:border-none resize-none overflow-y-scroll scrollbar-hide"
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
