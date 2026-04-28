import {Router} from 'express';
import {authController} from "../controller/auth.controller";

const router = Router();

router.post('/sign-up', authController.register)
router.post('/sign-in', authController.login)

export const authRouter = router;