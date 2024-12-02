import User from "../../models/User.js";
import bcryptjs from "bcryptjs";
import Role from "../../models/Role.js";
import jwtService from "../../Services/JWT.js";

class AuthController {
    async signup(req, res) {
        try {
            const {username, password} = req.body;
            let user = await User.findOne({username});
            if(user) {
                return res.status(400).json({message: 'Пользователь уже существует'})
            }

            const hash = bcryptjs.hashSync(password, 7);
            const role = await Role.findOne({title: 'User'});
            await User.create({username, password: hash, role: role._id});
            return res.status(200).json({message: "Успешная регистрация"});
        } catch (e) {
            return res.status(500).json({message: "Сервер не смог обработать запрос, попробуйте позже"});
        }
    }

    async signin(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user) {
                return res.status(400).json({message: "Пользователя не существует"});
            }

            const passwordIsValid = bcryptjs.compareSync(password, user.password);
            if(!passwordIsValid) {
                return res.status(400).json({message: "Неверный пароль"});
            }

            return res.status(200).json({token: jwtService.generateAccessToken(user._id, user.role)});
        } catch (e) {
            return res.status(500).json({message: "Сервер не смог обработать запрос, попробуйте позже"});
        }
    }
}

export default new AuthController();