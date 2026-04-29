import {IUser, IUserCreateDTO} from "../interfaces/user.interface";
import {User} from "../models/user.model";

class UserRepository {

    public create(user: IUserCreateDTO): Promise<IUser>{
        return User.create(user);
    }

    public async getById(userId: string): Promise<IUser | null>{
        return User.findById(userId);
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return User.findOne({email});
    }
}

export const userRepository = new UserRepository();