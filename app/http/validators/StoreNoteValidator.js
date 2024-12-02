import {checkSchema, validationResult} from "express-validator";
class StoreNoteValidator {
    async handle(req, res, next) {
        await checkSchema({
            title: {
                isLength: {
                    options: {
                        max: 128
                    },
                    errorMessage: 'Длина названия не может превышать 128 символов'
                },
                notEmpty: {
                    errorMessage: 'Название не может быть пустым'
                }
            },

            content: {
                notEmpty: {
                    errorMessage: "Контент не может быть пустым"
                },
                isLength: {
                    options: {
                        max: 1024
                    },
                    errorMessage: 'Контент не может превышать 1024 симовла'
                }
            },

            tags: {
                optional: {
                    options: { nullable: true }
                },

                isArray: {
                    errorMessage: 'Названия тэгов должны передаваться в массиве'
                },
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

export default new StoreNoteValidator();