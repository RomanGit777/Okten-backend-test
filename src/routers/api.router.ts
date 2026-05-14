import {Router} from 'express';
import {authRouter} from "./auth.router";
import {carRouter} from "./car.router";

const router = Router();

router.use('/auth', authRouter);
router.use('/cars', carRouter);

export const apiRouter = router;