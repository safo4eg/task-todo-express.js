import Router from 'express'
import AuthController from "../app/http/controllers/AuthController.js";
import NoteController from "../app/http/controllers/NoteController.js";
import AuthMiddleware from "../app/http/middlewares/AuthMiddleware.js";
import StoreNoteValidator from "../app/http/validators/StoreNoteValidator.js";
import SignupValidator from "../app/http/validators/SignupValidator.js";
import ShowNoteValidator from "../app/http/validators/ShowNoteValidator.js";
import NotePolicy from "../app/http/policies/NotePolicy.js";
import UpdateNoteValidator from "../app/http/validators/UpdateNoteValidator.js";
import DestroyNoteValidator from "../app/http/validators/DestroyNoteValidator.js";

const router = new Router();

router.post('/signup', [SignupValidator.handle], AuthController.signup);
router.post('/signin', AuthController.signin);

router.post('/notes', [AuthMiddleware.handle, StoreNoteValidator.handle], NoteController.store);
router.get('/notes', [AuthMiddleware.handle], NoteController.index);
router.get('/notes/:id', [AuthMiddleware.handle, ShowNoteValidator.handle, NotePolicy.show], NoteController.show);
router.patch('/notes/:id', [AuthMiddleware.handle, UpdateNoteValidator.handle, NotePolicy.update], NoteController.update);
router.delete('/notes/:id', [AuthMiddleware.handle, DestroyNoteValidator.handle, NotePolicy.destroy], NoteController.destroy)

export default router;