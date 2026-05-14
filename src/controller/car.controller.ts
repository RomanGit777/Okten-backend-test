import {carService} from "../services/car.service";
import {NextFunction, Request, Response} from "express";
import {ICar} from "../interfaces/car.interface";
import {StatusCodesEnum} from "../enums/status-codes.enum";

class CarController {
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as ICar;
            const sellerId = req.user._id;

            const data = await carService.create({dto, sellerId});
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getAllCars(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await carService.getAllCars();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const carController = new CarController();