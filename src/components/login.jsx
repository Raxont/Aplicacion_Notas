import { useState  } from 'react';
import 'boxicons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
	const [nombre, setNombre] = useState(''); // * Estado para almacenar el nick
	const [contrasena_hash, setPassword] = useState(''); // * Estado para almacenar el password
	const [nombreError, setNombreError] = useState(''); // Error para el campo nombre
	const [contrasenaError, setContrasenaError] = useState(''); // Error para el campo contraseña

	// * Función para manejar el login normal
	const handleSubmit = async e => {
		e.preventDefault();
	
		try {
			const response = await loginUser({ nombre, contrasena_hash });
			await handleResponse(response);
		} catch (error) {
			console.error('Error en el login:', error);
			toast.error('Error interno del servidor. Intenta nuevamente mas tarde.');
		}
	};

    // * Funcion para manejar la solicitud http
	const loginUser = async (userData) => {
		const response = await fetch('http://localhost:3001/usuarios/iniciarSesion', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
			credentials: 'include',
		});
		return response;
	};
	
	// * Funcion para manejar la respuesta
	const handleResponse = async (response) => {
		const data = await response.json();

		if (response.status === 400) {
			// Limpiar los errores previos
			setNombreError('');
			setContrasenaError('');
			
			// Mostrar el mensaje de error correspondiente al campo
			if (data.field === 'nombre') {
			  setNombreError(data.message);
			} else if (data.field === 'contrasena_hash') {
			  setContrasenaError(data.message);
			}
			
			// Limpiar el campo de contraseña si hay error
			if (data.field === 'contrasena_hash') {
			  setPassword('');
			}
			return;
		}
		if (response.status === 429){
			toast.error(data.message);
			setPassword('');
			setNombre('');
            return;
		}
	
		if (response.status===200) {
			// Notificar éxito
			toast.success(data.message);
			setTimeout(() => {
			  window.location.href = '/home'; // Redirige después de mostrar el mensaje
			}, 3000); // Espera 3 segundos antes de redirigir
		} else {
			toast.error('Error en el login: ' + (data.message || 'Inténtalo de nuevo.'));
		}
	};

	// * Función para manejar el login con Google
	const handleGoogleLogin = () => {
		window.location.href = 'http://localhost:3001/usuarios/google';
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='bg-white p-6 rounded w-[100%]'
			>
				<h2 className='text-2xl font-bold mb-4'>Inicia sesion</h2>
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
				<button
					type='submit'
					className='w-full bg-button-1 text-color-1 py-2 rounded-lg hover:bg-button-2 h-[2.5rem]'
				>
					Inciar sesion
				</button>
				<div className='my-3.5'>
					<span>Puede loguearse tambien con:</span>
					<button className="w-full flex items-center bg-button-1 rounded-lg hover:bg-button-2 gap-4 text-color-1 h-[2.5rem]" onClick={handleGoogleLogin}>
						<box-icon type="logo" name="google" size="md" class="fill-current"></box-icon>
						Inicia sesión con Google
					</button>
				</div>
				<div className='mt-3.5'>
					<span>No esta registrado?</span>
					<a
						href='/register'
						className='block text-center bg-button-1 text-color-1 py-2 rounded-lg hover:bg-button-2 mt-2 h-[2.5rem]'
					>
						Registrate
					</a>
				</div>
			</form>
			<ToastContainer />
		</>
	);
};

export default Login;