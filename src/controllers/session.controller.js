import { generateToken } from "../utils/jwt.js";

export const loginUser = async (req, res) => {
  try {
    if (!req.session) {
      return res.status(401).send({ mensaje: "Invalidate user" });
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };

    const token = generateToken(req.user);
    res.cookie("jwtCookie", token, {
      maxAge: 43200000,
    });

    res.redirect(`/static?info=${req.session.user.first_name}`);
  } catch (error) {
    res.status(500).send({ mensaje: `Error al iniciar sesion: ${error}` });
  }
};

export const testJWT = (req, res) => {
  res.status(200).send({ mensaje: req.user });
};

export const getCurrentUser = (req, res) => {
  res.send(req.user);
};

export const githubLogin = async (req, res) => {
  res.status(200).send({ mensaje: "Usuario creado " });
  req.session.user = {
    first_name: req.user.user.first_name,
    last_name: req.user.user.last_name,
    age: req.user.user.age,
    email: req.user.user.email,
  };
};

export const githubSessionLogin = async (req, res) => {
  req.session.user = req.user;
  res.status(200).send({ mensaje: "Sesion creada" });
};

export const logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("jwtCookie");
    res.redirect("/static/login");
  } else res.status(401).send({ resultado: "No autorizado" });
};
