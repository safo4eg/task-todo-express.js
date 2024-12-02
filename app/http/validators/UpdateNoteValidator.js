import {checkSchema, validationResult} from "express-validator";
import Note from "../../models/Note.js";
class UpdateNoteValidator {
    async handle(req, res, next) {
        await checkSchema({
            id: {
                isMongoId: {
                    errorMessage: "Некорректный формат ID"
                },

                custom: {
                    options: async (value) => {
                        const note = await Note.findById(req.params.id);
                        if(!note) {
                            throw new Error('Заметки с таким Id не найдено');
                        }
                        req.note = note;
                        return true;
                    }
                }
            },
            title: {
                optional: {
                    options: { nullable: true }
                },
                isLength: {
                    options: {
                        max: 128
                    },
                    errorMessage: 'Длина названия не может превышать 128 символов'
                },
            },

            content: {
                optional: {
                    options: { nullable: true }
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
        }, ['body', 'params'])
            .run(req);

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next();
    }
}

export default new UpdateNoteValidator();