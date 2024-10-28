// Importa los módulos necesarios para la gestión de usuarios.
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import UserModel from "../models/usuariosModel.js";
import jwtUtils from "../utils/jwtUtils.js";

/**
 * Clase UserController que gestiona las peticiones HTTP relacionadas con usuarios.
 */
class UserController {
  constructor() {
    this.userModel = new UserModel(); // Inicializa el servicio de usuarios.
    this.googleCallback = this.googleCallback.bind(this); // Enlaza el método al contexto de la clase.
    this.passportLogin = this.passportLogin.bind(this); // Enlaza el método al contexto de la clase.
  }

  /**
   * Obtiene todos los usuarios.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getUsers(req, res) {
    try {
      const users = await this.userModel.getAllUsers();
      if (!users) {
        return res.status(404).json({
          status: 404,
          message: "No se encontro ningun usuario",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Usuarios obtenidos correctamente",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en la obtencion de usuarios",
      });
    }
  }

  /**
   * Obtiene un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async getUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({
          status: 400,
          message: "Error en la validacion del callback de google",
        });

      const user = await this.userModel.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Usuario encontrado",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en obtener el usuario",
      });
    }
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {Object} req - La solicitud HTTP, contiene los datos del nuevo usuario en el body.
   * @param {Object} res - La respuesta HTTP para enviar el resultado de la operación.
   * @returns {Promise<void>}
   */
  async createUser(req, res) {
    try {
      // Validar los datos del request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "Error en la validacion de la creacion del usuario",
        });
      }
      const { nombre, contrasena_hash, email } = req.body;
      if (!nombre || !contrasena_hash || !email) {
        return res.status(400).json({
          status: 400,
          message: "Debe ingresar el nombre, la contraseña y el correo",
        });
      }
      // Verificar si el nombre ya existe en la base de datos
      const existingUserNombre = await this.userModel.findByNick(nombre);
      if (existingUserNombre) {
        return res.status(400).json({
          status: 400,
          field: "nombre",
          message: "El nombre ya existe",
        });
      }
      // Verificar si el email ya existe en la base de datos
      const existingUserEmail = await this.userModel.findByEmail(email);
      if (existingUserEmail) {
        return res.status(400).json({
          status: 400,
          field: 'email',
          message: "El email ya existe en la base de datos",
        });
      }
      if (contrasena_hash.length < 4) {
        return res.status(400).json({
          status: 400,
          field: "contrasena_hash",
          message: "La contraseña debe tener al menos 4 caracteres",
        });
      }
      req.body.fecha_de_creacion = new Date();
      req.body.id = Math.floor(
        1000000000 + Math.random() * 9000000000
      ).toString();
      // Hashear la contraseña antes de guardar al usuario
      req.body.contrasena_hash = await bcrypt.hash(contrasena_hash, 10);
      const user = req.body;
      // Crear el nuevo usuario
      await this.userModel.insert(req.body);
      res.status(201).json({
        status: 201,
        message: "Usuario creado correctamente",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en registro del usuario",
      });
    }
  }

  /**
   * Actualiza un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async updateUserForms(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({
          status: 400,
          message: "Error en la validacion de actualizar el usuario",
        });

      const user = await this.userModel.findByIdAndUpdateForm(
        req.params.id,
        req.body
      );
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "Usuario no encontrado",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Usuario actualizado correctamente",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en la actualizacion del usuario",
      });
    }
  }

  /**
   * Elimina un usuario específico por su ID.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async deleteUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({
          status: 400,
          message: "Error en la validacion de eliminar el usuario",
        });

      const user = await this.userModel.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "Usuario no encontrado",
        });
      }
      res.status(200).json({
        status: 200,
        message: "Usuario eliminado correctamente",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en la eliminacion del usuario",
      });
    }
  }

  async googleCallback(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: "Error en la validacion del callback de google",
        });
      }
      const usuario = req.user;
      // Verificar si req.user es válido
      if (!usuario) {
        return res.status(400).json({
          status: 400,
          message: "El usuario no es valido",
        });
      }

      // Verifica si el usuario está registrado o no
      if (!usuario.isRegistered) {
        // Reutilizar createUserPassport para crear el nuevo usuario
        const body = {
          id: usuario.id,
          nombre: usuario.displayName,
          email: usuario.emails[0].value || "none@gmail.com",
          contrasena_hash: "",
          fecha_de_creacion: new Date(),
        };

        // Llama a createUserPassport para crear al usuario
        await this.userModel.insert(body);
      }

      // Loguearse con el usuario de passport
      const { token, user } = await this.passportLogin(req, res);

      // Verificar si token y userData son válidos
      if (!token || !user) {
        return res.status(500).json({
          status: 500,
          message:
            "Error en la autenticación: Token o datos del usuario no válidos",
        });
      }

      res.json({
        status: 200,
        message: "Usuario autenticado con éxito",
        data: { token, user },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en la autenticación con Google",
      });
    }
  }

  async passportLogin(req, res) {
    try {
      const userData = req.user;
      const token = jwtUtils.generateToken(userData);

      // Verificar si el token fue generado correctamente
      if (!token) {
        res.status(500).json({
          status: 500,
          message: "Error en la generacion del token",
        });
      }

      req.session.token = token;
      req.session.user = userData.id;

      return { token, user: userData.id };
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error en el logueo con Google",
      });
    }
  }

  /**
   * Inicia sesión un usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({
          status: 400,
          message: "Error en la validacion del login",
        });

      const usuario = await this.userModel.findByNick(req.body.nombre);
      // Verificar si el usuario existe
      if (!usuario) {
        return res.status(400).json({
          status: 400,
          field: "nombre",
          message: "El nombre de usuario no existe",
        });
      }

      // Verificar si la contraseña es correcta
      const isPasswordValid = await bcrypt.compare(
        req.body.contrasena_hash,
        usuario.contrasena_hash
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          status: 400,
          field: "contrasena_hash",
          message: "Clave incorrecta",
        });
      }

      const userData = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      };
      const token = jwtUtils.generateToken(userData);
      const user = usuario.id;
      req.session.passport = { user: user };
      req.session.token = token;

      res.json({
        status: 200,
        message: "Usuario autenticado con éxito",
        data: { token, userData },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Error en el logueo",
      });
    }
  }

  /**
   * Cierra sesión del usuario.
   * @param {Object} req - La solicitud HTTP.
   * @param {Object} res - La respuesta HTTP.
   * @returns {Promise<void>}
   */
  async logout(req, res) {
    try {
      // Limpiar la cookie del token
      res.clearCookie("connect.sid", {
        httpOnly: false,
        secure: "false",
        domain: "localhost",
        sameSite: "strict",
      });
      // Destruir la sesión y enviar la respuesta solo cuando se complete
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al destruir la sesión:", err);
          return res.status(500).json({
            status: 500,
            message: "Error al cerrar la sesion del sistema",
          });
        }

        res.json({
          status: 200,
          message: "Sesion cerrada correctamente"
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Error en el logout",
      });
    }
  }
}

// Exporta la clase UserController para su uso en otras partes de la aplicación.
export default UserController;
