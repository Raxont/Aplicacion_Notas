import { useState } from 'react';

const Logout = () => {
	const [error, setError] = useState(null);

	const handleLogout = async e => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3001/v1/users/logout', {
				method: 'POST',
				credentials: 'include',
			});

			if (response.ok) {
				// Redirige al usuario a la página de login después de cerrar sesión
				window.location.href = 'http://localhost:3000/login';
			} else {
				setError('Error en el logout. Intenta nuevamente.');
			}
		} catch (error) {
			console.error('Error en el logout:', error);
			setError('Error en la solicitud. Intenta nuevamente.');
		}
	};

	return (
		<div className='bg-white p-6 rounded shadow-md w-80 text-center'>
			<h2 className='text-2xl font-bold mb-4'>Logout</h2>
			<button
				onClick={handleLogout}
				className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600'
			>
				Cerrar sesión
			</button>
			{error && <p className='text-red-500 mt-4'>{error}</p>}
		</div>
	);
};

export default Logout;