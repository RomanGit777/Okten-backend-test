import {ICar} from "../interfaces/car.interface";
import {carRepository} from "../repositories/car.repository";

class CarService {
    public create(dto: ICar): Promise<ICar> {
        return carRepository.create(dto);
    }

    public async getAllCars(): Promise<ICar[]> {
        return carRepository.getAllCars();
    }
}

export const carService = new CarService();