import {IUser, IUserDTO} from "../interfaces/user.interface";

export const userMapper = {
    toDTO(user: IUser): IUserDTO {
        return {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            age: user.age,
            email: user.email,
            region: user.region,
            accountType: user.accountType,
            role: user.role,
        }
    }
}