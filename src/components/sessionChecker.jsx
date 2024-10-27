import { useEffect } from 'react';

const SessionChecker = () => {
	useEffect(() => {
		const checkSession = async () => {
			try {
				// Realiza una solicitud para verificar la sesión en el backend
				const response = await fetch('http://localhost:3001/v1/users/session-check', {
					credentials: 'include', // Incluye las cookies en la solicitud
				});
				if (!response.ok) {
					// Si la respuesta no es exitosa, lanza un error
					throw new Error('Session expired');
				}
			} catch (error) {
				if (error.message === 'Session expired') {
					// Si la sesión ha expirado, recarga la página
					window.location.href = 'http://localhost:3000/login';
				} else {
					// Maneja otros posibles errores
					console.error('Error checking session:', error);
				}
			}
		};

		// Verificar la sesión cada 30 segundos (30000 ms)
		const interval = setInterval(checkSession, 1 * 30 * 1000);

		// Limpia el intervalo cuando el componente se desmonte
		return () => clearInterval(interval);
	}, []);

	return null;
};

export default SessionChecker;