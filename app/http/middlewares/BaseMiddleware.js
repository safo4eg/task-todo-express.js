class BaseMiddleware {
    handle(req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
    }
}

export default BaseMiddleware;