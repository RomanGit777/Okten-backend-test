import {Router} from 'express';
import {authController} from "../controller/auth.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validator/user.validator";

const router = Router();

router.post('/sign-up', commonMiddleware.validateBody(UserValidator.create) ,authController.register)
router.post('/sign-in', commonMiddleware.validateBody(UserValidator.login) ,authController.login)

export const authRouter = router;