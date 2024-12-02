import {JWT_SECRET} from '../../configs/app.js'
import jwt from 'jsonwebtoken';
class JWT {
    #secret_key;

    constructor() {
        this.#secret_key = JWT_SECRET;
    }

    generateAccessToken(id, role) {
        const payload = {id, role};
        return jwt.sign(payload, this.#secret_key, {expiresIn: "24h"});
    }

    verify(token) {
        return jwt.verify(token, this.#secret_key);
    }
}

export default new JWT();