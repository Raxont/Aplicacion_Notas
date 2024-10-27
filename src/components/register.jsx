import { useState } from 'react';

const RegisterForm = () => {
	// Estados para almacenar los valores de los campos del formulario
	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

	// Función para manejar el envío del formulario de registro
	const handleSubmit = async e => {
		const randomId = Math.floor(1000000000 + Math.random() * 9000000000);

		e.preventDefault(); // Previene que el formulario recargue la página
		try {
			const response = await fetch('http://localhost:3001/v1/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id:randomId.toString(),
					nombre,
					correo,
					password,
					fotoPerfil:"",
					favoritos: [],
          			carritoCompras: []
				}),
			});

			const data = await response.json();

			if (response.ok) {
				console.log('Usuario registrado con éxito:', data);
				window.location.href = '/login'; // Redirige al usuario a la página de login después del registro
			} else {
				// Maneja los errores del backend
				const backendErrors = {};

				if (data.errors) {
					data.errors.forEach(error => {
						backendErrors[error.path] = error.msg; // Asocia cada error con su campo correspondiente
					});
				} else {
					backendErrors.general = 'Error en el registro'; // Mensaje de error general
				}

				setErrors(backendErrors);
				console.error('Errores del registro:', backendErrors);
			}
		} catch (error) {
			console.error('Error en la solicitud de registro:', error);
		}
	};

	return (
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
				{errors.nombre && <p className='text-red-500 text-sm'>{errors.nombre}</p>}
			</div>

			{/* Campo para ingresar el email */}
			<div className='mb-4'>
				<label className='block text-sm'>Correo</label>
				<input
					type='email'
					className='w-full p-2 border border-gray-300 rounded mt-1'
					value={correo}
					onChange={e => setCorreo(e.target.value)}
					required
				/>
				{errors.correo && <p className='text-red-500 text-sm'>{errors.correo}</p>}
			</div>

			{/* Campo para ingresar la contraseña */}
			<div className='mb-4'>
				<label className='block text-sm'>Contraseña</label>
				<input
					type='password'
					className='w-full p-2 border border-gray-300 rounded mt-1'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				{errors.password && (
					<p className='text-red-500 text-sm'>{errors.password}</p>
				)}
			</div>

			{/* Botón de registro */}
			<button
				type='submit'
				className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'
			>
				Registrarse
			</button>

			{/* Enlace para redirigir al usuario al login si ya tiene cuenta */}
			<div className='flex items-center space-x-2 mt-2'>
				<span>Ya tiene una cuenta?</span>
				<a href='/' className='text-blue-500 hover:underline'>
					Iniciar sesion
				</a>
			</div>
		</form>
	);
};

export default RegisterForm;