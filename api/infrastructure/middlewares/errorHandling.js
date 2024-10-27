export const jsonParseErrorHandler = (err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		return res.status(400).json({
			status: 400,
			message: 'Formato JSON no válido. Compruebe los datos e inténtelo de nuevo.',
		});
	}
	next();
};