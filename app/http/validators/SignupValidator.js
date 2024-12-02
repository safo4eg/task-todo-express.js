import {checkSchema, validationResult} from "express-validator";
class SignupValidator {
    async handle(req, res, next) {
        await checkSchema({
            username: {
                isLength: {
                    options: {
                        min: 3,
                        max: 32
                    },
                    errorMessage: "Минимальная длина 3, максимальная 32"
                }
            },

            password: {
                isLength: {
                    options: {
                        min: 8,
                        max: 32
                    },
                    errorMessage: "Минимальная длина пароля 8, максимальная 32"
                }
            }
        })
            .run(req);

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next();
    }
}

export default new SignupValidator();