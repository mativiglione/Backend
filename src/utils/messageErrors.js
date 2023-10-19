import passport from "passport";
import { Strategy } from "passport-local";

//funcion general para retornar errores en las strats de passport

export const passportError = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (rol) => {
    return async(req,res,next) => {
        if(!req.user) {
            return res.status(401).send({error: "User no autorizado"})
        }

        if(req.user.user[0].rol != rol) {
            return res.status(403).send({error: "User no tiene los privilegios necesarios"})
        }

        next()
    }
}