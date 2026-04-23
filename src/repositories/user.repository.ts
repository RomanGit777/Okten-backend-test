import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";

class UserRepository {

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email })
    }
}

export const userRepository = new UserRepository();