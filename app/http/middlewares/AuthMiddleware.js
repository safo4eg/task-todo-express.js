import BaseMiddleware from "./BaseMiddleware.js";
import jwtService from "../../Services/JWT.js";

class AuthMiddleware extends BaseMiddleware{
    handle(req, res, next) {
        super.handle(req, res, next);

        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(403).json({message: "Ошибка авторизации"});
            }

            const userData = jwtService.verify(token);
            req.user = userData;
            next();
        } catch (e) {
            return res.status(403).json({message: "Ошибка авторизации"});
        }
    }
}

export default new AuthMiddleware();