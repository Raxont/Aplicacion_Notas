import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
	// Estados para almacenar los valores de los campos del formulario
	const [nombre, setNombre] = useState('');
	const [email, setCorreo] = useState('');
	const [contrasena_hash, setPassword] = useState('');
	const [nombreError, setNombreError] = useState(''); // Error para el campo nombre
	const [emailError, setEamilError] = useState(''); // Error para el campo email
	const [contrasenaError, setContrasenaError] = useState(''); // Error para el campo email

	// * Función para manejar el envío del formulario de registro
	const handleSubmit = async e => {

		e.preventDefault(); // Previene que el formulario recargue la página
		try {
			const response = await registerUser();
			await handleResponse(response);
		} catch (error) {
			console.error('Error en el login:', error);
			toast.error('Error interno del servidor. Intenta nuevamente mas tarde.');
		}
	};
	// * Funcion para manejar la solicitud http
	const registerUser = async () => {
		const randomId = Math.floor(1000000000 + Math.random() * 9000000000);
		const response = await fetch('http://localhost:3001/usuarios', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id:randomId.toString(),
				nombre,
				email,
				contrasena_hash,
				fecha_de_creacion: new Date()
			}),
		});
		return response
	};

	// * Funcion para manejar la respuesta
	const handleResponse = async (response) => {
		const data = await response.json();
		console.log("🚀 ~ handleResponse ~ data:", data)

		if (response.status === 400) {
			// Limpiar los errores previos
			setNombreError('');
			setEamilError('')
			setContrasenaError('');
			
			// Mostrar el mensaje de error correspondiente al campo
			if (data.field === 'nombre') {
			  setNombreError(data.message);
			} else if (data.field === 'contrasena_hash') {
			  setContrasenaError(data.message);
			  setPassword('');
			} else if (data.field === 'email') {
			  setEamilError(data.message);
			}
			
			return;
		}
		if (response.status === 429){
			toast.error(data.message);
			setPassword('');
			setNombre('');
			setCorreo('');
            return;
		}
	
		if (response.status===201) {
			// Notificar éxito
			toast.success('Registro exitoso! Redirigiendo...');
			setTimeout(() => {
			  window.location.href = '/'; // Redirige después de mostrar el mensaje
			}, 3000); // Espera 3 segundos antes de redirigir
		} else {
			console.error('Error en el login:', data.message || 'Respuesta inesperada');
			toast.error('Error en el registro: ' + (data.message || 'Inténtalo de nuevo.'));
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='bg-white p-6 rounded shadow-md w-80'
			>
				<h2 className='text-2xl font-bold mb-4'>Registro</h2>

				{/* Campo para ingresar el nombre */}
				<div className='mb-4'>
					<label className='block text-sm'>Nombre</label>
					<input
						type='text'
						className='w-full p-2 border border-gray-300 rounded mt-1'
						value={nombre}
						onChange={e => setNombre(e.target.value)}
						required
					/>
					{nombreError && <p className='text-red-500 mt-1'>{nombreError}</p>}
				</div>
				
				{/* Campo para ingresar el email */}
				<div className='mb-4'>
					<label className='block text-sm'>Correo</label>
					<input
						type='email'
						className='w-full p-2 border border-gray-300 rounded mt-1'
						value={email}
						onChange={e => setCorreo(e.target.value)}
						required
					/>
					{emailError && <p className='text-red-500 mt-1'>{emailError}</p>}
				</div>

				{/* Campo para ingresar la contraseña */}
				<div className='mb-4'>
					<label className='block text-sm'>Contraseña</label>
					<input
						type='password'
						className='w-full p-2 border border-gray-300 rounded mt-1'
						value={contrasena_hash}
						onChange={e => setPassword(e.target.value)}
						required
					/>
					{contrasenaError && <p className='text-red-500 mt-1'>{contrasenaError}</p>}
				</div>

				{/* Botón de registro */}
				<button
					type='submit'
					className='w-full bg-button-1 text-white py-2 rounded hover:bg-button-2'
				>
					Registrarse
				</button>

				{/* Enlace para redirigir al usuario al login si ya tiene cuenta */}
				<div className='flex items-center space-x-2 mt-2'>
					<span>Ya tiene una cuenta?</span>
					<a href='/' className='text-button-2 hover:underline'>
						Iniciar sesion
					</a>
				</div>
			</form>
			<ToastContainer />
		</>
	);
};

export default RegisterForm;