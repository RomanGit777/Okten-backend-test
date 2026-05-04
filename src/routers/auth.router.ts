import {Router} from 'express';
import {authController} from "../controller/auth.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validator/user.validator";
import {authMiddleware} from "../middlewares/auth.middleware";
import {AuthValidator} from "../validator/auth.validator";

const router = Router();

router.post('/sign-up', commonMiddleware.validateBody(UserValidator.create), authController.register)
router.post('/sign-up-seller')
router.post('/sign-in', commonMiddleware.validateBody(UserValidator.login) ,authController.login)
router.get('/me', authMiddleware.checkAccessToken, authController.me);
router.post('/refresh', commonMiddleware.validateBody(AuthValidator.refreshToken), authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;