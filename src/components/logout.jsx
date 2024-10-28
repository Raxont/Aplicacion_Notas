import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {

	const handleLogout = async e => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3001/usuarios/logout', {
				method: 'POST',
				credentials: 'include',
			});
			const data = await response.json(); // Extrae el cuerpo de la respuesta

			if (response.ok) {
				// Notificar éxito
				toast.success(data.message);
				setTimeout(() => {
				window.location.href = '/'; // Redirige después de mostrar el mensaje
				}, 3000); // Espera 3 segundos antes de redirigir
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error('Error en el logout:', error);
			toast.error('Error en la solicitud. Intenta nuevamente.');
		}
	};

	return (
		<>

				<button
					onClick={handleLogout}
					className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600'
				>
					Cerrar sesión
				</button>
			<ToastContainer />
		</>
	);
};

export default Logout;