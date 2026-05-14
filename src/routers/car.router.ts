import {Router} from "express";
import {carController} from "../controller/car.controller";

const router = Router();

router.post('/create', carController.create);
router.get('/', carController.getAllCars);

export const carRouter = router;