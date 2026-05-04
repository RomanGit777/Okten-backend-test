import {IUser, IUserCreateDTO} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";
import {StatusCodesEnum} from "../enums/status-codes.enum";
import {ApiError} from "../errors/api.error";

class UserService {

    public create(user:IUserCreateDTO): Promise<IUser>{
        return userRepository.create(user);
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return user;

    }

    public async isActive(userId: string) {
        const user = await this.getById(userId);

        if (user) {
            return user.isActive;
        }

    }

    public async isEmailExists(email: string): Promise<void>{
        const user = await userRepository.getByEmail(email);

        if(user) {
            throw new ApiError('User already exists', StatusCodesEnum.BAD_REQUEST);
        }
    }

}

export const userService = new UserService();