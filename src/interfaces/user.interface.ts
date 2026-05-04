import {IBase} from "./IBase";
import {RoleEnum} from "../enums/role.enum";
import {AccountTypeEnum} from "../enums/account-type.enum";

interface IUser extends IBase {
    _id: string;

    name: string;
    surname: string;
    age: number;
    email: string;
    password: string;
    region: string;

    role: RoleEnum;
    accountType: AccountTypeEnum;

    isDeleted: boolean;
    isActive: boolean;

    phone?: string;
    company?: string;
    info?: string;
    documents?: string[];
}

type IUserDTO = Pick<IUser, "_id" | "name" | "surname" | "age" | "email" | "region" | "accountType" | "role" >;

type IUserCreateDTO = Pick<IUser, "name" | "surname" | "age" | "email" | "password" | "region">
type ISellerCreateDTO = Pick<IUser, "name" | "surname" | "age" | "email" | "password" | "region" | "documents" | "phone" | "company" | "info">


type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age" | "region">


export {
    IUserCreateDTO,
    IUserUpdateDTO,
    IUser,
    IUserDTO,
    ISellerCreateDTO
}