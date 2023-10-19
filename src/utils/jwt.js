import "dotenv/config"
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign({ user }, "coderhouse123", {
    expiresIn: "12h",
  });
  return token;
};

console.log(generateToken(
  {"_id":"6526b23e28da611a5c569ab6","first_name":"Matias","last_name":"Viglione","age":{"$numberInt":"25"},"email":"mativiglione@gmail.com","password":"$2b$15$OWNYodfG8NM7EOZhOQsmQOdT0k7S35gOy7EQtZG5GaIxTweA1e8Om","rol":"user"}
))

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "Usuario no autenticado " });
  }

  const token = authHeader.split("")[1];

  jwt.sign(token, process.env.JWT_SECRET, (error, credentials) => {
    if (error) {
      return res.status(403).send({ error: "Usuario no autorizado " });
    }
    req.user = credentials.user;
    next();
  });
};
