import {ICar} from "../interfaces/car.interface";
import {Car} from "../models/car.model";

class CarRepository {
    public create(dto: ICar): Promise<ICar> {
        return Car.create(dto);
    }

    public getAllCars(): Promise<ICar[]> {
        return Car.find();
    }

}
export const carRepository = new CarRepository();