import {checkSchema, validationResult} from "express-validator";
import Note from "../../models/Note.js";

class ShowNoteValidator {
    async handle(req, res, next) {
        try {
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
                }
            }, ['params'])
                .run(req);

            const errors = validationResult(req);

            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            next();
        } catch (e) {
            return res.status(500).json({ message: e });
        }
    }
}

export default new ShowNoteValidator();