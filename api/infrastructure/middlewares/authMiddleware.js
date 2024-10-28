import jwtUtils from "../../utils/jwtUtils.js";
process.loadEnvFile();

/**
 * Middleware para autenticar el token JWT en la sesión del usuario.
 * Verifica la validez del token y si corresponde con el usuario en la sesión.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const authenticateToken = (req, res, next) => {
  console.log("🚀 ~ authenticateToken ~ userId:", userId)

  if (req.session && userId) {
    const token = req.session.token;

    if (!token) {
      // Si no hay token, responde con 401 y limpia la cookie
      res.clearCookie("connect.sid", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        domain: "localhost",
        sameSite: "strict",
      });
      return res.status(401).json({
        status: 401,
        message: "Desautorizado: Token no proporcionado",
      });
    }

    jwtUtils.verifyToken(token, (err, user) => {
      if (err) {
        // Si el token no es válido, destruir la sesión y responder con 401
        req.session.destroy((err) => {
          if (err) {
            console.error("Error al destruir la sesión:", err);
          }
          res.clearCookie("connect.sid", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            domain: "localhost",
            sameSite: "strict",
          });
          return res.status(401).json({
            status: 401,
            message: "Sesión expirada",
          });
        });
      } else if (userId !== user.id) {
        // Si el usuario en la sesión no coincide con el del token
        req.session.destroy((err) => {
          if (err) {
            console.error("Error al destruir la sesión:", err);
          }
          res.clearCookie("connect.sid", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            domain: "localhost",
            sameSite: "strict",
          });
          return res.status(401).json({
            status: 401,
            message: "Desautorizado: Usuario no coincide",
          });
        });
      } else {
        // Token válido y usuario coincidente
        req.user = user;
        next();
      }
    });
  } else {
    // Si no hay sesión o usuario, responder con 401
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      domain: "localhost",
      sameSite: "strict",
    });
    return res.status(401).json({
      status: 401,
      message: "Desautorizado: Sesion no encontrada",
    });
  }
};

export default authenticateToken;